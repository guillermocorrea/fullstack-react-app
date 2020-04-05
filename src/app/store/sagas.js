import { take, put } from 'redux-saga/effects';
import * as mutations from './mutations';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { history } from './history';

const url = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000';

export function* taskCreationSaga() {
  while (true) {
    const { groupId } = yield take(mutations.REQUEST_TASK_CREATION);
    const ownerId = 'U1';
    const taskId = uuidv4();
    yield put(mutations.createTask(taskId, groupId, ownerId));

    const { res } = yield axios.post(`${url}/task/new`, {
      task: {
        id: taskId,
        group: groupId,
        owner: ownerId,
        isComplete: false,
        name: 'New task',
      },
    });
  }
}

export function* taskModificationSaga() {
  while (true) {
    const task = yield take([mutations.SET_TASK_GROUP, mutations.SET_TASK_COMPLETE, mutations.SET_TASK_NAME]);
    axios.post(`${url}/task/update`, {
      task: {
        id: task.id,
        group: task.group,
        isComplete: task.isComplete,
        name: task.name,
      },
    });
  }
}

export function* userAuthenticationSage() {
  while (true) {
    const { username, password } = yield take(mutations.REQUEST_AUTHENTICATE_USER);
    try {
      const { data } = yield axios.post(`${url}/authenticate`, { username, password });
      if (!data) {
        throw new Error();
      }
      yield put(mutations.setState(data.state));
      yield put(mutations.processAuthenticateUser(mutations.AUTHENTICATED));
      history.push('/dashboard');
    } catch (e) {
      yield put(mutations.processAuthenticateUser(mutations.NOT_AUTHENTICATED));
    }
  }
}
