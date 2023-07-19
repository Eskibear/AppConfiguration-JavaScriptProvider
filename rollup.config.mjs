// rollup.config.js
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

export default [
  {
    external: ["@azure/app-configuration"],
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.esm.js",
        format: "esm",
        sourcemap: true
      },
      {
        file: "dist/index.browser.js",
        format: "iife",
        name: "AzureAppConfigurationProvider",
        globals: {
          "@azure/app-configuration": "appConfiguration"
        },
        sourcemap: true
      },
      {
        file: "dist/index.node.js",
        format: "cjs",
        sourcemap: true
      },
    ],
    plugins: [
      typescript({
        compilerOptions: {
          "module": "ESNext",
          "moduleResolution": "Node",
          "target": "ES2020",
          "strictNullChecks": true,
          "strictFunctionTypes": true,
          "sourceMap": true
        }
      })
    ],
  },
  {
    input: "src/index.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [dts()],
  },
];
