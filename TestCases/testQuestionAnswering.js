/*
Generated the first draft of the code using ChatGPT. And then, I have modified it to 
suit my requirements.
*/

import * as chai from 'chai';
import sinon from 'sinon';
import fs from 'fs';
import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { openai } from '../app.js';
import { userChatResponse } from '../db.js';
import { saveResponse } from '../saveResponse.js';
import { getModelResponse, readTranscriptFromFile } from '../questionAnswering.js';

const { expect } = chai;

describe('Application Tests', function() {
  let mongoServer;
  let client;
  let saveResponseStub;

  before(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    client = new MongoClient(mongoUri);
    await client.connect();
  });

  after(async () => {
    await client.close();
    await mongoServer.stop();
  });

  it('should connect to OpenAI API', async function() {
    const openaiStub = sinon.stub(openai.chat.completions, 'create').resolves({ choices: [{ message: { content: 'Test response' }}] });

    const response = await getModelResponse('Test question');

    expect(openaiStub.calledOnce).to.be.true;
    openaiStub.restore();
  });

  it('should connect to MongoDB', async function() {
    const isConnected = client.topology.isConnected();
    expect(isConnected).to.be.true;
  });

  it('should insert data into MongoDB', async function() {
    const collection = client.db('test').collection('documents');
    const doc = { a: 1 };
    await collection.insertOne(doc);

    const result = await collection.findOne({ a: 1 });
    expect(result).to.deep.equal(doc);
  });

  it('should check if a file exists', function(done) {
    fs.access('./Output/transcript.txt', fs.constants.F_OK, (err) => {
      expect(err ? false : true).to.be.true;
      done();
    });
  });

  it('should read transcript from file', async function() {
    const fsStub = sinon.stub(fs, 'readFile').callsFake((filePath, encoding, callback) => {
      callback(null, 'Test transcript 0987 @#$% ,.:`~`~?');
    });

    const transcript = await readTranscriptFromFile('./Output/transcript.txt');

    expect(transcript).to.equal('Test transcript 0987 @#$% ,.:`~`~?');
    fsStub.restore();
  });
});
