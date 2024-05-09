import fs from 'fs';
import readline from readline;

const inputFilePath = './Output/transcript.txt';

fs.readFile(inputFilePath, 'utf8', (error, data) => {
    if (error) {
        console.error('An error occurred while reading the file:', error);
    } else {
        console.log('Contents of the input file:');
        console.log(data);
    }
});


/*
place the call to OPenAI model here and output the summary response
*/