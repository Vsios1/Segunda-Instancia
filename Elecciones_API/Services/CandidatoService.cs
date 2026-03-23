using EleccionesAPI.Models;

namespace EleccionesAPI.Services;

public class CandidatoService
{
    private readonly List<Candidato> _candidatos;
    private int _nextId = 1;

    public CandidatoService()
    {
        _candidatos = SeedData();
        _nextId = _candidatos.Count + 1;
    }

    public List<Candidato> GetAll() => _candidatos;

    public List<Candidato> GetByTipo(TipoEleccion tipo) =>
        _candidatos.Where(c => c.TipoEleccion == tipo).ToList();

    public List<Candidato> GetByDepartamento(string departamento) =>
        _candidatos.Where(c => c.Departamento.ToLower() == departamento.ToLower()).ToList();

    public Candidato? GetById(int id) => _candidatos.FirstOrDefault(c => c.Id == id);

    public Candidato Crear(CrearCandidatoDto dto)
    {
        var candidato = new Candidato
        {
            Id = _nextId++,
            Nombre = dto.Nombre,
            Apellido = dto.Apellido,
            Partido = dto.Partido,
            ColorPartido = dto.ColorPartido,
            TipoEleccion = dto.TipoEleccion,
            Cargo = dto.Cargo,
            Municipio = dto.Municipio,
            Departamento = dto.Departamento,
            Edad = dto.Edad,
            Foto = dto.Foto,
            Propuesta = dto.Propuesta,
            PorcentajeVotos = 0,
            Estado = Estado.Activo,
            FechaRegistro = DateTime.UtcNow
        };
        _candidatos.Add(candidato);
        return candidato;
    }

    public Candidato? Actualizar(int id, ActualizarCandidatoDto dto)
    {
        var candidato = GetById(id);
        if (candidato == null) return null;

        candidato.Nombre = dto.Nombre;
        candidato.Apellido = dto.Apellido;
        candidato.Partido = dto.Partido;
        candidato.ColorPartido = dto.ColorPartido;
        candidato.TipoEleccion = dto.TipoEleccion;
        candidato.Cargo = dto.Cargo;
        candidato.Municipio = dto.Municipio;
        candidato.Departamento = dto.Departamento;
        candidato.Edad = dto.Edad;
        candidato.Foto = dto.Foto;
        candidato.Propuesta = dto.Propuesta;
        candidato.PorcentajeVotos = dto.PorcentajeVotos;
        candidato.Estado = dto.Estado;

        return candidato;
    }

    public bool Eliminar(int id)
    {
        var candidato = GetById(id);
        if (candidato == null) return false;
        _candidatos.Remove(candidato);
        return true;
    }

    private List<Candidato> SeedData() => new()
    {
        new Candidato
        {
            Id = 1,
            Nombre = "Carlos", Apellido = "Méndez Vargas",
            Partido = "Movimiento Democrático", ColorPartido = "#1a56db",
            TipoEleccion = TipoEleccion.Gubernamental,
            Cargo = "Gobernador", Municipio = "Cochabamba", Departamento = "Cochabamba",
            Edad = 52, Foto = "https://i.pravatar.cc/150?img=11",
            Propuesta = "Desarrollo sostenible, inversión en infraestructura y educación pública de calidad.",
            PorcentajeVotos = 38.4, Estado = Estado.Activo, FechaRegistro = DateTime.UtcNow.AddDays(-60)
        },
        new Candidato
        {
            Id = 2,
            Nombre = "María", Apellido = "Quispe Flores",
            Partido = "Alianza Popular", ColorPartido = "#e3342f",
            TipoEleccion = TipoEleccion.Gubernamental,
            Cargo = "Gobernadora", Municipio = "Cochabamba", Departamento = "Cochabamba",
            Edad = 45, Foto = "https://i.pravatar.cc/150?img=5",
            Propuesta = "Salud universal, derechos indígenas y economía comunitaria.",
            PorcentajeVotos = 29.1, Estado = Estado.Activo, FechaRegistro = DateTime.UtcNow.AddDays(-58)
        },
        new Candidato
        {
            Id = 3,
            Nombre = "Jorge", Apellido = "Torrico Blanco",
            Partido = "Frente Cívico", ColorPartido = "#f6ad55",
            TipoEleccion = TipoEleccion.Gubernamental,
            Cargo = "Gobernador", Municipio = "Cochabamba", Departamento = "Cochabamba",
            Edad = 61, Foto = "https://i.pravatar.cc/150?img=15",
            Propuesta = "Reducción de impuestos, apoyo al sector privado y seguridad ciudadana.",
            PorcentajeVotos = 18.7, Estado = Estado.Activo, FechaRegistro = DateTime.UtcNow.AddDays(-55)
        },
        new Candidato
        {
            Id = 4,
            Nombre = "Ana", Apellido = "Gutierrez Soria",
            Partido = "Nueva Bolivia", ColorPartido = "#48bb78",
            TipoEleccion = TipoEleccion.Municipal,
            Cargo = "Alcaldesa", Municipio = "Cochabamba", Departamento = "Cochabamba",
            Edad = 38, Foto = "https://i.pravatar.cc/150?img=47",
            Propuesta = "Movilidad urbana, espacios verdes y digitalización de servicios municipales.",
            PorcentajeVotos = 42.3, Estado = Estado.Activo, FechaRegistro = DateTime.UtcNow.AddDays(-50)
        },
        new Candidato
        {
            Id = 5,
            Nombre = "Roberto", Apellido = "Mamani Cruz",
            Partido = "Movimiento Democrático", ColorPartido = "#1a56db",
            TipoEleccion = TipoEleccion.Municipal,
            Cargo = "Alcalde", Municipio = "Cochabamba", Departamento = "Cochabamba",
            Edad = 49, Foto = "https://i.pravatar.cc/150?img=33",
            Propuesta = "Mercados populares, empleo local y agua potable para todos los barrios.",
            PorcentajeVotos = 33.6, Estado = Estado.Activo, FechaRegistro = DateTime.UtcNow.AddDays(-48)
        },
        new Candidato
        {
            Id = 6,
            Nombre = "Lucía", Apellido = "Pedraza Vda. de Rojas",
            Partido = "Alianza Popular", ColorPartido = "#e3342f",
            TipoEleccion = TipoEleccion.Municipal,
            Cargo = "Alcaldesa", Municipio = "Quillacollo", Departamento = "Cochabamba",
            Edad = 41, Foto = "https://i.pravatar.cc/150?img=23",
            Propuesta = "Turismo comunitario, apoyo a la mujer emprendedora y gestión de residuos.",
            PorcentajeVotos = 51.2, Estado = Estado.Activo, FechaRegistro = DateTime.UtcNow.AddDays(-45)
        },
        new Candidato
        {
            Id = 7,
            Nombre = "Pedro", Apellido = "Condori Laime",
            Partido = "Frente Cívico", ColorPartido = "#f6ad55",
            TipoEleccion = TipoEleccion.Gubernamental,
            Cargo = "Gobernador", Municipio = "La Paz", Departamento = "La Paz",
            Edad = 55, Foto = "https://i.pravatar.cc/150?img=60",
            Propuesta = "Conexión vial entre municipios, minería responsable y turismo de altura.",
            PorcentajeVotos = 44.7, Estado = Estado.Activo, FechaRegistro = DateTime.UtcNow.AddDays(-62)
        },
        new Candidato
        {
            Id = 8,
            Nombre = "Valentina", Apellido = "Choque Mamani",
            Partido = "Nueva Bolivia", ColorPartido = "#48bb78",
            TipoEleccion = TipoEleccion.Municipal,
            Cargo = "Alcaldesa", Municipio = "El Alto", Departamento = "La Paz",
            Edad = 36, Foto = "https://i.pravatar.cc/150?img=9",
            Propuesta = "Industria local, tecnología e innovación y acceso a vivienda digna.",
            PorcentajeVotos = 37.9, Estado = Estado.Activo, FechaRegistro = DateTime.UtcNow.AddDays(-40)
        }
    };
}
