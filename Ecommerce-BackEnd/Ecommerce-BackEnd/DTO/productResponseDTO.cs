using Ecommerce_BackEnd.Models;

namespace Ecommerce_BackEnd.DTO
{
    public class productResponseDTO
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public double Price { get; set; }

        public string? ImageUrl { get; set; }

        public int Quantity { get; set; }

        public string? Description { get; set; }
        public categoryDTO? Category { get; set; }

    }

    public class categoryDTO
    {
        public int Id { get; set; } 
        public string? Name { get; set; }

    }
}
