import fs from 'fs';
import { openai, interactiveIO } from './app.js';

const outputPath = './outputs';

const topics=["Cars", "Computers", "Chairs"];

const salesCallTranscript = `
The conversation should include price negotiation, features, dimensions, and delivery timeline.
The format of the transcript should look like this: 
    <timestamp> <sales guy name/Prospective customer name> (<domain name>): messages
    example:
    00:00:00 Sam (openai.com): Hey there Staya.
    00:00:02 Satya  (microsoft.com): Hi Sam, how are you?
    00:00:05 Sam (openai.com): I'm doing good. Do you think you can give us 10000 more GPUs?
    00:00:06 Satya (microsoft.com): I'm sorry Sam we can't do 10000, how about 5000?
`;

function writeDataToFile(data, filePath) {
    fs.writeFile(filePath, data, 'utf8', (error) => {
        if (error) {
            console.error('An error occurred while writing to the file:', error);
        } else {
            console.log('File has been written successfully.');
        }
    });
}

async function createChat(language, topic) {
  console.log(`********************Generating transcripts for ${topic} in ${language} languague***********************************`);
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { 
        role: "system", 
        content: `generate a sales call transcript in ${language} for a conversation between a sales guy and a prospective customer for buying 10000 ${topic}. ${salesCallTranscript}`
      }],
      temperature: 0.7,
      max_tokens: 3000
  });

  console.log(completion.choices[0].message.content);
  // Replace \n with new line and remove double quotes
  var response = JSON.stringify(completion.choices[0].message.content);

  var formattedData = response.replace(/\\r/g, '').replace(/\\n/g, '\n').replace(/"/g, '');
  var filePath = `${outputPath}/Call_Transcript_${topic}_${language}.txt`;
  writeDataToFile(formattedData, filePath);
}

async function processTopics(language) {
    for (const topic of topics) {
        try {
            await createChat(language, topic);
        } catch (error) {
            console.error('Error:', error.message);
        }
    }
}

function selectLanguage() {
    interactiveIO.question('Select which language you would like to receive response from:\nEnter 1 for English\n Enter 2 for Spanish\n Enter 3 for French\n', (answer) => {
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
        console.log("Generating Transcripts........");
        processTopics(language);
    });
}
selectLanguage();