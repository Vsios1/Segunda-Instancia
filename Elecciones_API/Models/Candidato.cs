namespace EleccionesAPI.Models;

public enum TipoEleccion
{
    Municipal,
    Gubernamental
}

public enum Estado
{
    Activo,
    Inactivo,
    Descalificado
}

public class Candidato
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string Apellido { get; set; } = string.Empty;
    public string Partido { get; set; } = string.Empty;
    public string ColorPartido { get; set; } = string.Empty;
    public TipoEleccion TipoEleccion { get; set; }
    public string Cargo { get; set; } = string.Empty;
    public string Municipio { get; set; } = string.Empty;
    public string Departamento { get; set; } = string.Empty;
    public int Edad { get; set; }
    public string Foto { get; set; } = string.Empty;
    public string Propuesta { get; set; } = string.Empty;
    public double PorcentajeVotos { get; set; }
    public Estado Estado { get; set; }
    public DateTime FechaRegistro { get; set; }
}

public class CrearCandidatoDto
{
    public string Nombre { get; set; } = string.Empty;
    public string Apellido { get; set; } = string.Empty;
    public string Partido { get; set; } = string.Empty;
    public string ColorPartido { get; set; } = string.Empty;
    public TipoEleccion TipoEleccion { get; set; }
    public string Cargo { get; set; } = string.Empty;
    public string Municipio { get; set; } = string.Empty;
    public string Departamento { get; set; } = string.Empty;
    public int Edad { get; set; }
    public string Foto { get; set; } = string.Empty;
    public string Propuesta { get; set; } = string.Empty;
}

public class ActualizarCandidatoDto : CrearCandidatoDto
{
    public double PorcentajeVotos { get; set; }
    public Estado Estado { get; set; }
}
