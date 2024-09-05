using System;
using System.Collections.Generic;

namespace Ecommerce_BackEnd.Models;

public partial class Contact
{
    public int Id { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? Email { get; set; }

    public string? Subject { get; set; }

    public string? Message { get; set; }

    public DateTime? DateAndTime { get; set; }

    public string? AdminName { get; set; }

    public string? AdminResponse { get; set; }

    public DateTime? RsponseDateAndTime { get; set; }

    public string Status { get; set; } = null!;
}
