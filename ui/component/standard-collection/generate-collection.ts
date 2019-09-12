import * as fs from "fs";
import * as path from "path";

const inputs = [
    "./src/nodes/input/",
    "./src/nodes/processor/",
    "./src/nodes/output/",
];

const outputs = [
    "./src/generated.node.definitions.ts",
];

let imports = "";
let declarations = "";

for (const input of inputs) {
    const allFiles = fs.readdirSync(input);

    for (const file of allFiles) {
        const p = path.resolve(__dirname, input, file);
        const data = fs.readFileSync(p).toString();
        const objectName = data.match("(?<=export const )(.*)(?=:)")[0];
        // only works if the first exported constant is the node definition
        imports += `import { ${objectName} } from "./${path.relative("./src/", p).replace(new RegExp("\\\\", "g"), "/").split(".ts")[0]}";\n`;
        declarations += "    " + objectName + ",\n";
    }
}

for (const output of outputs) {
    fs.writeFileSync(output, imports + "\nexport const nodeDefinitions = [\n" + declarations + "];\n");
}
