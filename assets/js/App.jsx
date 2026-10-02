import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Inicio from "./components/Inicio";
import ListaProductos from "./components/ListaProductos";
import Carrito from "./components/Carrito";
import Suscripcion from "./components/Suscripcion";
import Footer from "./components/Footer";

const rutaProductos = new URL("../../data/juegos.json", import.meta.url).href;

function App({ paginaProductos }) {
    const [productos, setProductos] = useState([]);
    const [carrito, setCarrito] = useState([]);
    const [mensajeError, setMensajeError] = useState("");
    const [cargando, setCargando] = useState(false);
    const [busqueda, setBusqueda] = useState("");
    const [busquedaAplicada, setBusquedaAplicada] = useState("");

    // Carga el catálogo al entrar a la página de productos.
    useEffect(function() {
        if (!paginaProductos) {
            return;
        }

        setCargando(true);

        fetch(rutaProductos)
            .then(function(respuesta) {
                if (!respuesta.ok) {
                    throw new Error("No se pudo leer el archivo JSON");
                }

                return respuesta.json();
            })
            .then(function(datos) {
                setProductos(datos);
                setMensajeError("");
                setCargando(false);
            })
            .catch(function(error) {
                console.log("Error al cargar los juegos:", error);
                setMensajeError(
                    "No pudimos cargar los juegos. Intenta nuevamente más tarde."
                );
                setCargando(false);
            });
    }, [paginaProductos]);

    function agregarAlCarrito(producto) {
        const productoRepetido = carrito.some(function(item) {
            return item.id === producto.id;
        });

        if (!productoRepetido) {
            setCarrito([...carrito, producto]);
        }
    }

    function eliminarDelCarrito(idProducto) {
        const carritoActualizado = carrito.filter(function(producto) {
            return producto.id !== idProducto;
        });

        setCarrito(carritoActualizado);
    }

    function estaEnCarrito(idProducto) {
        return carrito.some(function(producto) {
            return producto.id === idProducto;
        });
    }

    function buscarProducto(evento) {
        evento.preventDefault();
        setBusquedaAplicada(busqueda.trim());
    }

    const productosFiltrados = productos.filter(function(producto) {
        return producto.nombre
            .toLowerCase()
            .includes(busquedaAplicada.toLowerCase());
    });

    const productosPrincipales = productosFiltrados.filter(function(producto) {
        return producto.seccion === "principal";
    });

    const masJuegos = productosFiltrados.filter(function(producto) {
        return producto.seccion === "mas-juegos";
    });

    let mensajeBusqueda = "";

    if (busquedaAplicada !== "" && productosFiltrados.length === 0) {
        mensajeBusqueda = "No encontramos productos con ese nombre.";
    } else if (busquedaAplicada !== "") {
        mensajeBusqueda =
            "Se encontraron " + productosFiltrados.length + " productos.";
    }

    if (!paginaProductos) {
        return (
            <>
                <Navbar paginaProductos={false} />
                <Inicio />
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar paginaProductos={true} />

            <main id="inicio">
                <section id="productos" className="container">
                    <h2 className="titulo-productos">
                        Productos game zone
                    </h2>

                    <div className="categorias">
                        <button type="button">PC</button>
                        <button type="button">Nintendo</button>
                        <button type="button">Arcade</button>
                    </div>

                    {!cargando && !mensajeError && (
                        <p className="contador-productos">
                            {productos.length} videojuegos disponibles
                        </p>
                    )}

                    <section
                        className="busqueda"
                        aria-labelledby="titulo-busqueda"
                    >
                        <h3 id="titulo-busqueda">Buscar productos</h3>

                        <form
                            id="formulario-busqueda"
                            className="row g-2 justify-content-center"
                            onSubmit={buscarProducto}
                        >
                            <div className="col-12 col-md-7">
                                <label
                                    htmlFor="busqueda"
                                    className="visually-hidden"
                                >
                                    Nombre del producto
                                </label>
                                <input
                                    type="search"
                                    id="busqueda"
                                    className="form-control"
                                    placeholder="Escribe el nombre de un juego"
                                    value={busqueda}
                                    onChange={function(evento) {
                                        setBusqueda(evento.target.value);
                                    }}
                                />
                            </div>
                            <div className="col-12 col-md-auto">
                                <button
                                    type="submit"
                                    className="boton-buscar"
                                >
                                    Buscar
                                </button>
                            </div>
                        </form>

                        {mensajeBusqueda && (
                            <p id="mensaje-busqueda">{mensajeBusqueda}</p>
                        )}
                    </section>

                    <Carrito
                        carrito={carrito}
                        eliminarDelCarrito={eliminarDelCarrito}
                    />

                    {cargando && (
                        <p className="mensaje-carga">Cargando productos...</p>
                    )}

                    {mensajeError && (
                        <p id="mensaje-error" role="alert">
                            {mensajeError}
                        </p>
                    )}

                    {!cargando && !mensajeError && (
                        <ListaProductos
                            productos={productosPrincipales}
                            agregarAlCarrito={agregarAlCarrito}
                            estaEnCarrito={estaEnCarrito}
                        />
                    )}
                </section>
            </main>

            {!cargando && !mensajeError && masJuegos.length > 0 && (
                <section className="juegos-api container">
                    <h2>Más juegos</h2>
                    <ListaProductos
                        idLista="lista-juegos"
                        productos={masJuegos}
                        agregarAlCarrito={agregarAlCarrito}
                        estaEnCarrito={estaEnCarrito}
                    />
                </section>
            )}

            <Suscripcion />
            <Footer />
        </>
    );
}

export default App;
