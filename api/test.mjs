import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from "path";
const __dirname = dirname(fileURLToPath(import.meta.url));

console.log(path.join(__dirname,"../images"))
