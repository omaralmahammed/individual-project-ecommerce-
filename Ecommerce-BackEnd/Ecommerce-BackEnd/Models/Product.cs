using System;
using System.Collections.Generic;

namespace Ecommerce_BackEnd.Models;

public partial class Product
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public double Price { get; set; }

    public string? ImageUrl { get; set; }

    public int Quantity { get; set; }

    public string? Description { get; set; }

    public int CategoryId { get; set; }

    public virtual Category Category { get; set; }

    public virtual ICollection<ShoppingCartItem> ShoppingCartItems { get; set; } = new List<ShoppingCartItem>();
}
