import React from 'react';
import { connect } from 'react-redux';
import TaskList from './TaskList';

const Dashboard = ({ groups }) => {
  return (
    <div className="row">
      {groups.map((group) => (
        <TaskList id={group.id} name={group.name} key={group.id} className="col" />
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
