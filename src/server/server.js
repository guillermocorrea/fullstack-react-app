import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectDB } from './connect-db';
import morgan from 'morgan';
import './initialize-db';
import { authenticationRoute } from './authenticate';
import path from 'path';

const port = process.env.PORT || 3000;
let app = express();

app.use(cors(), bodyParser.urlencoded({ extended: false }), bodyParser.json(), morgan('combined'));

authenticationRoute(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../../dist')));
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve('index.html'));
  });
}

app.listen(port, console.info('Server running, listening on port ', port));

export const addNewTask = async (task) => {
  const db = await connectDB();
  const collection = db.collection('tasks');
  await collection.insertOne(task);
};

export const updateTask = async (task) => {
  const { id, group, isComplete, name } = task;
  const db = await connectDB();
  const collection = db.collection('tasks');
  if (group) {
    await collection.updateOne({ id }, { $set: { group } });
  }
  if (name) {
    await collection.updateOne({ id }, { $set: { name } });
  }
  if (isComplete !== undefined) {
    await collection.updateOne({ id }, { $set: { isComplete } });
  }
};

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.post('/task/new', async (req, res) => {
  const task = req.body.task;
  await addNewTask(task);
  return res.status(200).send();
});

app.post('/task/update', async (req, res) => {
  const task = req.body.task;
  await updateTask(task);
  return res.status(200).send();
});
