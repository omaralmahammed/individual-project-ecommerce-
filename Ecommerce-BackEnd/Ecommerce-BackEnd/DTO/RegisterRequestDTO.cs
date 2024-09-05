using System.ComponentModel.DataAnnotations;

namespace Ecommerce_BackEnd.DTO
{
    public class RegisterRequestDTO
    {
        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public string? Email { get; set; }

        public string? Password { get; set; }
    }
}
