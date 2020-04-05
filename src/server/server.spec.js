import { addNewTask, updateTask } from './server';

(async function test() {
  await addNewTask({
    name: 'My task',
    id: '12345',
  });

  await updateTask({
    name: 'New NAME!!!',
    group: 'myGroup',
    isComplete: true,
    id: '12345',
  });
})();
