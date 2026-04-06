 import { defineConfig } from "vite";
 import react from "@vitejs/plugin-react";

// export default defineConfig({
//   base: "/",
//   plugins: [react()],
// });


console.log("VITE CONFIG LOADED");

// https://vite.dev/config/
export default defineConfig(
  {
  
   plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5189",
        changeOrigin: true,
        secure: false,
              rewrite: (path) => path.replace(/^\/api/, ""), // 👈 THIS
      },
      
    },
    
  },
});
