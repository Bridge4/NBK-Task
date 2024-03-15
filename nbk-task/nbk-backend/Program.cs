using System;
using System.Linq;

using var db = new ManagerContext();

// Note: This sample requires the database to be created before running.
Console.WriteLine($"Database path: {db.DbPath}.");

// Create
/*
Console.WriteLine("Inserting a new customer");
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
*/
static void addCustomer(int Number, int CustomerAge, String Name, 
                        DateOnly DOB, Char CustomerGender) 
{
    using var db = new ManagerContext();
    db.Add(new Customer {   CustomerNumber = Number, 
                        Age = CustomerAge, 
                        CustomerName = Name, 
                        DateOfBirth = DOB, 
                        Gender = CustomerGender});
    db.SaveChanges();
}
db.SaveChanges();

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
