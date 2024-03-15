using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

public class ManagerContext : DbContext
{
    public DbSet<Customer> Customers{ get; set; }  

    public string DbPath { get; }

    public ManagerContext ()
    {
        DbPath = "/Users/mason/Desktop/2024Dev/NBK/NBK-Task/nbk-task/nbk-backend/database/nbk-database.db";
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseSqlite($"Data Source={DbPath}");

}

public class Customer 
{
    [Key]
    public int CustomerNumber { get; set; }
    public string CustomerName { get; set; }
    public int Age { get; set; }
    public DateOnly DateOfBirth { get; set; }
    public char Gender { get; set; }
}