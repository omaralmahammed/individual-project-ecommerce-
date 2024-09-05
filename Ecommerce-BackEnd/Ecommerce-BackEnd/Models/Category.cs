using System;
using System.Collections.Generic;

namespace Ecommerce_BackEnd.Models;

public partial class Category
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Img { get; set; }

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}
