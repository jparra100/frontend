console.log("JavaScript de Game Zone funcionando");

const productos = document.querySelectorAll(".productos");
const categorias = document.querySelector(".categorias");
const contadorCarro = document.querySelector("#contador-carrito");
const listaCarrito = document.querySelector("#lista-carrito");
const carritoVacio = document.querySelector("#carrito-vacio");
const carrito = [];


// CONTADOR DE VIDEOJUEGOS DISPONIBLES

const contadorProductos = document.createElement("p");

contadorProductos.textContent =
    productos.length + " videojuegos disponibles";

contadorProductos.classList.add("contador-productos");
categorias.after(contadorProductos);


// CARRITO DE COMPRAS

function agregarAlCarrito(nombre, precio) {
    carrito.push({
        nombre: nombre,
        precio: precio
    });

    actualizarCarrito();
}

function actualizarCarrito() {
    contadorCarro.textContent =
        "Carro: " + carrito.length + " productos";

    listaCarrito.textContent = "";

    if (carrito.length === 0) {
        carritoVacio.style.display = "block";
        return;
    }

    carritoVacio.style.display = "none";

    carrito.forEach(function(producto) {
        const elemento = document.createElement("li");
        elemento.textContent = producto.nombre + " - " + producto.precio;
        listaCarrito.appendChild(elemento);
    });
}

const botonesComprar = document.querySelectorAll(".boton-comprar");

botonesComprar.forEach(function(boton) {
    boton.addEventListener("click", function() {
        const tarjeta = boton.closest(".productos");
        const nombre = tarjeta.querySelector("h3").textContent.trim();
        const precio = tarjeta.querySelector(".precio:not(.anterior)").textContent.trim();

        agregarAlCarrito(nombre, precio);
    });
});


// EVENTOS MOUSEOVER Y MOUSEOUT EN LOS PRODUCTOS

productos.forEach(function(producto) {
    const etiqueta = producto.querySelector(".etiqueta");
    const textoOriginal = etiqueta.textContent;

    producto.addEventListener("mouseover", function() {
        etiqueta.textContent = "¡NO TE LO PIERDAS!";
    });

    producto.addEventListener("mouseout", function() {
        etiqueta.textContent = textoOriginal;
    });
});


// FORMULARIO DE BÚSQUEDA

function buscarProducto(evento) {
    evento.preventDefault();

    const texto = document.querySelector("#busqueda").value.trim().toLowerCase();
    const tarjetas = document.querySelectorAll(".tarjeta-juego");
    const mensajeBusqueda = document.querySelector("#mensaje-busqueda");
    let encontrados = 0;

    tarjetas.forEach(function(tarjeta) {
        const nombre = tarjeta.querySelector("h3").textContent.toLowerCase();
        const coincide = nombre.includes(texto);

        if (coincide) {
            tarjeta.style.display = "";
            encontrados++;
        } else {
            tarjeta.style.display = "none";
        }
    });

    if (texto === "") {
        mensajeBusqueda.textContent = "Se muestran todos los productos.";
    } else if (encontrados === 0) {
        mensajeBusqueda.textContent = "No encontramos productos con ese nombre.";
    } else {
        mensajeBusqueda.textContent =
            "Se encontraron " + encontrados + " productos.";
    }
}

const formularioBusqueda = document.querySelector("#formulario-busqueda");
formularioBusqueda.addEventListener("submit", buscarProducto);


// EVENTO SUBMIT DEL FORMULARIO DE SUSCRIPCIÓN

const formulario = document.querySelector("#formulario-suscripcion");
const correo = document.querySelector("#correo");
const mensajeSuscripcion =
    document.querySelector("#mensaje-suscripcion");

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    if (correo.value === "") {
        mensajeSuscripcion.textContent =
            "Debes ingresar un correo.";
    } else {
        mensajeSuscripcion.textContent =
            "¡Gracias por suscribirte a Game Zone!";

        correo.value = "";
    }
});


// FETCH API - CARGA DE VIDEOJUEGOS DESDE ARCHIVO JSON

function mostrarJuegos(juegos) {
    const listaJuegos = document.querySelector("#lista-juegos");

    juegos.forEach(function(juego) {
        const columna = document.createElement("div");
        const tarjeta = document.createElement("article");
        const precio = "$" + juego.precio.toLocaleString("es-CL");

        columna.classList.add(
            "col-12",
            "col-md-6",
            "col-lg-4",
            "tarjeta-juego"
        );
        tarjeta.classList.add("juego-api", "h-100");

        tarjeta.innerHTML =
            "<h3>" + juego.nombre + "</h3>" +
            "<p>Categoría: " + juego.categoria + "</p>" +
            "<p class='precio'>" + precio + "</p>" +
            "<button class='boton-comprar-api'>Agregar al carrito</button>";

        tarjeta.querySelector(".boton-comprar-api")
            .addEventListener("click", function() {
                agregarAlCarrito(juego.nombre, precio);
            });

        columna.appendChild(tarjeta);
        listaJuegos.appendChild(columna);
    });
}

function cargarJuegos() {
    fetch("../data/juegos.json")
        .then(function(respuesta) {
            if (!respuesta.ok) {
                throw new Error("No se pudo leer el archivo JSON");
            }

            return respuesta.json();
        })
        .then(function(juegos) {
            mostrarJuegos(juegos);
        })
        .catch(function(error) {
            console.log("Error al cargar los juegos:", error);

            document.querySelector("#mensaje-error").textContent =
                "No pudimos cargar los juegos. Intenta nuevamente más tarde.";
        });
}

cargarJuegos();
