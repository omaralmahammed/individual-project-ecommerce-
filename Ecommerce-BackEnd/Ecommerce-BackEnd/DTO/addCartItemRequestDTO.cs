namespace Ecommerce_BackEnd.DTO
{
    public class addCartItemRequestDTO
    {
        public int CartId { get; set; }

        public int ProductId { get; set; }

        public int Quantity { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
