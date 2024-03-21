using Microsoft.EntityFrameworkCore;

public class CustomerDB : DbContext
{
//public DbSet<Customer> Customers{ get; set; }  
//public string DbPath { get; }
//DbPath = "/Users/mason/Desktop/2024Dev/NBK/NBK-Task/nbk-task/nbk-backend/database/nbk-database.db";
    public CustomerDB (DbContextOptions<CustomerDB> options): base(options) { }
    
    public DbSet<Customer> Customers => Set<Customer>();
    
    protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseSqlite($"Data Source=Data/nbk-database.db");
    
}