import fs from 'fs';
import { openai, interactiveIO } from './app.js';

//call openAI model to generate the summary from the transcript
async function generateSummary(transcript, language) {
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
           content: `Help me summarize the following sales transcript into ${language} concisely. ${transcript}`
        }],
        temperature: 0,
    });
  
    console.log(completion.choices[0].message.content);
}

// Function to read transcript from file
function readTranscriptFromFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(`./output/${filePath}`, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}


//give options to user to select the languaue to get summary response
function selectLanguage(transcript) {
    interactiveIO.question('Select a language to summarize the transcript:\n1. English\n2. Spanish\n3. French\n', (answer) => {
        interactiveIO.close();
        let language = 'English';
        switch (answer) {
            case '2':
                language = 'Spanish';
                break;
            case '3':
                language = 'French';
                break;
            default:
                language = 'English';
        }
        console.log("****************Summarizing Transcript**********************");
        generateSummary(transcript, language);
    });
};

//get the transript file name to begin the summary process.
async function handleUserInput() {
    // Ask for transcript file name
    interactiveIO.question('Enter the transcript file name in the output folder: ', async (transcriptFileName) => {
        try {
            // Read transcript from file
            const transcript = await readTranscriptFromFile(transcriptFileName);
            selectLanguage(transcript);
        } catch (error) {
            console.error('Error reading transcript file:', error.message);
            interactiveIO.close();
        }
    });
};

handleUserInput();