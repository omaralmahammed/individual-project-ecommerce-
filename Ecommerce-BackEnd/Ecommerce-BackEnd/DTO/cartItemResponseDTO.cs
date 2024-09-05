namespace Ecommerce_BackEnd.DTO
{
    public class cartItemResponseDTO
    {
        public int CartItemId { get; set; }

        public int CartId { get; set; }

        public productDTO? Product { get; set; }

        public int Quantity { get; set; }

        public DateTime CreatedAt { get; set; }

    }

    public class productDTO
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public double Price { get; set; }

        public string? ImageUrl { get; set; }

    }
}
