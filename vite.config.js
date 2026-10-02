import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
    base: "/frontend/",
    plugins: [react()],
    build: {
        assetsInlineLimit: 0,
        rollupOptions: {
            input: {
                inicio: resolve(process.cwd(), "index.html"),
                productos: resolve(
                    process.cwd(),
                    "clasificaciones/productos.html"
                )
            }
        }
    }
});
