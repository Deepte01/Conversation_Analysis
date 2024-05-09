import fs from 'fs';
import readline from 'readline';

// interactiveIO will be used to inteact with OpenAI model to get responses to the question
const interactiveIO = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// read the transcipt file 
const inputFilePath = './Output/transcript.txt';
fs.readFile(inputFilePath, 'utf8', (error, data) => {
    if (error) {
        console.error('An error occurred while reading the file:', error);
    } else {
        //console.log('Contents of the input file:');
        console.log(data);
    }
});


function askQuestion()
{
    interactiveIO.question("enter your question:",(answer) => {
       console.log("your question is:", answer ); 
       //place holder logic to add call the openai model to ger respnse
       interactiveIO.question("Do you want to ask the next question? (y/n):", (response) => {
        if(response.toLowerCase() === 'y')
            {
                askQuestion();
            }
        else{
            interactiveIO.close();
        }
       })
    });
    
}

askQuestion();
//interactiveIO.close();
