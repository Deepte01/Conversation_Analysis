import fs from 'fs';
import OpenAI from 'openai';
import { config } from 'dotenv';

config();

const content = "This is the output content";

const outputPath = './Output';
const filename = 'transcript.txt'; 
const filePath = `${outputPath}/${filename}`;

/*
place the api call to OPenApi model here and store the script in the filepath
*/


const apiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({apiKey: apiKey});
const topics=[cars, house, bikes, computers];
const salesCallTranscript = `
generate a sales call transcript between a sales guy and a prospective customer for buying 10000 cars. 
The conversation should include price negotiation, features of the cars, and delivery timeline.
The format of the transcript should look like this: 
    <timestamp> <sales guy name/Prospective customer name> (<domain name>): messages
    example:
    00:00:00 Sam (openai.com): Hey there Staya.
    00:00:02 Satya  (microsoft.com): Hi Sam, how are you?
    00:00:05 Sam (openai.com): I'm doing good. Do you think you can give us 10000 more GPUs?
    00:00:06 Satya (microsoft.com): I'm sorry Sam we can't do 10000, how about 5000?
`;


function writeDataToFile(data) {
    fs.writeFile(filePath, data, 'utf8', (error) => {
        if (error) {
            console.error('An error occurred while writing to the file:', error);
        } else {
            console.log('File has been written successfully.');
        }
    });
}

async function main() {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { 
        role: "system", 
        content: salesCallTranscript
      }],
      temperature: 0.7,
      max_tokens: 3000
  });

  console.log(completion.choices[0].message.content);
  // Replace \n with new line and remove double quotes
  var response = JSON.stringify(completion.choices[0].message.content);
  const formattedData = response.replace(/\\n/g, '\n').replace(/"/g, '');

  writeDataToFile(formattedData);
}

main();



