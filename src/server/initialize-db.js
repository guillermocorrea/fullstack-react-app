import { connectDB } from './connect-db';
import { defaultState } from './defaultState';

async function initializeDB() {
  const db = await connectDB();
  const user = await db.collection('users').findOne({ id: 'U1' });
  if (user) {
    return;
  }
  for (let collectionName in defaultState) {
    let collection = db.collection(collectionName);
    await collection.insertMany(defaultState[collectionName]);
  }
}

initializeDB();
