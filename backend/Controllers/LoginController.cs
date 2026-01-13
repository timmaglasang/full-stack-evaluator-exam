using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManager.Data;
using TaskManager.Models;

namespace task_manager_api.Controllers
{
    [Route("login")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public LoginController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {

            var users = await _context.Users.ToListAsync();
            return Ok(users);
        }


        [HttpPost]
        public async Task<IActionResult> Login([FromBody] User LoginDto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == LoginDto.Email); 
            if (user == null) return Unauthorized(new { message = "Invalid email or password" });
            
            bool isValid = BCrypt.Net.BCrypt.Verify(LoginDto.PasswordHash, user.PasswordHash); 
            if (!isValid) return Unauthorized(new { message = "Invalid email or password" }); // If valid, issue JWT or session

            return Ok(new { id = user.Id, email = user.Email });
        }
    }
}
