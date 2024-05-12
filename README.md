
# Project Description

This project is used to generate sales call transcripts, summarize the transcript, and answer user questions in the transcript using OpenAI API.

## Installation

To run this application, ensure the following installations:

1. Node.js v20.13.1 ([Download Node.js](https://nodejs.org/en/download))
2. MongoDB Community Server 7.0.9 ([Download MongoDB](https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-7.0.9-signed.msi))

To install all the required packages mentioned in the `package.json` file for this application, follow these steps:

1. Open the folder "Conversation_Analysis" in Visual Studio Code.
2. Run the following command in the terminal:
    ```
    npm install
    ```

## Execution

1. Replace `OpenAPIKey` in the `.env` file with your own key.
2. For the first task, which involves generating call transcripts on Cars, Computers, and Chairs, execute the following command:
    ```
    node .\src\generateCallTranscripts.js
    ```
    The console will prompt you to select a language by entering 1, 2, or 3. By default, English is selected. Any input not matching the provided options will default to English. The generated call transcripts are stored in the "outputs" folder.
3. For the second task, run the following command in the terminal:
    ```
    node .\src\summarizeCallTranscripts.js
    ```
    Follow the prompt to provide a file name from the output folder. The generated summary of key points will be printed in the console.
4. For the third task, execute the following command in the terminal:
    ```
    node .\src\questionAnswering.js
    ```
    Follow the prompts to provide a file name from the output folder, select a language for the model's response, and then enter your question. The response from the OpenAI model will be displayed in the console. To ask further questions, respond "yes" to "Do you want to provide another question?" in the command line. If you respond "no," the process will exit, and the chat history will be stored in the MongoDB "ChatHistory" table.
5. Test cases for `questionAnswering.js` have been written using Mocha and placed in the "testCases" folder. To run them, use the following command in the terminal:
    ```
    npm test
    ```

## Thought Process

### Generate Transcripts

A template for the sales call transcript is defined in such a way that it can accommodate different topics and multiple languages to generate the transcripts. For instance, a predefined template of a prompt is designed to include the topic of conversation and user-selected language as variables. This prompt is then given as input to the OpenAI GPT-3.5 Turbo model, which provides the transcripts in the desired format.

Moreover, distinct transcript files are generated for different topics and saved under the "outputs" folder for further analysis. Finally, the proper use of asynchronous functions ensures the application runs efficiently without blocking the event loop.

### Summarize Key Points From Transcripts

To summarize key points from the transcripts generated in the "outputs" folder, we start by taking transcript file name from the outputs folder and the language to generate the response in. A prompt template is defined such that the contents of the file and the user selected language are included. This prompt is then given as input to the OpenAI GPT-3.5 Turbo model, and the API response is printed onto the console. 

### Question and Answering

This functionality is designed to interact with the user in multiple languages, ask multiple questions about a sales call transcript, get responses from the OpenAI API, and save the chat history to the database at the end.

It begins with reading contents from the user-selected file name from the "outputs" folder. Then it asks the user to select a language for the responses from the OpenAI API. After the language is set, the chat begins by asking the user to enter a question. A predefined prompt template is arranged such that the contents of the file, user question, and response language are given as input to OpenAI GPT-3.5 Turbo model. The API response is saved in an array and moves to prompt the next question to the user. Finally, when the user decides to ask no further questions, the chat is stored as an array of collections in the "ChatHistory" database.

### Test Cases

I have used ChatGPT to find the corresponding methods in Mocha for the test scenarios that I needed. I used the generated code and modified it to suit my requirements for OpenAI connection, MongoDB in-memory server connection, and file system read and write functionalities.

## Note

This application is tested on a Windows Machine, I haven't tried the above steps on Linux.
