using Microsoft.EntityFrameworkCore;
using ReinasApiPrueba.Models;

public class AppDbContext : DbContext
{
    public DbSet<Participante> Participantes { get; set; }
    public DbSet<Usuario> Usuarios { get; set; }
    public DbSet<Ronda> Ronda { get; set; }
    public DbSet<Votacion> votacions { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Participante>().ToTable("Participantes");
        modelBuilder.Entity<Usuario>().ToTable("Usuarios");
        modelBuilder.Entity<Ronda>().ToTable("Rondas");
        modelBuilder.Entity<Votacion>().ToTable("Votos");
    }
}

