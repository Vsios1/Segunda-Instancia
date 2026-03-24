import { useState, useEffect } from "react";

// ─── Mock data (mirrors the C# API seed) ───────────────────────────────────
const CANDIDATOS_MOCK = [
  { id: 1, nombre: "Carlos", apellido: "Méndez Vargas", partido: "Movimiento Democrático", colorPartido: "#1a56db", tipoEleccion: 1, cargo: "Gobernador", municipio: "Cochabamba", departamento: "Cochabamba", edad: 52, foto: "https://i.pravatar.cc/150?img=11", propuesta: "Desarrollo sostenible, inversión en infraestructura y educación pública de calidad.", porcentajeVotos: 38.4, estado: 0 },
  { id: 2, nombre: "María", apellido: "Quispe Flores", partido: "Alianza Popular", colorPartido: "#e3342f", tipoEleccion: 1, cargo: "Gobernadora", municipio: "Cochabamba", departamento: "Cochabamba", edad: 45, foto: "https://i.pravatar.cc/150?img=5", propuesta: "Salud universal, derechos indígenas y economía comunitaria.", porcentajeVotos: 29.1, estado: 0 },
  { id: 3, nombre: "Jorge", apellido: "Torrico Blanco", partido: "Frente Cívico", colorPartido: "#f6ad55", tipoEleccion: 1, cargo: "Gobernador", municipio: "Cochabamba", departamento: "Cochabamba", edad: 61, foto: "https://i.pravatar.cc/150?img=15", propuesta: "Reducción de impuestos, apoyo al sector privado y seguridad ciudadana.", porcentajeVotos: 18.7, estado: 0 },
  { id: 4, nombre: "Ana", apellido: "Gutierrez Soria", partido: "Nueva Bolivia", colorPartido: "#48bb78", tipoEleccion: 0, cargo: "Alcaldesa", municipio: "Cochabamba", departamento: "Cochabamba", edad: 38, foto: "https://i.pravatar.cc/150?img=47", propuesta: "Movilidad urbana, espacios verdes y digitalización de servicios municipales.", porcentajeVotos: 42.3, estado: 0 },
  { id: 5, nombre: "Roberto", apellido: "Mamani Cruz", partido: "Movimiento Democrático", colorPartido: "#1a56db", tipoEleccion: 0, cargo: "Alcalde", municipio: "Cochabamba", departamento: "Cochabamba", edad: 49, foto: "https://i.pravatar.cc/150?img=33", propuesta: "Mercados populares, empleo local y agua potable para todos los barrios.", porcentajeVotos: 33.6, estado: 0 },
  { id: 6, nombre: "Lucía", apellido: "Pedraza Vda. de Rojas", partido: "Alianza Popular", colorPartido: "#e3342f", tipoEleccion: 0, cargo: "Alcaldesa", municipio: "Quillacollo", departamento: "Cochabamba", edad: 41, foto: "https://i.pravatar.cc/150?img=23", propuesta: "Turismo comunitario, apoyo a la mujer emprendedora y gestión de residuos.", porcentajeVotos: 51.2, estado: 0 },
  { id: 7, nombre: "Pedro", apellido: "Condori Laime", partido: "Frente Cívico", colorPartido: "#f6ad55", tipoEleccion: 1, cargo: "Gobernador", municipio: "La Paz", departamento: "La Paz", edad: 55, foto: "https://i.pravatar.cc/150?img=60", propuesta: "Conexión vial entre municipios, minería responsable y turismo de altura.", porcentajeVotos: 44.7, estado: 0 },
  { id: 8, nombre: "Valentina", apellido: "Choque Mamani", partido: "Nueva Bolivia", colorPartido: "#48bb78", tipoEleccion: 0, cargo: "Alcaldesa", municipio: "El Alto", departamento: "La Paz", edad: 36, foto: "https://i.pravatar.cc/150?img=9", propuesta: "Industria local, tecnología e innovación y acceso a vivienda digna.", porcentajeVotos: 37.9, estado: 0 },
];

const TIPO_LABELS = { 0: "Municipal", 1: "Gubernamental" };
const ESTADO_LABELS = { 0: "Activo", 1: "Inactivo", 2: "Descalificado" };

const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0a0a0f;
    --surface: #12121a;
    --surface2: #1c1c28;
    --border: rgba(255,255,255,0.07);
    --gold: #d4a843;
    --gold-dim: rgba(212,168,67,0.15);
    --text: #f0ede8;
    --muted: #8a8898;
    --municipal: #3b82f6;
    --gubernatorial: #a855f7;
    --radius: 16px;
  }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
  }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--surface); }
  ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 3px; }

  .fade-in { animation: fadeIn 0.4s ease forwards; }
  @keyframes fadeIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }

  .card-hover { transition: transform 0.25s ease, box-shadow 0.25s ease; }
  .card-hover:hover { transform: translateY(-4px); box-shadow: 0 20px 60px rgba(0,0,0,0.5); }
`;

function VoteBar({ pct, color }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 99, height: 6, overflow: "hidden", marginTop: 8 }}>
      <div style={{
        width: `${Math.min(pct, 100)}%`, height: "100%",
        background: color, borderRadius: 99,
        transition: "width 0.8s cubic-bezier(.4,0,.2,1)"
      }} />
    </div>
  );
}

function Badge({ label, color }) {
  return (
    <span style={{
      background: color + "22", color, border: `1px solid ${color}44`,
      borderRadius: 99, padding: "2px 10px", fontSize: 11, fontWeight: 600, letterSpacing: 0.5
    }}>{label}</span>
  );
}

function CandidatoCard({ c, onClick }) {
  const tipoColor = c.tipoEleccion === 0 ? "var(--municipal)" : "var(--gubernatorial)";
  return (
    <div className="card-hover" onClick={() => onClick(c)} style={{
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius)",
      overflow: "hidden",
      cursor: "pointer",
      position: "relative"
    }}>
      <div style={{ height: 4, background: `linear-gradient(90deg, ${c.colorPartido}, transparent)` }} />
      <div style={{ padding: "20px 20px 16px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 14 }}>
          <img src={c.foto} alt={c.nombre}
            style={{ width: 60, height: 60, borderRadius: "50%", objectFit: "cover", border: `2px solid ${c.colorPartido}`, flexShrink: 0 }}
            onError={e => e.target.src = `https://ui-avatars.com/api/?name=${c.nombre}+${c.apellido}&background=1c1c28&color=d4a843`}
          />
          <div style={{ minWidth: 0 }}>
            <p style={{ fontFamily: "'Playfair Display'", fontSize: 17, fontWeight: 700, lineHeight: 1.2, marginBottom: 4 }}>
              {c.nombre} {c.apellido}
            </p>
            <p style={{ color: "var(--muted)", fontSize: 12, marginBottom: 6 }}>{c.cargo} · {c.municipio}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              <Badge label={TIPO_LABELS[c.tipoEleccion]} color={tipoColor} />
              <Badge label={c.partido} color={c.colorPartido} />
            </div>
          </div>
        </div>
        <p style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.5, marginBottom: 14,
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {c.propuesta}
        </p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 11, color: "var(--muted)" }}>Intención de voto</span>
          <span style={{ fontSize: 16, fontWeight: 700, color: c.colorPartido }}>{c.porcentajeVotos}%</span>
        </div>
        <VoteBar pct={c.porcentajeVotos} color={c.colorPartido} />
      </div>
    </div>
  );
}

function Modal({ candidato, onClose }) {
  if (!candidato) return null;
  const tipoColor = candidato.tipoEleccion === 0 ? "var(--municipal)" : "var(--gubernatorial)";
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20
    }}>
      <div onClick={e => e.stopPropagation()} className="fade-in" style={{
        background: "var(--surface2)", borderRadius: 24, maxWidth: 500, width: "100%",
        border: "1px solid var(--border)", overflow: "hidden"
      }}>
        <div style={{
          background: `linear-gradient(135deg, ${candidato.colorPartido}33, transparent)`,
          padding: "30px 30px 20px", borderBottom: "1px solid var(--border)"
        }}>
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            <img src={candidato.foto} alt={candidato.nombre}
              style={{ width: 80, height: 80, borderRadius: "50%", border: `3px solid ${candidato.colorPartido}`, objectFit: "cover" }}
              onError={e => e.target.src = `https://ui-avatars.com/api/?name=${candidato.nombre}&background=1c1c28&color=d4a843`}
            />
            <div>
              <p style={{ fontFamily: "'Playfair Display'", fontSize: 22, fontWeight: 900, lineHeight: 1.2 }}>
                {candidato.nombre} {candidato.apellido}
              </p>
              <p style={{ color: "var(--muted)", marginTop: 4 }}>{candidato.cargo}</p>
              <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
                <Badge label={TIPO_LABELS[candidato.tipoEleccion]} color={tipoColor} />
                <Badge label={ESTADO_LABELS[candidato.estado]} color={candidato.estado === 0 ? "#22c55e" : "#ef4444"} />
              </div>
            </div>
          </div>
        </div>
        <div style={{ padding: 30 }}>
          {[
            ["🏛 Partido", candidato.partido],
            ["📍 Municipio", candidato.municipio],
            ["🗺 Departamento", candidato.departamento],
            ["🎂 Edad", `${candidato.edad} años`],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--border)" }}>
              <span style={{ color: "var(--muted)", fontSize: 13 }}>{k}</span>
              <span style={{ fontSize: 13, fontWeight: 500 }}>{v}</span>
            </div>
          ))}
          <div style={{ marginTop: 20 }}>
            <p style={{ color: "var(--gold)", fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Propuesta</p>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--muted)" }}>{candidato.propuesta}</p>
          </div>
          <div style={{ marginTop: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 13, color: "var(--muted)" }}>Intención de voto</span>
              <span style={{ fontSize: 20, fontWeight: 800, color: candidato.colorPartido }}>{candidato.porcentajeVotos}%</span>
            </div>
            <VoteBar pct={candidato.porcentajeVotos} color={candidato.colorPartido} />
          </div>
          <button onClick={onClose} style={{
            marginTop: 24, width: "100%", padding: "12px",
            background: "var(--gold)", color: "#0a0a0f",
            border: "none", borderRadius: 12, fontWeight: 700, fontSize: 14,
            cursor: "pointer", fontFamily: "'DM Sans'"
          }}>Cerrar</button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [candidatos, setCandidatos] = useState([]);
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [filtroDept, setFiltroDept] = useState("todos");
  const [filtroPartido, setFiltroPartido] = useState("todos");
  const [busqueda, setBusqueda] = useState("");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5082/api/candidatos")
      .then(res => res.json())
      .then(data => {
        setCandidatos(data);
        setLoading(false);
      })
      .catch(() => {
        // Fallback a datos mock si la API no está disponible
        setCandidatos(CANDIDATOS_MOCK);
        setLoading(false);
      });
  }, []);

  const departamentos = [...new Set(candidatos.map(c => c.departamento))];
  const partidos = [...new Set(candidatos.map(c => c.partido))];

  const filtrados = candidatos.filter(c => {
    const matchTipo = filtroTipo === "todos" || String(c.tipoEleccion) === filtroTipo;
    const matchDept = filtroDept === "todos" || c.departamento === filtroDept;
    const matchPartido = filtroPartido === "todos" || c.partido === filtroPartido;
    const matchBusq = busqueda === "" ||
      `${c.nombre} ${c.apellido} ${c.cargo} ${c.partido}`.toLowerCase().includes(busqueda.toLowerCase());
    return matchTipo && matchDept && matchPartido && matchBusq;
  });

  const stats = {
    total: candidatos.length,
    municipales: candidatos.filter(c => c.tipoEleccion === 0).length,
    gubernamentales: candidatos.filter(c => c.tipoEleccion === 1).length,
  };

  return (
    <>
      <style>{globalCSS}</style>

      {/* HEADER */}
      <header style={{
        background: "var(--surface)",
        borderBottom: "1px solid var(--border)",
        padding: "0 24px",
        position: "sticky", top: 0, zIndex: 100,
        backdropFilter: "blur(12px)"
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", height: 64, justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "linear-gradient(135deg, var(--gold), #c07830)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18
            }}>🗳</div>
            <div>
              <p style={{ fontFamily: "'Playfair Display'", fontWeight: 900, fontSize: 16, lineHeight: 1 }}>EleccionesBO</p>
              <p style={{ fontSize: 10, color: "var(--muted)", letterSpacing: 0.5 }}>CANDIDATOS 2025</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            {[
              { label: "Total", val: stats.total, color: "var(--gold)" },
              { label: "Municipales", val: stats.municipales, color: "var(--municipal)" },
              { label: "Gubernamentales", val: stats.gubernamentales, color: "var(--gubernatorial)" },
            ].map(s => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <p style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.val}</p>
                <p style={{ fontSize: 10, color: "var(--muted)" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* HERO */}
      <div style={{
        background: "linear-gradient(135deg, rgba(212,168,67,0.08), rgba(168,85,247,0.08))",
        borderBottom: "1px solid var(--border)",
        padding: "48px 24px 40px"
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ fontFamily: "'Playfair Display'", fontSize: 40, fontWeight: 900, lineHeight: 1.1, marginBottom: 10 }}>
            Candidatos<br />
            <span style={{ background: "linear-gradient(90deg, var(--gold), #c07830)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Electorales Bolivia
            </span>
          </p>
          <p style={{ color: "var(--muted)", maxWidth: 480, lineHeight: 1.6 }}>
            Conoce las propuestas y el perfil de cada candidato para las elecciones municipales y gubernamentales.
          </p>
        </div>
      </div>

      {/* FILTROS */}
      <div style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)", padding: "16px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
          <input value={busqueda} onChange={e => setBusqueda(e.target.value)}
            placeholder="🔍  Buscar candidato, cargo, partido..."
            style={{
              background: "var(--surface2)", border: "1px solid var(--border)",
              borderRadius: 10, padding: "9px 16px", color: "var(--text)", fontSize: 13,
              outline: "none", width: 280, fontFamily: "'DM Sans'"
            }}
          />
          {[
            { label: "Tipo", val: filtroTipo, setter: setFiltroTipo, opts: [["todos", "Todos"], ["0", "Municipal"], ["1", "Gubernamental"]] },
            { label: "Departamento", val: filtroDept, setter: setFiltroDept, opts: [["todos", "Todos"], ...departamentos.map(d => [d, d])] },
            { label: "Partido", val: filtroPartido, setter: setFiltroPartido, opts: [["todos", "Todos"], ...partidos.map(p => [p, p])] },
          ].map(f => (
            <select key={f.label} value={f.val} onChange={e => f.setter(e.target.value)} style={{
              background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--text)",
              borderRadius: 10, padding: "9px 14px", fontSize: 13, outline: "none", cursor: "pointer",
              fontFamily: "'DM Sans'"
            }}>
              {f.opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          ))}
          <span style={{ marginLeft: "auto", color: "var(--muted)", fontSize: 12 }}>
            {filtrados.length} candidato{filtrados.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* GRID */}
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: 80, color: "var(--muted)" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>⏳</div>
            <p>Cargando candidatos...</p>
          </div>
        ) : filtrados.length === 0 ? (
          <div style={{ textAlign: "center", padding: 80, color: "var(--muted)" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔎</div>
            <p>No se encontraron candidatos con estos filtros.</p>
          </div>
        ) : (
          <div className="fade-in" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 20
          }}>
            {filtrados.map(c => <CandidatoCard key={c.id} c={c} onClick={setSelected} />)}
          </div>
        )}
      </main>

      <Modal candidato={selected} onClose={() => setSelected(null)} />

      <div style={{
        background: "var(--surface)", borderTop: "1px solid var(--border)",
        padding: "16px 24px", textAlign: "center"
      }}>
        <p style={{ fontSize: 12, color: "var(--muted)" }}>
          🔌 API conectada en{" "}
          <code style={{ color: "var(--gold)", background: "var(--surface2)", padding: "1px 6px", borderRadius: 4 }}>
            http://localhost:5082/api/candidatos
          </code>
        </p>
      </div>
    </>
  );
}
