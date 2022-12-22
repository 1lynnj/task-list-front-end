import React from 'react';
import PropTypes from 'prop-types';

import './Task.css';

const Task = ({ id, title, isComplete, updateComplete, deleteTask }) => {
  const updateCompleteButtonClick = () => {
    console.log(
      `1. Button was clicked on a task that is ${
        isComplete ? 'complete' : 'incomplete'
      }`
    );
    const updatedTask = {
      id: id,
      title: title,
      isComplete: !isComplete,
      deleteTask: deleteTask,
    };
    console.log(
      `2. New task is ${JSON.stringify(
        updatedTask
      )}. Next, call updateComplete.`
    );
    updateComplete(id, updatedTask);
  };

  const buttonClass = isComplete ? 'tasks__item__toggle--completed' : '';

  return (
    <li key={id} className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={() => updateCompleteButtonClick()}
      >
        {id} {title}
      </button>
      <button
        className="tasks__item__remove button"
        onClick={() => deleteTask(id)}
      >
        Delete
      </button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  updateComplete: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default Task;
