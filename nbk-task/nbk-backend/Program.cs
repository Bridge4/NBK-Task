using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
/*
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();
// Note: This sample requires the database to be created before running.
using var db = new ManagerContext();
Console.WriteLine($"Database path: {db.DbPath}.");

//Create
//Console.WriteLine("Inserting a new customer");
db.Add(new Customer {   CustomerNumber = 1, 
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

// Read
Console.WriteLine("Querying for a customer");
var customer = db.Customers
    .OrderBy(b => b.CustomerNumber)
    .First();

db.Add(new Customer{
    CustomerNumber = 123,
    Age = 32,
    CustomerName = "Sayed",
    DateOfBirth = new DateOnly(2000,01,02),
    Gender = 'M'
});
db.SaveChanges();
// Update

Console.WriteLine("Updating the customer's customer name");
customer.CustomerName = "Morpheus";
db.SaveChanges();

// Delete
Console.WriteLine("Delete the customer");
db.Remove(customer);
db.SaveChanges();


static void DeleteCustomer(int id)
{
    using var db = new ManagerContext();
    var customer = db.Customers.Find(id);
    db.Remove(customer);
    db.SaveChanges();
}

static void AddHandler(string jsonString) 
{
    Console.WriteLine(jsonString );
}

app.MapGet("customers/get", () => "HELLO!");

app.MapGet("customers/getid/{id}", 
            (int id) => db.Customers.SingleOrDefault(customer => customer.CustomerNumber == id));

app.MapDelete("customers/deleteid/{id}", (int id) => DeleteCustomer(id));

app.MapPost("customers/add_customer/", 
            ([FromBody] string jsonString) 
            => AddHandler(jsonString));


app.Run();
*/


var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<CustomerDB>(opt => opt.UseSqlite());
builder.Services.AddDatabaseDeveloperPageExceptionFilter();
var app = builder.Build();

app.MapGet("/customers", async (CustomerDB db) =>
    await db.Customers.ToListAsync());

/*
app.MapGet("/todoitems/customer_name", async (CustomerDB db) =>
    await db.Customers.Where(c => c.CustomerName).ToListAsync());
*/

app.MapGet("/customers/{id}", async (int id, CustomerDB db) =>
    await db.Customers.FindAsync(id)
        is Customer customer
            ? Results.Ok(customer)
            : Results.NotFound());

app.MapPost("/customers", async (Customer customer, CustomerDB db) =>
{
    db.Customers.Add(customer);
    await db.SaveChangesAsync();

    return Results.Created($"/todoitems/{customer.CustomerNumber}", customer);
});


/*app.MapPut("/todoitems/{id}", async (int id, Todo inputTodo, TodoDb db) =>
{
    var todo = await db.Todos.FindAsync(id);

    if (todo is null) return Results.NotFound();

    todo.Name = inputTodo.Name;
    todo.IsComplete = inputTodo.IsComplete;

    await db.SaveChangesAsync();

    return Results.NoContent();
});

app.MapDelete("/todoitems/{id}", async (int id, TodoDb db) =>
{
    if (await db.Todos.FindAsync(id) is Todo todo)
    {
        db.Todos.Remove(todo);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }

    return Results.NotFound();
});
*/
app.Run();