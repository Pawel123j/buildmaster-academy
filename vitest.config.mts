import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"]
  },
  resolve: {
    alias: {
      // To samo odwzorowanie co `paths` w tsconfig.json.
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  }
});
