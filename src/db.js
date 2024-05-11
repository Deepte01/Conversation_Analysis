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

/*
   created below schema to store chatHistory collection for the 
   selected filename and user language.
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

  