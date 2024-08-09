using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReinasApiPrueba.Models
{
    public class Votacion
    {
        [Key]
        [Column("voto_id")]
        public int Voto_ID { get; set; }
        [Column("usuario_id")]
        public int Usuario_ID { get; set; }
        [Column("participante_id")]
        public int Participante_ID { get; set; }
        [Column("ronda_id")]
        public int Ronda_ID { get; set; }
        [Column("puntuacion")]
        public int Puntuacion { get; set; }
    }
}
