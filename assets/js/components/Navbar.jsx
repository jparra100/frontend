function Navbar({ paginaProductos }) {
    const enlaceInicio = paginaProductos ? "../index.html" : "#inicio";
    const enlaceProductos = paginaProductos
        ? "#productos"
        : "clasificaciones/productos.html";

    return (
        <header>
            <nav className="navbar navbar-expand-md navbar-dark w-100">
                <div className="container-fluid">
                    <h1 className="navbar-brand">Game Zone</h1>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#menu-principal"
                        aria-controls="menu-principal"
                        aria-expanded="false"
                        aria-label="Abrir menú"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div
                        className="collapse navbar-collapse"
                        id="menu-principal"
                    >
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link" href={enlaceInicio}>
                                    Inicio
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href={enlaceProductos}>
                                    Productos
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href={enlaceProductos}>
                                    PC
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href={enlaceProductos}>
                                    Nintendo
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href={enlaceProductos}>
                                    Arcade
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#contacto">
                                    Contacto
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
