using System;
using System.Collections.Generic;

namespace Ecommerce_BackEnd.Models;

public partial class UserRole
{
    public int UserId { get; set; }

    public string Role { get; set; } = null!;

    public virtual UserInformation User { get; set; } = null!;
}
