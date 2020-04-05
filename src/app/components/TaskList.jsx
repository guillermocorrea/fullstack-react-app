import React from 'react';
import { connect } from 'react-redux';

const TaskList = ({ tasks, name }) => {
  return (
    <>
      <h3>{name}</h3>
      {tasks.map((task) => (
        <div key={task.id}>{task.name}</div>
      ))}
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

export default connect(mapStateToProps)(TaskList);
