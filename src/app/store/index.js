import { createStore, applyMiddleware, combineReducers } from 'redux';
import { defaultState } from '../../server/defaultState';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import * as sagas from './sagas';
import * as mutations from './mutations';
import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware();

const tasksReducer = (tasks = [], action) => {
  switch (action.type) {
    case mutations.SET_STATE:
      return action.state.tasks;
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
  session(userSession = defaultState.session || {}, action) {
    const { type, authenticated, session } = action;
    switch (type) {
      case mutations.SET_STATE:
        return { ...userSession, id: action.state.session.id };
      case mutations.REQUEST_AUTHENTICATE_USER:
        return { ...userSession, authenticated: mutations.AUTHENTICATING };
      case mutations.PROCESSING_AUTHENTICATE_USER:
        return { ...userSession, authenticated };
      default:
        return userSession;
    }
  },
  comments(comments = []) {
    return comments;
  },
  groups(groups = [], action) {
    switch (action.type) {
      case mutations.SET_STATE:
        return action.state.groups;
      default:
        return groups;
    }
  },
  users(users = []) {
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
