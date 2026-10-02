import Producto from "./Producto";

function ListaProductos({
    productos,
    agregarAlCarrito,
    estaEnCarrito,
    idLista
}) {
    return (
        <ul id={idLista} className="row g-4 lista-productos">
            {productos.map(function(producto) {
                return (
                    <Producto
                        key={producto.id}
                        producto={producto}
                        agregarAlCarrito={agregarAlCarrito}
                        estaEnCarrito={estaEnCarrito}
                    />
                );
            })}
        </ul>
    );
}

export default ListaProductos;
