import { connectDB } from './connect-db';
import md5 from 'md5';
import { v4 as uuidv4 } from 'uuid';

const authenticationTokens = [];

async function assembleUserState(user) {
  const db = await connectDB();

  const tasks = await db.collection('tasks').find({ owner: user.id }).toArray();
  const groups = await db.collection('groups').find({ owner: user.id }).toArray();

  return {
    tasks,
    groups,
    session: { authenticated: 'AUTHENTICATED', id: user.id },
  };
}

/**
 *
 * @param {import("express").Application} app
 */
export const authenticationRoute = (app) => {
  app.post('/authenticate', async (req, res) => {
    const { username, password } = req.body;
    const db = await connectDB();
    const collection = db.collection('users');

    const user = await collection.findOne({ name: username });
    if (!user) {
      return res.status(500).send('User not found');
    }

    const hash = md5(password);
    const isPasswordCorrect = hash === user.passwordHash;

    if (!isPasswordCorrect) {
      return res.status(500).send('User not found');
    }

    const token = uuidv4();

    authenticationTokens.push({
      token,
      userId: user.id,
    });

    const state = await assembleUserState(user);

    res.send({ token, state });
  });
};
