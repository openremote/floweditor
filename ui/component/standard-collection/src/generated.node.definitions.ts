import { booleanInput } from "./nodes/input/boolean.input";
import { numberInput } from "./nodes/input/number.input";
import { readAttribute } from "./nodes/input/read.attribute";
import { textInput } from "./nodes/input/text.input";
import { add } from "./nodes/processor/add";
import { concat } from "./nodes/processor/concat";
import { divide } from "./nodes/processor/divide";
import { modulo } from "./nodes/processor/modulo";
import { multiply } from "./nodes/processor/multiply";
import { pow } from "./nodes/processor/pow";
import { subtract } from "./nodes/processor/subtract";
import { writeAttribute } from "./nodes/output/write.attribute";

export const nodeDefinitions = [
    booleanInput,
    numberInput,
    readAttribute,
    textInput,
    add,
    concat,
    divide,
    modulo,
    multiply,
    pow,
    subtract,
    writeAttribute,
];
