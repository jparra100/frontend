import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "../css/styles.css";

const paginaProductos =
    window.location.pathname.includes("/clasificaciones/");

createRoot(document.querySelector("#root")).render(
    <App paginaProductos={paginaProductos} />
);
