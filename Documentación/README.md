# 🗳️ EleccionesBO — API y Frontend

Sistema para visualizar candidatos de las **elecciones municipales y gubernamentales de Bolivia**, compuesto por una API REST en C# (.NET 8) y un frontend en React.

---

## 📁 Estructura del Proyecto

```
Segunda_Instancia/
├── Elecciones_API/          # Backend C# .NET 8
│   ├── Controllers/
│   │   └── CandidatosController.cs
│   ├── Models/
│   │   └── Candidato.cs
│   ├── Services/
│   │   └── CandidatoService.cs
│   ├── Program.cs
│   ├── appsettings.json
│   └── Elecciones_API.csproj
│
└── elecciones-frontend/     # Frontend React + Vite
    ├── src/
    │   └── EleccionesApp.jsx
    ├── package.json
    └── vite.config.js
```

---

## ⚙️ API — C# .NET 8

### Requisitos

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8)

### Instalación y ejecución

```bash
cd Elecciones_API
dotnet add package Swashbuckle.AspNetCore
dotnet run
```

La API estará disponible en:

| URL | Descripción |
|-----|-------------|
| `http://localhost:5082` | Swagger UI (documentación interactiva) |
| `http://localhost:5082/api/candidatos` | Endpoint principal |

### Endpoints disponibles

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/api/candidatos` | Obtener todos los candidatos |
| `GET` | `/api/candidatos/{id}` | Obtener candidato por ID |
| `GET` | `/api/candidatos/tipo/{tipo}` | Filtrar por tipo (`0` = Municipal, `1` = Gubernamental) |
| `GET` | `/api/candidatos/departamento/{dept}` | Filtrar por departamento |
| `POST` | `/api/candidatos` | Crear nuevo candidato |
| `PUT` | `/api/candidatos/{id}` | Actualizar candidato |
| `DELETE` | `/api/candidatos/{id}` | Eliminar candidato |

### Ejemplo de cuerpo para `POST /api/candidatos`

```json
{
  "nombre": "Juan",
  "apellido": "Pérez López",
  "partido": "Partido Ejemplo",
  "colorPartido": "#e3342f",
  "tipoEleccion": 0,
  "cargo": "Alcalde",
  "municipio": "Cochabamba",
  "departamento": "Cochabamba",
  "edad": 45,
  "foto": "https://i.pravatar.cc/150?img=20",
  "propuesta": "Mejorar el transporte público y los espacios verdes."
}
```

### Enumeraciones

**TipoEleccion**
| Valor | Descripción |
|-------|-------------|
| `0` | Municipal |
| `1` | Gubernamental |

**Estado**
| Valor | Descripción |
|-------|-------------|
| `0` | Activo |
| `1` | Inactivo |
| `2` | Descalificado |

---

## ⚛️ Frontend — React

### Requisitos

- [Node.js](https://nodejs.org/) v18 o superior
- npm o yarn

### Instalación y ejecución

```bash
cd elecciones-frontend
npm install
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

### Conectar con la API real

En `EleccionesApp.jsx`, reemplaza el `useEffect` con:

```js
useEffect(() => {
  fetch("http://localhost:5082/api/candidatos")
    .then(res => res.json())
    .then(data => {
      setCandidatos(data);
      setLoading(false);
    });
}, []);
```

### Funcionalidades

- 🔍 Búsqueda por nombre, cargo o partido
- 🏛️ Filtro por tipo de elección (Municipal / Gubernamental)
- 🗺️ Filtro por departamento
- 🎨 Filtro por partido político
- 📊 Barra de intención de voto por candidato
- 🪟 Modal de detalle con información completa

---

## 🔧 CORS — Configuración

La API tiene CORS habilitado para los siguientes orígenes (configurado en `Program.cs`):

```
http://localhost:5173   ← Vite (React)
http://localhost:3000   ← Create React App
```

Si usas otro puerto, agrégalo en `Program.cs`:

```csharp
policy.WithOrigins("http://localhost:TU_PUERTO")
```

---

## 🛠️ Tecnologías utilizadas

| Capa | Tecnología |
|------|------------|
| Backend | C# · .NET 8 · ASP.NET Core Web API |
| Documentación API | Swagger / Swashbuckle |
| Frontend | React 18 · Vite |
| Estilos | CSS-in-JS (inline styles) |
| Fuentes | Google Fonts — Playfair Display + DM Sans |

---

## 👤 Autor

Desarrollado como proyecto académico — **UCATEC** · Segunda Instancia
