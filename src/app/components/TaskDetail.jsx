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
    <div className="card p-3 col-6">
      <input value={task.name} onChange={setTaskName} className="form-control form-control-lg" />
      <div>
        <button onClick={() => setTaskCompletion(id, !isComplete)} className="btn btn-primary mt-2">
          {isComplete ? 'Reopen' : 'Complete'}
        </button>
      </div>
      <div className="mt-3">
        <select onChange={setTaskGroup} value={task.group} className="form-control">
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Link to="/dashboard">
          <button className="btn btn-primary mt-2">Done</button>
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
