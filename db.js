//congifure mongo db
import mongoose from 'mongoose';

const MongoDBURI = "mongodb://localhost:27017/ChatHistory";

mongoose.connect(MongoDBURI).then(con => {
    //console.log("connected to db");
}
).catch(err => {
    console.error("failed to connect to the database");
    process.exit(1);
});

//schema for storing the conversation
const userChatResponseSchema = new mongoose.Schema({
  userInput: String,
  apiResponse: String,
  userSelectedLanguage: String,
  fileName: String,
  responseDateTime:{
    type: Date,
    default: Date.now
  }
});

const userChatResponse = mongoose.model('UserChatResponse', userChatResponseSchema);

export {userChatResponse};

  