import fs from 'fs';
import OpenAI from 'openai';
import { config } from 'dotenv';

config();
const apiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({apiKey: apiKey});


const inputFilePath = './Output/transcript.txt';

/*
        place the call to OPenAI model here and output the summary response
*/
async function generateSummary(transcript) {
    // using https://cookbook.openai.com/examples/how_to_format_inputs_to_chatgpt_models#few-shot-prompting

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
            role: "system",
            content: "You are a helpful, pattern-following assistant."
        },
        {
           role: "user",
           content: "Help me summarize the following sales transcript into plain English concisely."+transcript
        }],
        temperature: 0,
    });
  
    console.log(completion.choices[0].message.content);
  }

  fs.readFile(inputFilePath, 'utf8', (error, data) => {
    if (error) {
        console.error('An error occurred while reading the file:', error);
    } else {
        const transcipt = data;
        console.log("Summary:");
        generateSummary(transcipt);
    }
});