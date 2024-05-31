// server.ts
import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://pramepreejobe:hylZa0TEmLlrb6jG@cluster0.znplgct.mongodb.net/';

const client = new MongoClient(uri);

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    // Perform operations on the database
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas', error);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB Atlas');
  }
}

connectToMongoDB();
