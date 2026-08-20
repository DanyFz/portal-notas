"use client";

import { useState } from "react";
import Link from "next/link";

interface TheoryUnit {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  topics: {
    title: string;
    description: string;
    type: "Lectura" | "Guía" | "Taller" | "Resumen";
    duration: string;
  }[];
}

const THEORY_UNITS: TheoryUnit[] = [
  {
    id: "u1",
    title: "Unidad 1: Fundamentos y Conceptos Base",
    subtitle: "Introducción y principios teórico-prácticos",
    description: "Estudio de las bases teóricas esenciales, definiciones conceptuales y marco de trabajo de la asignatura.",
    topics: [
      {
        title: "1.1 Introducción y Marco Conceptual",
        description: "Revisión general de la asignatura, objetivos de aprendizaje y conceptos fundamentales.",
        type: "Lectura",
        duration: "45 min",
      },
      {
        title: "1.2 Principios Teóricos Fundamentales",
        description: "Análisis detallado de teoremas primarios y formulación de hipótesis iniciales.",
        type: "Guía",
        duration: "60 min",
      },
      {
        title: "1.3 Taller de Refuerzo Conceptual 1",
        description: "Ejercicios guiados para afianzar los conceptos fundamentales de la Unidad 1.",
        type: "Taller",
        duration: "90 min",
      },
    ],
  },
  {
    id: "u2",
    title: "Unidad 2: Análisis y Metodología Aplicada",
    subtitle: "Modelación, procedimientos y resolución de problemas",
    description: "Desarrollo de competencias analíticas mediante casos de estudio y aplicación de modelos metodológicos.",
    topics: [
      {
        title: "2.1 Metodología de Resolución de Casos",
        description: "Pautas paso a paso para el abordaje sistémico de problemas analíticos complejos.",
        type: "Guía",
        duration: "50 min",
      },
      {
        title: "2.2 Modelación Numérica y Simulación",
        description: "Uso de herramientas de simulación y análisis cuantitativo de resultados.",
        type: "Lectura",
        duration: "75 min",
      },
      {
        title: "2.3 Guía Práctica de Laboratorio / Taller",
        description: "Actividad práctica grupal orientada a la verificación empírica de conceptos.",
        type: "Taller",
        duration: "120 min",
      },
    ],
  },
  {
    id: "u3",
    title: "Unidad 3: Preparación para Evaluaciones y Quices",
    subtitle: "Síntesis, repaso de quices y banco de problemas",
    description: "Recopilación de temas clave, resúmenes analíticos y preguntas frecuentes de preparación para quices y exámenes.",
    topics: [
      {
        title: "3.1 Resumen Ejecutivo para Quices",
        description: "Compendio estructurado con fórmulas clave, definiciones indispensables y errores comunes.",
        type: "Resumen",
        duration: "30 min",
      },
      {
        title: "3.2 Banco de Preguntas Modelo",
        description: "Colección de ejercicios resueltos y preguntas tipo examen con solución paso a paso.",
        type: "Taller",
        duration: "90 min",
      },
    ],
  },
];

export default function TheoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUnit, setSelectedUnit] = useState<string>("all");

  const filteredUnits = THEORY_UNITS.filter((unit) => {
    const matchesUnit = selectedUnit === "all" || unit.id === selectedUnit;
    const matchesSearch =
      unit.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.topics.some(
        (t) =>
          t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesUnit && matchesSearch;
  });

  return (
    <main className="flex-1 flex flex-col min-h-screen bg-[#2E3B33] text-[#D9CBB6] beige-grid-bg">
      {/* Top Bar Navigation */}
      <div className="border-b border-[#D9CBB6]/20 bg-[#2E3B33]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#7A8F73] to-[#4F6B57] border border-[#D9CBB6]/30 flex items-center justify-center text-[#D9CBB6] hover:scale-105 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </Link>
            <div>
              <span className="font-bold text-sm text-[#D9CBB6] glow-beige block">Portal Académico</span>
              <span className="text-xs text-[#BFAE8F]">Módulo de Teoría</span>
            </div>
          </div>
          <Link href="/" className="text-xs text-[#BFAE8F] hover:text-[#D9CBB6] flex items-center gap-1.5 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al Menú
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 flex-1 w-full">
        {/* Header Hero Banner */}
        <div className="beige-card rounded-2xl p-6 sm:p-8 border border-[#D9CBB6]/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#7A8F73]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#7A8F73]/20 border border-[#7A8F73]/40 text-[#D9CBB6]">
              📚 Material Didáctico Oficial
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#D9CBB6] glow-beige">
              Módulo de Teoría y Recursos Académicos
            </h1>
            <p className="text-[#BFAE8F] text-sm max-w-2xl">
              Explora las unidades temáticas, guías de estudio, lecturas recomendadas y talleres diseñados para el acompañamiento teórico de la asignatura.
            </p>
          </div>
        </div>

        {/* Filter and Search controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* Unit Filter Buttons */}
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <button
              onClick={() => setSelectedUnit("all")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                selectedUnit === "all"
                  ? "bg-[#7A8F73] text-[#D9CBB6] border border-[#7A8F73] shadow-md"
                  : "bg-[#4F6B57]/30 text-[#BFAE8F] border border-[#D9CBB6]/15 hover:border-[#7A8F73]/50"
              }`}
            >
              Todas las Unidades
            </button>
            {THEORY_UNITS.map((u) => (
              <button
                key={u.id}
                onClick={() => setSelectedUnit(u.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  selectedUnit === u.id
                    ? "bg-[#7A8F73] text-[#D9CBB6] border border-[#7A8F73] shadow-md"
                    : "bg-[#4F6B57]/30 text-[#BFAE8F] border border-[#D9CBB6]/15 hover:border-[#7A8F73]/50"
                }`}
              >
                {u.title.split(":")[0]}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Buscar tema o palabra clave..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="beige-input w-full h-9 rounded-lg pl-9 pr-3 text-xs"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#BFAE8F] absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Units List */}
        <div className="space-y-6">
          {filteredUnits.length === 0 ? (
            <div className="beige-card rounded-xl p-8 text-center space-y-2">
              <p className="text-base text-[#D9CBB6] font-semibold">No se encontraron temas</p>
              <p className="text-xs text-[#BFAE8F]">Intenta con otros términos de búsqueda o selecciona otra unidad.</p>
            </div>
          ) : (
            filteredUnits.map((unit) => (
              <div key={unit.id} className="beige-card rounded-2xl overflow-hidden border border-[#D9CBB6]/20">
                {/* Unit Card Header */}
                <div className="p-5 border-b border-[#D9CBB6]/15 bg-[#4F6B57]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h2 className="text-lg font-bold text-[#D9CBB6]">{unit.title}</h2>
                    <p className="text-xs text-[#BFAE8F] mt-0.5">{unit.subtitle}</p>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-[#7A8F73]/20 border border-[#7A8F73]/40 text-[#D9CBB6] self-start sm:self-center">
                    {unit.topics.length} temas
                  </span>
                </div>

                {/* Description */}
                <div className="p-5 border-b border-[#D9CBB6]/10 text-xs text-[#BFAE8F]/90 leading-relaxed">
                  {unit.description}
                </div>

                {/* Topics Grid */}
                <div className="p-5 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {unit.topics.map((topic, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#2E3B33]/80 border border-[#D9CBB6]/15 hover:border-[#7A8F73]/60 transition-all flex flex-col justify-between group"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[11px]">
                          <span
                            className={`px-2 py-0.5 rounded-md font-semibold ${
                              topic.type === "Lectura"
                                ? "bg-[#7A8F73]/20 text-[#D9CBB6] border border-[#7A8F73]/40"
                                : topic.type === "Guía"
                                ? "bg-[#4F6B57]/40 text-[#BFAE8F] border border-[#7A8F73]/30"
                                : topic.type === "Taller"
                                ? "bg-[#BFAE8F]/20 text-[#BFAE8F] border border-[#BFAE8F]/30"
                                : "bg-[#7A8F73]/30 text-[#D9CBB6] border border-[#7A8F73]/50"
                            }`}
                          >
                            {topic.type}
                          </span>
                          <span className="text-[#BFAE8F]/70">{topic.duration}</span>
                        </div>
                        <h3 className="text-sm font-semibold text-[#D9CBB6] group-hover:text-[#BFAE8F] transition-colors">
                          {topic.title}
                        </h3>
                        <p className="text-xs text-[#BFAE8F]/80 line-clamp-2">
                          {topic.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#D9CBB6]/10 flex items-center justify-between text-xs text-[#7A8F73] group-hover:text-[#D9CBB6] transition-colors">
                        <span>Ver material</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
