// Datos de todos los módulos
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

function SeccionModulos(props) {
  return (
    <section className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">{props.titulo}</h2>
      <ul className="space-y-4">
        {props.lista.map((modulo, index) => {
          // Convertimos el nombre del módulo a un nombre de archivo válido:
          const archivoZip = modulo
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Quitar tildes
            .replace(/[\s-]+/g, "-") // Espacios a guiones
            .replace(/[^a-zA-Z0-9\-]/g, "") // Solo letras, números y guiones
            + ".zip";

          return (
            <li key={index} className="flex justify-between items-center bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow">
              {modulo}{" "}
              <a href={`/${archivoZip}`} download>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">Descargar</button>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}


function App() {
  return (
    <div style={{ fontFamily: "Arial", padding: "20px" }}>
      <h1>Campus Gabito</h1>
      <p>Selecciona el módulo que quieres estudiar o descargar</p>

      {/* 1º Año */}
      <SeccionModulos titulo="1º Año DAW" lista={modulosDAW["1º Año DAW"]} />

      {/* 2º Año */}
      <SeccionModulos titulo="2º Año DAW" lista={modulosDAW["2º Año DAW"]} />

      {/* Extras */}
      <SeccionModulos titulo="Módulos Extra" lista={modulosDAW["Módulos Extra"]} />
    </div>
  );
}

export default App;