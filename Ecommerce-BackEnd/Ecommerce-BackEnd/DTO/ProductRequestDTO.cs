namespace Ecommerce_BackEnd.DTO
{
    public class ProductRequestDTO
    {
        public string? Name { get; set; } = null!;

        public double? Price { get; set; }

        public IFormFile? ImageUrl { get; set; }

        public int? Quantity { get; set; }

        public string? Description { get; set; }

        public int? CategoryId { get; set; } 

    }
}
