//congifure mongo db
import mongoose from 'mongoose';

const MongoDBURI = "mongodb://localhost:27017/ChatHistory";

mongoose.connect(MongoDBURI,{socketTimeoutMS: 60000}).then(con => {
    //console.log("connected to db");
}
).catch(err => {
    console.error("failed to connect to the database");
    process.exit(1);
});

//schema for storing the conversation
/*
The below schema is generated with the help of ChatGPT
*/
const userChatResponseSchema = new mongoose.Schema({
  userSelectedLanguage: String,
  fileName: String,
  chatHistory: [
    {
      userQuestion: String,
      apiResponse: String
    }
  ]
});

const userChatResponse = mongoose.model('UserChatResponse', userChatResponseSchema

);

export {userChatResponse};

  