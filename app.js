import OpenAI from 'openai';
import { config } from 'dotenv';

config();

const apiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({apiKey: apiKey});
// tried to recrete the api call provieded in the openAI documentation
async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

main() ;
