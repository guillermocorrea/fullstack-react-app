import { take, put, select } from 'redux-saga/effects';
import * as mutations from './mutations';
import { v4 as uuidv4 } from 'uuid';

export function* taskCreationSaga() {
  while (true) {
    const { groupId } = yield take(mutations.REQUEST_TASK_CREATION);
    const ownerId = 'U1';
    const taskId = uuidv4();
    yield put(mutations.createTask(taskId, groupId, ownerId));
  }
}
