import { useState } from "react";

function Suscripcion() {
    const [correo, setCorreo] = useState("");
    const [mensaje, setMensaje] = useState("");

    function enviarSuscripcion(evento) {
        evento.preventDefault();

        if (correo.trim() === "") {
            setMensaje("Debes ingresar un correo.");
        } else {
            setMensaje("¡Gracias por suscribirte a Game Zone!");
            setCorreo("");
        }
    }

    return (
        <section className="suscripcion">
            <h2>Recibe nuestras ofertas</h2>
            <p>
                ¡Suscríbete para recibir novedades y descuentos de Game Zone!
            </p>

            <form
                id="formulario-suscripcion"
                onSubmit={enviarSuscripcion}
            >
                <label htmlFor="correo" className="visually-hidden">
                    Correo electrónico
                </label>
                <input
                    type="email"
                    id="correo"
                    placeholder="Ingresa tu correo"
                    value={correo}
                    onChange={function(evento) {
                        setCorreo(evento.target.value);
                    }}
                />
                <button type="submit">Suscribirme</button>
            </form>

            {mensaje && <p id="mensaje-suscripcion">{mensaje}</p>}
        </section>
    );
}

export default Suscripcion;
