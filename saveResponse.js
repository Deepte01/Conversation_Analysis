import { userChatResponse } from './db.js';

async function saveResponse(userSelectedLanguage, fileName, chatHistory) {
    console.log('Saving to database...'+ userSelectedLanguage +" "+fileName);
    try {
      const newUserResponse = new userChatResponse({
         userSelectedLanguage,
         fileName,
         chatHistory
      });
      console.log(newUserResponse);
      
      await newUserResponse.save();
      
      console.log('Response saved successfully.');
    } catch (error) {
      console.error('Error saving response:', error);
    }
  }

  export { saveResponse };
