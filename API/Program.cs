using API.Middleware;
using Application.Core;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddCors();
builder.Services.AddMediatR(x =>
    {
        x.RegisterServicesFromAssembly(Application.AssemblyReference.Assembly);
        x.AddOpenBehavior(typeof(ValidationBehaviour<,>));
    }
);

builder.Services.AddTransient<ExceptionMiddleware>();

builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);

builder.Services.AddValidatorsFromAssembly(Application.AssemblyReference.Assembly);

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();
// Configure the HTTP request pipeline.
app.UseCors(opts =>
{
    opts.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000", "https://localhost:3000");
});

app.MapControllers();

using var scope = app.Services.CreateAsyncScope();

var services = scope.ServiceProvider;


try
{
    var context = services.GetRequiredService<AppDbContext>();

    await context.Database.MigrateAsync();

    await DbInitializer.SeedData(context);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "Error occurred during migration");
}

app.Run();
