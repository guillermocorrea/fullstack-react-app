import { MongoClient } from 'mongodb';

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/myorganizer';
let db = null;

/**
 * @returns {Promise<import("mongodb").Db>}
 */
export async function connectDB() {
  if (db) {
    return db;
  }
  let client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  db = client.db();
  return db;
}
