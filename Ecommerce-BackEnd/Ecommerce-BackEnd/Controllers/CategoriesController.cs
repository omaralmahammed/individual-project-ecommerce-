using Ecommerce_BackEnd.DTO;
using Ecommerce_BackEnd.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce_BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly MyDbContext _db;

        public CategoriesController(MyDbContext db)
        {
            _db = db;
        }

        [HttpGet("GetAllCategories")]
        public IActionResult GetAllCategories() {

            var AllCategories = _db.Categories.ToList();

            return Ok(AllCategories);
        }

        [HttpGet("GetCategoriesById/{id}")]
        public IActionResult GetCategoriesById(int id)
        {

            var categories = _db.Categories.Find(id);

            return Ok(categories);
        }

        [HttpGet("GetFourCategories")]
        public IActionResult GetFourCategories()
        {
            var fourCategories = _db.Categories.Take(4).ToList();

            return Ok(fourCategories);
        }

        [HttpPost("AddCategories")]
        public IActionResult AddCategories([FromForm] CategoryRequestDTO category)
        {
            if (category.Img != null)
            {
                var uploadsFolderPath = Path.Combine(Directory.GetCurrentDirectory(), "images");
                if (!Directory.Exists(uploadsFolderPath))
                {
                    Directory.CreateDirectory(uploadsFolderPath);
                }

                var imagePath = Path.Combine(uploadsFolderPath, category.Img.FileName);


                if (!System.IO.File.Exists(imagePath))
                {
                    using (var stream = new FileStream(imagePath, FileMode.Create))
                    {
                        category.Img.CopyTo(stream);
                    }
                }
            }

            var newCategory = new Category
            {
                Name = category.Name,
                Img = category.Img.FileName,
            };

            _db.Categories.Add(newCategory);
            _db.SaveChanges();
            return Ok(newCategory);
        }


        [HttpPut("EditCategory/{id}")]
        public IActionResult EditCategory(int id, [FromForm] CategoryRequestDTO category)
        {

            if (category.Img != null)
            {
                var uploadsFolderPath = Path.Combine(Directory.GetCurrentDirectory(), "images");
                if (!Directory.Exists(uploadsFolderPath))
                {
                    Directory.CreateDirectory(uploadsFolderPath);
                }

                var imagePath = Path.Combine(uploadsFolderPath, category.Img.FileName);


                if (!System.IO.File.Exists(imagePath))
                {
                    using (var stream = new FileStream(imagePath, FileMode.Create))
                    {
                        category.Img.CopyTo(stream);
                    }

                }
            }
            

            var categoryUpdate = _db.Categories.Find(id);

            if (category.Img != null)
            {
                categoryUpdate.Img = category.Img.FileName ?? categoryUpdate.Img;
            }

            categoryUpdate.Name = category.Name ?? categoryUpdate.Name;

            _db.Categories.Update(categoryUpdate);
            _db.SaveChanges();
            return Ok();
        }



        [HttpDelete("DeleteCategory/{id}")]
        public IActionResult DeleteCategory(int id)
        {
            var findProducts = _db.Products.Where( p => p.CategoryId == id).ToList();
            _db.Products.RemoveRange(findProducts);

            var findCategory = _db.Categories.Find(id);
            _db.Categories.Remove(findCategory);

            _db.SaveChanges();

            return Ok();
        }
    }
}
