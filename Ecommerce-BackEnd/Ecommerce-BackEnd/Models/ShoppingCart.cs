using System;
using System.Collections.Generic;

namespace Ecommerce_BackEnd.Models;

public partial class ShoppingCart
{
    public int CartId { get; set; }

    public int UserId { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual ICollection<ShoppingCartItem> ShoppingCartItems { get; set; } = new List<ShoppingCartItem>();

    public virtual UserInformation User { get; set; } = null!;
}
