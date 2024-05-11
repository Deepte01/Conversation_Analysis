import fs from 'fs';
import { saveResponse } from './saveResponse.js';
import { openai, interactiveIO } from './app.js';

var fileName = "";
var language = "English";
var salesCallTranscript = "";
var chatHistory = [];

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

//get response from OpenAI API to the question asked by the user from the selected transcript
async function getModelResponse(question) {
    // using https://cookbook.openai.com/examples/how_to_format_inputs_to_chatgpt_models#few-shot-prompting
    console.log(`******fetching answer from OpenAI in ${language}************`);
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
            role: "system",
            content: "You are a helpful, pattern-following assistant."
        },
        {
           role: "user",
           content: `Help me to understand ${question} in the followig transcript: ${salesCallTranscript} . Respond back in ${language}.` 
        }],
        temperature: 0,
    });
  
    console.log(completion.choices[0].message.content);
    return completion.choices[0].message.content;
}

/*
    The below method AskUserInput is written with the help of ChatGPT and 
    modified according to my requirements
*/
//prompt the user to provide a question
async function AskUserInput()
{
    // Ask for user input
    interactiveIO.question('Enter your question: ', async (userInput) => {
    try {
        var response = await getModelResponse(userInput);
        //save response to the database
       chatHistory.push({
        userQuestion: userInput,
        apiResponse: response
       });
    } catch (error) {
        console.error('Error sending data to API:', error.message);
    }

    // Ask if user wants to provide another input
    interactiveIO.question('Do you want to provide another question? (yes/no): ', async (answer) => {
        if (answer.toLowerCase() === 'yes') {
            AskUserInput();
        } else {
            console.log(chatHistory);
            await saveResponse(language, fileName, chatHistory);
            interactiveIO.close();
            console.log('Goodbye!');
            process.exit(1);
            }
       });
    });    
}

//give the options to user to select the languaue to get summary response
async function selectLanguage() {
    return new Promise((resolve, reject) => {
        interactiveIO.question('Select which language you would like to receive response from:\n1. English\n2. Spanish\n3. French\n', (answer) => {
            let language = 'English';
            switch (answer) {
                case '2':
                    language = 'Spanish';
                    break;
                case '3':
                    language = 'French';
                    break;
                default:
                    break;
            }
            resolve(language);
        });
    });
}

// Ask for transcript file name to bein the question and answers
async function handleUserInput() {
    interactiveIO.question('Enter a transcript file name from the output folder: ', async (transcriptFileName) => {
        try {
            // Read transcript from file
            language = await selectLanguage();
            fileName = transcriptFileName;
            salesCallTranscript = await readTranscriptFromFile(transcriptFileName);
            AskUserInput();
        } catch (error) {
            console.error('Error reading transcript file:', error.message);
            interactiveIO.close();
        }
    });
}

handleUserInput();

export {saveResponse, getModelResponse, readTranscriptFromFile};
