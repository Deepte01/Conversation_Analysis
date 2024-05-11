import { userChatResponse } from './db.js';

async function saveResponse(userInput, apiResponse, userSelectedLanguage, fileName) {
    try {
      const newUserResponse = new userChatResponse({
        userInput,
        apiResponse,
        userSelectedLanguage,
        fileName
      });

      await newUserResponse.save();
      console.log('Response saved successfully.');
    } catch (error) {
      console.error('Error saving response:', error);
    }
  }

  export { saveResponse };
  