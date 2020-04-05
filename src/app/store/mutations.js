export const REQUEST_TASK_CREATION = 'REQUEST_TASK_CREATION';
export const CREATE_TASK = 'CREATE_TASK';
export const SET_TASK_COMPLETE = 'SET_TASK_COMPLETE';
export const SET_TASK_GROUP = 'SET_TASK_GROUP';
export const SET_TASK_NAME = 'SET_TASK_NAME';

export const requestTaskCreation = (groupId) => ({
  type: REQUEST_TASK_CREATION,
  groupId,
});

export const createTask = (taskId, groupId, ownerId) => ({
  type: CREATE_TASK,
  taskId,
  groupId,
  ownerId,
});

export const setTaskComplete = (id, isComplete) => ({
  type: SET_TASK_COMPLETE,
  id,
  isComplete,
});

export const setTaskGroup = (id, group) => ({
  type: SET_TASK_GROUP,
  id,
  group,
});

export const setTaskName = (id, name) => ({
  type: SET_TASK_NAME,
  id,
  name,
});
