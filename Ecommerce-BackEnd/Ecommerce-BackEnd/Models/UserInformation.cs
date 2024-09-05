using System;
using System.Collections.Generic;

namespace Ecommerce_BackEnd.Models;

public partial class UserInformation
{
    public int Id { get; set; }

    public string? Picture { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? PhoneNumber { get; set; }

    public string? AlternativePhoneNumber { get; set; }

    public string? Country { get; set; }

    public string? City { get; set; }

    public string? Address { get; set; }

    public string? Postcode { get; set; }

    public string? Email { get; set; }

    public string? Password { get; set; }

    public string? Otp { get; set; }

    public byte[]? PasswordHash { get; set; }

    public byte[]? PasswordSalt { get; set; }

    public virtual ICollection<ShoppingCart> ShoppingCarts { get; set; } = new List<ShoppingCart>();

    public virtual ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
}
