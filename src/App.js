import React, { useState } from "react";

const modulosDAW = {
  "1º Año DAW": [
    "01 - Sistemas Informáticos",
    "02 - Bases de Datos",
    "03 - Programación Java",
    "04 - Lenguajes de Marcas",
    "05 - Entornos de Desarrollo",
    "06 - FOL"
  ],
  "2º Año DAW": [
    "07 - Desarrollo Web Cliente",
    "08 - Desarrollo Web Servidor",
    "09 - Despliegue de Aplicaciones",
    "10 - Diseño de Interfaces",
    "11 - EIE",
    "12 - Proyecto Final",
    "13 - FCT"
  ],
  "Módulos Extra": [
    "NodeJS Avanzado",
    "Python Básico y Avanzado",
    "DevOps Completo",
    "Testing y TDD",
    "Seguridad Web",
    "Cloud AWS/GCP",
    "Algoritmos y Estructuras de Datos"
  ]
};

function SeccionModulos({ titulo, lista, filtro }) {
  // Filtramos los módulos según lo que escribe el usuario
  const listaFiltrada = lista.filter(modulo =>
    modulo.toLowerCase().includes(filtro.toLowerCase())
  );

  if (listaFiltrada.length === 0) {
    return null;
  }

  return (
    <section className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">{titulo}</h2>
      <ul className="space-y-4">
        {listaFiltrada.map((modulo, index) => {
          const archivoZip = modulo
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .replace(/[\s-]+/g, "-")
            .replace(/[^a-zA-Z0-9\-]/g, "") + ".zip";

          return (
            <li key={index} className="flex justify-between items-center bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow">
              {modulo}
              <a href={`/${archivoZip}`} download>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                  Descargar
                </button>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function App() {
  const [filtro, setFiltro] = useState("");

  return (
    <div className="p-6 font-sans bg-blue-50">
      <h1 className="text-4xl font-bold text-center mb-4">Campus Gabito</h1>
      <p className="text-center mb-6">Busca un módulo o descárgalo</p>

      {/* Input para buscar */}
      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="Buscar módulo..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="border border-gray-400 rounded px-4 py-2 w-80"
        />
      </div>

      {/* Listas filtradas */}
      <SeccionModulos titulo="1º Año DAW" lista={modulosDAW["1º Año DAW"]} filtro={filtro} />
      <SeccionModulos titulo="2º Año DAW" lista={modulosDAW["2º Año DAW"]} filtro={filtro} />
      <SeccionModulos titulo="Módulos Extra" lista={modulosDAW["Módulos Extra"]} filtro={filtro} />
    </div>
  );
}

export default App;
