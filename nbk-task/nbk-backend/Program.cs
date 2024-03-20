using Microsoft.EntityFrameworkCore;

var  MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy  =>
                      {
                          policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
                      });
});

builder.Services.AddDbContext<CustomerDB>(opt => opt.UseSqlite());
builder.Services.AddDatabaseDeveloperPageExceptionFilter();
var app = builder.Build();
app.UseCors(MyAllowSpecificOrigins);

app.MapGet("/customers", async (CustomerDB db) =>
    await db.Customers.ToListAsync());


app.MapGet("/customers/{id}", async (int id, CustomerDB db) =>
    await db.Customers.FindAsync(id)
        is Customer customer
            ? Results.Ok(customer)
            : Results.NotFound());


app.MapPost("/customers", async (Customer customer, CustomerDB db) =>
{
    db.Customers.Add(customer);
    await db.SaveChangesAsync();

    return Results.Created($"/customers/{customer.CustomerNumber}", customer);
});


app.MapPut("/customers/{id}", async (int id, Customer updatedCustomer, CustomerDB db) =>
{
    var customer = await db.Customers.FindAsync(id);

    if (customer is null) return Results.NotFound();

    customer.CustomerNumber = updatedCustomer.CustomerNumber;
    customer.CustomerName = updatedCustomer.CustomerName;
    customer.DateOfBirth = updatedCustomer.DateOfBirth;
    customer.Age = updatedCustomer.Age;
    customer.Gender = updatedCustomer.Gender;

    await db.SaveChangesAsync();

    return Results.NoContent();
});

app.MapDelete("/customers/{id}", async (int id, CustomerDB db) =>
{
    if (await db.Customers.FindAsync(id) is Customer customer)
    {
        db.Customers.Remove(customer);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }

    return Results.NotFound();
});

app.Run();