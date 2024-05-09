import fs from 'fs';

const content = "This is the output content";

const outputPath = './Output';
const filename = 'transcript.txt'; 
const filePath = `${outputPath}/${filename}`;

/*
place the api call to OPenApi model here and store the script in the filepath
*/

fs.writeFile(filePath, content, 'utf8', (error) => {
    if (error) {
        console.error('An error occurred while writing to the file:', error);
    } else {
        console.log('File has been written successfully.');
    }
});