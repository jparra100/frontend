// CONTADOR DE VIDEOJUEGOS DISPONIBLES

console.log("JavaScript de Game Zone funcionando");

const productos = document.querySelectorAll(".productos");
const categorias = document.querySelector(".categorias");

const contadorProductos = document.createElement("p");

contadorProductos.textContent =
    productos.length + " videojuegos disponibles";

contadorProductos.classList.add("contador-productos");

categorias.after(contadorProductos);


// CONTADOR DEL CARRO DE COMPRAS

const botonesComprar = document.querySelectorAll(".boton-comprar");

let cantidadCarro = 0;

const contadorCarro = document.createElement("p");

contadorCarro.textContent = "Carro: 0 productos";
contadorCarro.classList.add("contador-carro");

contadorProductos.after(contadorCarro);

botonesComprar.forEach(function(boton) {

    boton.addEventListener("click", function() {

        cantidadCarro++;

        contadorCarro.textContent =
            "Carro: " + cantidadCarro + " productos";

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

fetch("../data/juegos.json")

    .then(function(respuesta) {

        return respuesta.json();

    })

    .then(function(juegos) {

        const listaJuegos =
            document.querySelector("#lista-juegos");

        juegos.forEach(function(juego) {

            const tarjeta = document.createElement("div");

            tarjeta.classList.add("juego-api");

            tarjeta.innerHTML =
                "<h3>" + juego.nombre + "</h3>" +
                "<p>Categoría: " + juego.categoria + "</p>" +
                "<p> $" + juego.precio.toLocaleString("es-CL") + "</p>" +
                "<button class='boton-comprar-api'>Agregar al carrito</button>";

            listaJuegos.appendChild(tarjeta);

        });

    })

    .catch(function(error) {

        console.log("Error al cargar los juegos:", error);

    });