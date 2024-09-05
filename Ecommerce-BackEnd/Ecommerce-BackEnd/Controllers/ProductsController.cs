using Ecommerce_BackEnd.DTO;
using Ecommerce_BackEnd.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce_BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly MyDbContext _db;

        public ProductsController(MyDbContext db)
        {
            _db = db;
        }


        [HttpGet("GetAllProducts")]
        public IActionResult GetAllProducts()
        {
            var products = _db.Products.ToList();
                            
            return Ok(products);
        }

        [HttpGet("GetProductsByCategoryId/{id}")]
        public IActionResult GetProductsByCategoryId(int id)
        {
            var products = _db.Products.Where(p => p.CategoryId == id).ToList();

            return Ok(products);
        }


        [HttpGet("GetProductById/{id}")]
        public IActionResult GetProductById(int id)
        {
            var product = _db.Products.Find(id);

            return Ok(product);
        }


        [HttpPost("AddProduct")]
        public IActionResult AddProduct([FromForm] ProductRequestDTO product)
        {
            if (product.ImageUrl != null)
            {
                var uploadsFolderPath = Path.Combine(Directory.GetCurrentDirectory(), "images");

                if (!Directory.Exists(uploadsFolderPath))
                {
                    Directory.CreateDirectory(uploadsFolderPath);
                }

                var imagePath = Path.Combine(uploadsFolderPath, product.ImageUrl.FileName);


                if (!System.IO.File.Exists(imagePath))
                {
                    using (var stream = new FileStream(imagePath, FileMode.Create))
                    {
                        product.ImageUrl.CopyTo(stream);
                    }
                }
            }

            var newproduct = new Product
            {
                Name = product.Name,
                ImageUrl = product.ImageUrl.FileName,
                Quantity = 2,
                Description = product.Description,
                CategoryId = product.CategoryId ?? 1,   
            };

            _db.Products.Add(newproduct);
            _db.SaveChanges();
            return Ok(newproduct);
        }


        [HttpPut("EditProduct/{id}")]
        public IActionResult EditProduct(int id, [FromForm] ProductRequestDTO product)
        {
            if (product.ImageUrl != null && product.ImageUrl.Length > 0)
            {
                var uploadsFolderPath = Path.Combine(Directory.GetCurrentDirectory(), "images");
                if (!Directory.Exists(uploadsFolderPath))
                {
                    Directory.CreateDirectory(uploadsFolderPath);
                }

                var imagePath = Path.Combine(uploadsFolderPath, product.ImageUrl.FileName);

                using (var stream = new FileStream(imagePath, FileMode.Create))
                {
                    product.ImageUrl.CopyTo(stream);
                }
            }

            var productUpdate = _db.Products.Find(id);
            if (productUpdate == null)
            {
                return NotFound("Product not found");
            }

            productUpdate.Name = product.Name ?? productUpdate.Name;
            if (product.ImageUrl != null)
            {
                productUpdate.ImageUrl = product.ImageUrl.FileName;
            }
            productUpdate.Quantity = 2;
            productUpdate.Description = product.Description ?? productUpdate.Description;
            productUpdate.CategoryId = product.CategoryId ?? productUpdate.CategoryId;
            productUpdate.Price = product.Price ?? productUpdate.Price;
            

            _db.Products.Update(productUpdate);
            _db.SaveChanges();
            return Ok();
        }



        [HttpDelete("DeleteProduct/{id}")]
        public IActionResult DeleteProduct(int id)
        {
            var product = _db.Products.Find(id);

            _db.Products.Remove(product);
            _db.SaveChanges();

            return Ok(product);
        }


    }
}
