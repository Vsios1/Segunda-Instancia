using EleccionesAPI.Models;
using EleccionesAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace EleccionesAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CandidatosController : ControllerBase
{
    private readonly CandidatoService _service;

    public CandidatosController(CandidatoService service)
    {
        _service = service;
    }

    /// <summary>Obtiene todos los candidatos</summary>
    [HttpGet]
    public ActionResult<IEnumerable<Candidato>> GetAll()
    {
        return Ok(_service.GetAll());
    }

    /// <summary>Obtiene candidatos por tipo de elección</summary>
    [HttpGet("tipo/{tipo}")]
    public ActionResult<IEnumerable<Candidato>> GetByTipo(TipoEleccion tipo)
    {
        return Ok(_service.GetByTipo(tipo));
    }

    /// <summary>Obtiene candidatos por departamento</summary>
    [HttpGet("departamento/{departamento}")]
    public ActionResult<IEnumerable<Candidato>> GetByDepartamento(string departamento)
    {
        return Ok(_service.GetByDepartamento(departamento));
    }

    /// <summary>Obtiene un candidato por ID</summary>
    [HttpGet("{id}")]
    public ActionResult<Candidato> GetById(int id)
    {
        var candidato = _service.GetById(id);
        if (candidato == null) return NotFound(new { mensaje = $"Candidato con ID {id} no encontrado." });
        return Ok(candidato);
    }

    /// <summary>Crea un nuevo candidato</summary>
    [HttpPost]
    public ActionResult<Candidato> Crear([FromBody] CrearCandidatoDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        var candidato = _service.Crear(dto);
        return CreatedAtAction(nameof(GetById), new { id = candidato.Id }, candidato);
    }

    /// <summary>Actualiza un candidato existente</summary>
    [HttpPut("{id}")]
    public ActionResult<Candidato> Actualizar(int id, [FromBody] ActualizarCandidatoDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        var candidato = _service.Actualizar(id, dto);
        if (candidato == null) return NotFound(new { mensaje = $"Candidato con ID {id} no encontrado." });
        return Ok(candidato);
    }

    /// <summary>Elimina un candidato</summary>
    [HttpDelete("{id}")]
    public ActionResult Eliminar(int id)
    {
        var eliminado = _service.Eliminar(id);
        if (!eliminado) return NotFound(new { mensaje = $"Candidato con ID {id} no encontrado." });
        return NoContent();
    }
}
