import { userChatResponse } from './db.js';

async function saveResponse(userSelectedLanguage, fileName, chatHistory) {
    try {
      const newUserResponse = new userChatResponse({
         userSelectedLanguage,
         fileName,
         chatHistory
      });      
      await newUserResponse.save();
      
      console.log('Response saved successfully.');
    } catch (error) {
      console.error('Error saving response:', error);
    }
  }

  export { saveResponse };
