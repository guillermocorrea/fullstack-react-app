import React from 'react';
import { connect } from 'react-redux';
import { requestTaskCreation } from '../store/mutations';
import { Link } from 'react-router-dom';

const TaskList = ({ tasks, name, id, createNewTask }) => {
  return (
    <>
      <h3>{name}</h3>
      {tasks.map((task) => (
        <div key={task.id}>
          <Link to={`/task/${task.id}`}>{task.name}</Link>
        </div>
      ))}
      <button onClick={() => createNewTask(id)}>Add new</button>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  const groupId = ownProps.id;
  return {
    name: ownProps.name,
    id: groupId,
    tasks: state.tasks.filter((task) => task.group === groupId),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createNewTask(id) {
      dispatch(requestTaskCreation(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
