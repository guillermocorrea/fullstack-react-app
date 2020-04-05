import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as mutations from '../store/mutations';
const TaskDetail = ({ id, comments, groups, task, isComplete, setTaskCompletion, setTaskGroup, setTaskName }) => {
  if (!task) {
    return (
      <div>
        <h2>Task not found</h2>
        <Link to="/dashboard" />
      </div>
    );
  }
  return (
    <div>
      <input value={task.name} onChange={setTaskName} />
      <div>
        <button onClick={() => setTaskCompletion(id, !isComplete)}>{isComplete ? 'Reopen' : 'Complete'}</button>
      </div>
      <div>
        <select onChange={setTaskGroup} value={task.group}>
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Link to="/dashboard">
          <button>Done</button>
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const task = state.tasks.find((task) => task.id === id);
  return {
    id,
    task,
    groups: state.groups,
    isComplete: task ? task.isComplete : undefined,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const id = ownProps.match.params.id;
  return {
    setTaskCompletion(id, isComplete) {
      dispatch(mutations.setTaskComplete(id, isComplete));
    },
    setTaskGroup(e) {
      dispatch(mutations.setTaskGroup(id, e.target.value));
    },
    setTaskName(e) {
      dispatch(mutations.setTaskName(id, e.target.value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetail);
