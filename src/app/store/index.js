import { createStore, applyMiddleware, combineReducers } from 'redux';
import { defaultState } from '../../server/defaultState';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import * as sagas from './sagas.mock';
import * as mutations from './mutations';
import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware();

const tasksReducer = (tasks = defaultState.tasks, action) => {
  switch (action.type) {
    case mutations.CREATE_TASK:
      return [
        ...tasks,
        {
          id: action.taskId,
          name: 'New task',
          group: action.groupId,
          owner: action.ownerId,
          isComplete: false,
        },
      ];
    case mutations.SET_TASK_COMPLETE:
      return tasks.map((task) => {
        return task.id === action.id ? { ...task, isComplete: action.isComplete } : task;
      });
    case mutations.SET_TASK_GROUP:
      return tasks.map((task) => {
        return task.id === action.id ? { ...task, group: action.group } : task;
      });
    case mutations.SET_TASK_NAME:
      return tasks.map((task) => {
        return task.id === action.id ? { ...task, name: action.name } : task;
      });
  }
  return tasks;
};

const combinedReducers = combineReducers({
  tasks: tasksReducer,
  comments(comments = defaultState.comments) {
    return comments;
  },
  groups(groups = defaultState.groups) {
    return groups;
  },
  users(users = defaultState.users) {
    return users;
  },
});

export const store = createStore(
  combinedReducers,
  composeWithDevTools(applyMiddleware(createLogger(), sagaMiddleware))
);

for (let saga in sagas) {
  sagaMiddleware.run(sagas[saga]);
}
