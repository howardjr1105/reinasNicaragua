namespace ReinasApiPrueba.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using System.Linq;
    using System.Threading.Tasks;

    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/Auth/authenticate
        [HttpPost("authenticate")]
        public async Task<ActionResult<object>> AuthenticateUser(LoginModel login)
        {
            var usuario = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Correo == login.Correo && u.Contraseña == login.Contraseña);

            if (usuario != null)
            {
                // Devolver un objeto anónimo con el usuario_id y true
                return new { usuario_id = usuario.UsuarioId, autenticado = true };
            }

            // Si no se encontró el usuario, devolver false
            return new { autenticado = false };
        }
    }

    public class LoginModel
    {
        public string Correo { get; set; }
        public string Contraseña { get; set; }
    }

}
