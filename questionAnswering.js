import fs from 'fs';
import { openai, interactiveIO } from './app.js';


// Function to read transcript from file
function readTranscriptFromFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(`./Output/${filePath}`, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

async function getUserResponse(question, salesCallTranscript) {
    // using https://cookbook.openai.com/examples/how_to_format_inputs_to_chatgpt_models#few-shot-prompting
    console.log('******fetching answer from OpenAI************')
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
            role: "system",
            content: "You are a helpful, pattern-following assistant."
        },
        {
           role: "user",
           content: `Help me to understand ${question} in the followig transcript: ${salesCallTranscript}` 
        }],
        temperature: 0,
    });
  
    console.log(completion.choices[0].message.content);
}

/*
    The below method is written with the help of ChatGPT and modified according to my requirements
*/

function AskUserInput(transcript)
{
    // Ask for user input
    interactiveIO.question('Enter your question: ', async (userInput) => {
    // Send userInput and transcript to API
    try {
        await getUserResponse(userInput, transcript);
    } catch (error) {
        console.error('Error sending data to API:', error.message);
    }

    // Ask if user wants to provide another input
    interactiveIO.question('Do you want to provide another question? (yes/no): ', (answer) => {
        if (answer.toLowerCase() === 'yes') {
            AskUserInput(transcript);
        } else {
            interactiveIO.close();
            console.log('Goodbye!');
        }
       });
    });    
}

async function handleUserInput() {
    // Ask for transcript file name
    interactiveIO.question('Enter the transcript file name in the output folder: ', async (transcriptFileName) => {
        try {
            // Read transcript from file
            const transcript = await readTranscriptFromFile(transcriptFileName);
            AskUserInput(transcript);
        } catch (error) {
            console.error('Error reading transcript file:', error.message);
            interactiveIO.close();
        }
    });
}

handleUserInput();
