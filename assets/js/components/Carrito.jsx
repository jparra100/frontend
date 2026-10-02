function Carrito({ carrito, eliminarDelCarrito }) {
    return (
        <section
            className="resumen-carrito"
            aria-labelledby="titulo-carrito"
        >
            <h3 id="titulo-carrito">Resumen del carrito</h3>
            <p className="contador-carro">
                Carro: {carrito.length} productos
            </p>

            {carrito.length === 0 ? (
                <p>Tu carrito está vacío</p>
            ) : (
                <ul id="lista-carrito">
                    {carrito.map(function(producto) {
                        return (
                            <li key={producto.id}>
                                <span>
                                    {producto.nombre} - $
                                    {producto.precio.toLocaleString("es-CL")}
                                </span>
                                <button
                                    type="button"
                                    className="boton-eliminar"
                                    onClick={function() {
                                        eliminarDelCarrito(producto.id);
                                    }}
                                >
                                    Eliminar
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </section>
    );
}

export default Carrito;
