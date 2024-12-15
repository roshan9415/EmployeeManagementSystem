using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseInMemoryDatabase("EmployeeDb"));

var app = builder.Build();

app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200", "https://localhost:4200"));
app.MapControllers();

try
{
    using var scope = app.Services.CreateScope();
    var services = scope.ServiceProvider;
    var dbContext = services.GetRequiredService<AppDbContext>();

    // Seed initial data
    dbContext.Employees.AddRange(
        new Employee { Name = "Aarav", Department = "HR", Position = "Manager", Salary = 70000, Email = "aarav@gmail.com" },
        new Employee { Name = "Priya", Department = "IT", Position = "Developer", Salary = 80000, Email = "priya@gmail.com" },
        new Employee { Name = "Rohan", Department = "HR", Position = "Manager", Salary = 70000, Email = "rohan@gmail.com" },
        new Employee { Name = "Ananya", Department = "IT", Position = "Developer", Salary = 80000, Email = "ananya@gmail.com" },
        new Employee { Name = "Vijay", Department = "Finance", Position = "Accountant", Salary = 75000, Email = "vijay@gmail.com" }
    );

    dbContext.SaveChanges();
}
catch (Exception ex)
{
    Console.WriteLine(ex);

    throw;
}

app.Run();