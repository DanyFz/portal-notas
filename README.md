# Portal de Notas 📚

Portal web para consulta de notas y asistencia universitaria. Diseñado para la Universidad Nacional de Colombia.

## Stack Tecnológico

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS v4** + **shadcn/ui**
- **SheetJS (xlsx)** para parseo de archivos Excel
- Almacenamiento en JSON local (sin base de datos)

## Despliegue en Vercel

### Opción 1: Despliegue directo
```bash
npm install -g vercel
vercel deploy
```

### Opción 2: Conectar repositorio
1. Sube el código a GitHub/GitLab
2. Conecta el repositorio en [vercel.com](https://vercel.com)
3. Vercel detectará Next.js automáticamente
4. Click en "Deploy"

> **Nota**: El sistema soporta almacenamiento persistente en **Vercel Blob**. Al subir el Excel desde la interfaz de `/admin`, los datos se guardan tanto en la nube (Vercel Blob) como en local. Si no hay token de Blob configurado, el sistema lee del archivo local `public/data/students.json`.

## Uso Local

### Instalación
```bash
npm install
```

### Desarrollo
```bash
npm run dev
```
Abre [http://localhost:3000](http://localhost:3000).

### Build
```bash
npm run build
```

## Preparar el Archivo Excel

El sistema espera un archivo `.xlsx` con las siguientes características:

### Estructura del Excel
- **Una hoja por grupo** (el nombre de la hoja se usa como nombre del grupo)
- Cada hoja puede tener una **tabla combinada** o **dos tablas separadas** (asistencia + notas)

### Columnas requeridas
| Columna | Palabras clave detectadas | Ejemplo |
|---------|---------------------------|---------|
| Nombre | nombre, estudiante, alumno | Juan Pérez López |
| Correo | correo, email, mail | juanperez@unal.edu.co |
| Programa | programa, carrera | Ingeniería de Sistemas |

### Columnas de asistencia
Las columnas con fechas se detectan automáticamente. Formatos soportados:
- Fechas de Excel (serial number)
- `YYYY-MM-DD` (ej: 2024-03-01)
- `DD/MM/YYYY` (ej: 01/03/2024)

Valores de asistencia reconocidos:
- **Presente**: 1, P, X, ✓, Sí, Presente
- **Excusa**: E, Excusa, Justificado
- **Ausente**: 0, F, Falta, No, celda vacía

### Columnas de notas
Se detectan automáticamente por palabras clave: Quiz, Nota, Parcial, Examen, Taller, Trabajo, Laboratorio, Lab.

- Celdas con valor numérico = nota del estudiante
- **Celdas vacías = inasistencia con excusa** (se excluyen del promedio)

### Ejemplo de estructura

| Nombre | Correo | Programa | 2024-03-01 | 2024-03-08 | Quiz 1 | Quiz 2 | Quiz 3 |
|--------|--------|----------|------------|------------|--------|--------|--------|
| Ana López | analopez@unal.edu.co | Ing. Sistemas | P | E | 4.5 | | 3.8 |
| Carlos Ruiz | cruiz@unal.edu.co | Matemáticas | P | P | 3.2 | 4.0 | 2.5 |

## Credenciales

### Estudiantes
- **Usuario**: parte del correo antes de @ (ej: `analopez`)

### Administrador
- **Contraseña**: `admin123`

## Estructura del Proyecto

```
portal-notas/
├── app/
│   ├── page.tsx              # Login de estudiantes
│   ├── layout.tsx            # Layout raíz
│   ├── globals.css           # Estilos globales
│   ├── dashboard/
│   │   └── page.tsx          # Dashboard del estudiante
│   ├── admin/
│   │   └── page.tsx          # Panel de administración (subida Excel)
│   └── api/
│       ├── students/
│       │   └── route.ts      # Consulta estudiantes (Vercel Blob / local)
│       └── upload-excel/
│           └── route.ts      # API para subida y procesamiento de Excel
├── lib/
│   ├── parseExcel.ts         # Lógica central de parseo del Excel
│   ├── auth.ts               # Autenticación y utilidades
│   ├── types.ts              # Tipos TypeScript
│   └── utils.ts              # Utilidades de estilos (cn)
├── public/
│   └── data/
│       └── students.json     # Datos de estudiantes (fallback local)
├── next.config.ts
├── package.json
└── README.md
```

