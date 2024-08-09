using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReinasApiPrueba.Models;

namespace ReinasApiPrueba.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VotacionController : ControllerBase
    {
        private readonly AppDbContext _context;

        public VotacionController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Votacion>>> GetVotacion()
        {
            if (_context.votacions == null)
            {
                return NotFound();
            }
            return await _context.votacions.ToListAsync();
        }

        // PUT: api/Votaciones/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVotacion(int id, Votacion votacion)
        {
            if (id != votacion.Voto_ID)
            {
                return BadRequest();
            }

            // Verificar si el usuario tiene permiso para modificar esta votación
            // Aquí puedes agregar lógica de autenticación o permisos si es necesario

            // Actualizar la puntuación y otros campos de la votación
            var votacionExistente = await _context.votacions.FindAsync(id);
            if (votacionExistente == null)
            {
                return NotFound();
            }

            votacionExistente.Puntuacion = votacion.Puntuacion;
            votacionExistente.Usuario_ID = votacion.Usuario_ID;
            votacionExistente.Ronda_ID = votacion.Ronda_ID;
            votacionExistente.Participante_ID = votacion.Participante_ID;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VotacionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        private bool VotacionExists(int id)
        {
            return _context.votacions.Any(e => e.Voto_ID == id);
        }

        [HttpPost]
        public async Task<ActionResult<Votacion>> PostVotacion(Votacion votacion)
        {
            _context.votacions.Add(votacion);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetVotacion", new { id = votacion.Voto_ID }, votacion);
        }

    }
}
