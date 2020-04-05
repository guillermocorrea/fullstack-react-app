import React from 'react';
import { connect } from 'react-redux';
import TaskList from './TaskList';

const Dashboard = ({ groups }) => {
  return (
    <div>
      <h2>Dashboard</h2>
      {groups.map((group) => (
        <TaskList id={group.id} name={group.name} key={group.id} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    groups: state.groups,
  };
};

export default connect(mapStateToProps)(Dashboard);
