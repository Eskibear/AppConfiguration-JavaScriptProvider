// rollup.config.js
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.browser.js",
        format: "iife",
        name: "AzureAppConfigurationProvider",
      },
      {
        file: "dist/index.node.js",
        format: "cjs",
      },
    ],
    plugins: [typescript({
      compilerOptions: {
        "module": "ESNext",
        "moduleResolution": "Node",
        "target": "ES2020",
        "strictNullChecks": true,
        "strictFunctionTypes": true,
        "sourceMap": true
      }
    })],
  },
  {
    input: "src/index.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [dts()],
  },
];
