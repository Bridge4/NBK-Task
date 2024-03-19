using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

public class Customer 
{
    //[PrimaryKey]
    [Key]
    public int CustomerNumber { get; set; }
    public string CustomerName { get; set; }
    public int Age { get; set; }
    public DateOnly DateOfBirth { get; set; }
    public char Gender { get; set; }
}