using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using var db = new ManagerContext();

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();
// Note: This sample requires the database to be created before running.
Console.WriteLine($"Database path: {db.DbPath}.");

//Create
//Console.WriteLine("Inserting a new customer");
/*db.Add(new Customer {   CustomerNumber = 1, 
                        Age = 23, 
                        CustomerName = "Abdul Alhashemi", 
                        DateOfBirth = new DateOnly(2000, 7, 2), 
                        Gender = 'M'});

db.Add(new Customer {   CustomerNumber = 2, 
                        Age = 41, 
                        CustomerName = "Erlich Bachman", 
                        DateOfBirth = new DateOnly(1981, 4, 6), 
                        Gender = 'M'});

db.SaveChanges();
*/
/*static void addCustomer(int Number, int CustomerAge, String Name, 
                        DateOnly DOB, Char CustomerGender) 
{
    using var db = new ManagerContext();
    db.Add(new Customer 
    {   CustomerNumber = Number, 
        Age = CustomerAge, 
        CustomerName = Name, 
        DateOfBirth = DOB, 
        Gender = CustomerGender
    });
    db.SaveChanges();
}
*/


// Read
Console.WriteLine("Querying for a customer");
var customer = db.Customers
    .OrderBy(b => b.CustomerNumber)
    .First();

// Update
/*
Console.WriteLine("Updating the customer's customer name");
customer.CustomerName = "Morpheus";
db.SaveChanges();
*/
// Delete
/*Console.WriteLine("Delete the customer");
db.Remove(customer);
db.SaveChanges();
*/

static void DeleteCustomer(int id)
{
    using var db = new ManagerContext();
    var customer = db.Customers.Find(id);
    db.Remove(customer);
    db.SaveChanges();
}

static void UpdateCustomerName(int id, string NewName)
{
    using var db = new ManagerContext();
    // Query for customer, if customer found, update, otherwise throw exception or something
    var customer = db.Customers.Find(id);
    if (customer != null)
    {
        customer.CustomerName = NewName;
        db.SaveChanges();
    }
    else
    {
        Console.WriteLine("Customer does not exist!\n");
    }
}

static void UpdateCustomerDOB(int id, DateOnly NewDOB)
{
    using var db = new ManagerContext();
    var customer = db.Customers.Find(id);
    if (customer != null)
    {
        customer.DateOfBirth = NewDOB;
        db.SaveChanges();
    }
    else
    {
        Console.WriteLine("Customer does not exist!\n");
    }
}

static void UpdateCustomerGender(int id, char NewGender)
{
    using var db = new ManagerContext();
    var customer = db.Customers.Find(id);
    if (customer != null)
    {
        customer.Gender = NewGender;
        db.SaveChanges();
    }
    else
    {
        Console.WriteLine("Customer does not exist!\n");
    }
}

static void UpdateCustomerAge(int id, int NewAge)
{
    using var db = new ManagerContext();
    var customer = db.Customers.Find(id);
    if (customer != null)
    {
        customer.Age = NewAge;
        db.SaveChanges();
    }
    else
    {
        Console.WriteLine("Customer does not exist!\n");
    }
}

static void AddHandler(string jsonString) 
{
    Console.WriteLine(jsonString);
}

app.MapGet("customers/get", () => db.Customers);

app.MapGet("customers/getid/{id}", 
            (int id) => db.Customers.SingleOrDefault(customer => customer.CustomerNumber == id));

app.MapDelete("customers/deleteid/{id}", (int id) => DeleteCustomer(id));

app.MapPost("customers/add_customer/", 
            ([FromBody] string jsonString) 
            => AddHandler(jsonString));


app.Run();
