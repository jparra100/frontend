import { useState } from "react";
import minecraft from "../../img/minecraft.webp";
import pacman from "../../img/pacman.jpg";
import marioKart from "../../img/mario-kart.jpg";
import portada from "../../img/portada.jpeg";

const imagenes = {
    minecraft: minecraft,
    pacman: pacman,
    marioKart: marioKart,
    portada: portada
};

function Producto({ producto, agregarAlCarrito, estaEnCarrito }) {
    const [mouseEncima, setMouseEncima] = useState(false);
    const agregado = estaEnCarrito(producto.id);
    const esPrincipal = producto.seccion === "principal";
    const claseProducto = esPrincipal ? "productos" : "juego-api";
    const claseBoton = esPrincipal
        ? "boton-comprar"
        : "boton-comprar-api";

    return (
        <li className="col-12 col-md-6 col-lg-4 tarjeta-juego">
            <article
                className={claseProducto + " h-100"}
                onMouseEnter={function() {
                    setMouseEncima(true);
                }}
                onMouseLeave={function() {
                    setMouseEncima(false);
                }}
            >
                {producto.etiqueta && (
                    <span className="etiqueta">
                        {mouseEncima
                            ? "¡NO TE LO PIERDAS!"
                            : producto.etiqueta}
                    </span>
                )}

                <h3>{producto.nombre}</h3>
                <img
                    src={imagenes[producto.imagen]}
                    alt={"Imagen del videojuego " + producto.nombre}
                />
                <p>{producto.descripcion}</p>

                {!esPrincipal && (
                    <p>Categoría: {producto.categoria}</p>
                )}

                {producto.precioAnterior && (
                    <span className="precio anterior">
                        ${producto.precioAnterior.toLocaleString("es-CL")}
                    </span>
                )}
                <p className="precio">
                    ${producto.precio.toLocaleString("es-CL")}
                </p>

                <button
                    className={claseBoton}
                    type="button"
                    disabled={agregado}
                    onClick={function() {
                        agregarAlCarrito(producto);
                    }}
                >
                    {agregado ? "En el carrito" : "Agregar al carrito"}
                </button>
            </article>
        </li>
    );
}

export default Producto;
