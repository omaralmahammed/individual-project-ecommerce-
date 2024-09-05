using Ecommerce_BackEnd.DTO;
using Ecommerce_BackEnd.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Ecommerce_BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly MyDbContext _db;

        public CartController(MyDbContext db)
        {
            _db = db;
        }

        [Authorize]
        [HttpPost("addCartItem/{id}")]
        public IActionResult addCartItem([FromBody] addCartItemRequestDTO newItem, int id)
        {

            var user = _db.ShoppingCarts.FirstOrDefault(x => x.UserId == id);

            var checkSelectedProduct = _db.ShoppingCartItems.FirstOrDefault(x => x.ProductId == newItem.ProductId && x.CartId == user.CartId);

            if (checkSelectedProduct == null)
            {
                var data = new ShoppingCartItem
                {
                    CartId = user.CartId,
                    ProductId = newItem.ProductId,
                    Quantity = newItem.Quantity,
                    CreatedAt = DateTime.Now,
                };

                _db.ShoppingCartItems.Add(data);
                _db.SaveChanges();
                return Ok("product added to cart");
            }
            else
            {
                checkSelectedProduct.Quantity = checkSelectedProduct.Quantity + newItem.Quantity;

                _db.ShoppingCartItems.Update(checkSelectedProduct);
                _db.SaveChanges();
                return Ok("increase the Quantity of product by 1");
            }
        }


        [HttpPost("changeQuantity")]
        public IActionResult changeQuantity([FromBody] changeQuantityDTO update)
        {
            var item = _db.ShoppingCartItems.Find(update.CartItemId);

            if (update.Quantity == 0)
            {
                _db.Remove(item);
                _db.SaveChanges(true);
                return Ok("item was deleted");
            }

            item.Quantity = update.Quantity;
            _db.SaveChanges();
            return Ok();
        }


        [HttpGet("getUserCartItems/{id}")]
        public IActionResult getUserCartItems(int id)
        {

            var user = _db.ShoppingCarts.FirstOrDefault(x => x.UserId == id);

            var cartItem = _db.ShoppingCartItems.Where(y => y.CartId == user.CartId).Select(
             x => new cartItemResponseDTO
             {
                 CartItemId = x.CartItemId,
                 CartId = x.CartId,
                 Product = new productDTO
                 {
                     Id = x.Product.Id,
                     Name = x.Product.Name,
                     Price = x.Product.Price,
                     ImageUrl = x.Product.ImageUrl,
                 },
                 Quantity = x.Quantity,
                 CreatedAt = DateTime.Now,
             });

            return Ok(cartItem);
        }


        [HttpDelete("deleteItemById/{id}")]
        public IActionResult deleteItemById(int id)
        {
            var delItem = _db.ShoppingCartItems.Find(id);
            _db.ShoppingCartItems.RemoveRange(delItem);
            _db.SaveChanges();

            return Ok($"Category '{id}' deleted successfully.");
        }




    }
}
