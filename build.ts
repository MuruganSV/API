import shelljs from "shelljs";
const config = require("./tsconfig.json");
const outDir = config.compilerOptions.outDir;

shelljs.rm("-rf", outDir);
shelljs.mkdir(outDir);