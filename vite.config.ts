import { ConfigEnv, defineConfig } from "vite";
import basicSsl from "@vitejs/plugin-basic-ssl";
import react from "@vitejs/plugin-react";

export default ({ mode }: ConfigEnv) => {
  if (mode === "development")
    return defineConfig({
      server: {
        host: "0.0.0.0",
      },
      plugins: [react(), basicSsl()],
      define: {
        //@ts-expect-error: node types
        "process.env": process.env,
        global: "window",
      },
    });
  else
    return defineConfig({
      plugins: [react()],
      define: {
        //@ts-expect-error: node types
        "process.env": process.env,
        global: "window",
      },
    });
};
