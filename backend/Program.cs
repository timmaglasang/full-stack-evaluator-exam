using Microsoft.EntityFrameworkCore;
using TaskManager.Data;

DotNetEnv.Env.Load();

var builder = WebApplication.CreateBuilder(args);

// 1. Define a CORS Policy Name
var myAllowSpecificOrigins = "_myAllowSpecificOrigins";

// 2. Add CORS services

// Add CORS policy
// Add CORS policy 
builder.Services.AddCors(options =>
{
options.AddPolicy("AllowReactApp", 
    policy => {
        policy.WithOrigins("http://localhost:5173") // your React dev server
           .AllowAnyHeader() 
                                                     .AllowAnyMethod(); 
        }); 
});

//builder.Services.AddControllers();
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        // This stops the infinite loop by ignoring already visited objects
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    }); builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowReactApp");
app.MapControllers();

app.Run();

//Test push