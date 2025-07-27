import React, { useState, useEffect } from "react";

function SeccionModulos({ titulo, lista, filtro, onSeleccionarModulo, moduloSeleccionado, contenidos }) {
  // Filtrar módulos según filtro
  const listaFiltrada = lista.filter(modulo =>
    modulo.nombre.toLowerCase().includes(filtro.toLowerCase())
  );

  if (listaFiltrada.length === 0) return null;

  return (
    <section className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">{titulo}</h2>
      <ul className="space-y-4">
        {listaFiltrada.map((modulo) => {
          const idModulo = modulo.nombre
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .replace(/[\s-]+/g, "-")
            .replace(/[^a-zA-Z0-9\-]/g, "")
            .toLowerCase();

          const archivoZip = idModulo + ".zip";

          return (
            <li
              key={modulo.id}
              id={idModulo}
              className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-center">
                {/* Módulo clicable para mostrar contenidos */}
                <button
                  onClick={() => onSeleccionarModulo(modulo.id)}
                  className="text-left text-blue-600 hover:no-underline cursor-pointer font-semibold"
                >
                  {modulo.nombre}
                </button>

                {/* Botón descargar */}
                <a href={`/${archivoZip}`} download>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                    Descargar
                  </button>
                </a>
              </div>

              {/* Mostrar contenidos si este módulo está seleccionado */}
              {moduloSeleccionado === modulo.id && contenidos.length > 0 && (
                <div className="mt-4 border-t pt-4 text-gray-700">
                  {contenidos.map((contenido) => (
                    <div key={contenido.id} className="mb-3">
                      <h4 className="font-semibold">{contenido.titulo || "Sin título"}</h4>
                      {contenido.apunte && <p><strong>Apunte:</strong> {contenido.apunte}</p>}
                      {contenido.ejercicio && <p><strong>Ejercicio:</strong> {contenido.ejercicio}</p>}
                      {contenido.proyecto && <p><strong>Proyecto:</strong> {contenido.proyecto}</p>}
                      {contenido.examen && <p><strong>Examen:</strong> {contenido.examen}</p>}
                      {contenido.url && (
                        <a
                          href={contenido.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          Ver recurso externo
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function App() {
  const [filtro, setFiltro] = useState("");
  const [modulos, setModulos] = useState({});
  const [moduloSeleccionado, setModuloSeleccionado] = useState(null);
  const [contenidos, setContenidos] = useState([]);

  // Cargar módulos desde API al inicio
  useEffect(() => {
    fetch("http://localhost:4000/api/modulos/")
      .then((res) => res.json())
      .then((data) => setModulos(data))
      .catch((err) => console.error("Error cargando módulos:", err));
  }, []);

  // Función para cargar contenidos y seleccionar módulo
  const onSeleccionarModulo = (id) => {
    if (id === moduloSeleccionado) {
      // Si pulsamos el mismo módulo, deseleccionamos y limpiamos contenidos
      setModuloSeleccionado(null);
      setContenidos([]);
      return;
    }

    fetch(`http://localhost:4000/api/modulos/${id}/contenidos`)
      .then((res) => res.json())
      .then((data) => {
        setModuloSeleccionado(id);
        setContenidos(data);
      })
      .catch((err) => console.error("Error cargando contenidos:", err));
  };

  return (
    <div className="p-6 font-sans bg-blue-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-4">Campus Gabito</h1>
      <p className="text-center mb-6">Busca un módulo o descárgalo</p>

      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="Buscar módulo..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="border border-gray-400 rounded px-4 py-2 w-80"
        />
      </div>

      {/* Renderizamos las secciones de módulos */}
      <SeccionModulos
        titulo="1º Año DAW"
        lista={modulos["1º"] || []}
        filtro={filtro}
        onSeleccionarModulo={onSeleccionarModulo}
        moduloSeleccionado={moduloSeleccionado}
        contenidos={moduloSeleccionado ? contenidos : []}
      />
      <SeccionModulos
        titulo="2º Año DAW"
        lista={modulos["2º"] || []}
        filtro={filtro}
        onSeleccionarModulo={onSeleccionarModulo}
        moduloSeleccionado={moduloSeleccionado}
        contenidos={moduloSeleccionado ? contenidos : []}
      />
      <SeccionModulos
        titulo="Módulos Extra"
        lista={modulos["Extra"] || []}
        filtro={filtro}
        onSeleccionarModulo={onSeleccionarModulo}
        moduloSeleccionado={moduloSeleccionado}
        contenidos={moduloSeleccionado ? contenidos : []}
      />
    </div>
  );
}

export default App;
