import path from 'path';
import {fileURLToPath} from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const PROMPT_PATH = path.join(__dirname, '../../../prompts/bot_system.txt');
