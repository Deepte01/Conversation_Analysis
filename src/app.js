//configure reusable imports here
import OpenAI from 'openai';
import { config } from 'dotenv';
import readline from 'readline';

config();

const apiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({apiKey: apiKey});
const interactiveIO = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

export { openai, interactiveIO };
