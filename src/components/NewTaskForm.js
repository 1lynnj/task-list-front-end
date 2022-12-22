import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

const NewTaskForm = (props) => {
  const [formFields, setFormFields] = useState({
    title: '',
    description: '',
  });

  const onTitleChange = (event) => {
    setFormFields({
      ...formFields,
      title: event.target.value,
    });
  };

  const onDescriptionChange = (event) => {
    setFormFields({
      ...formFields,
      description: event.target.value,
    });
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    props.addTaskCallback({
      title: formFields.title,
      description: formFields.description,
    });
    setFormFields({
      title: '',
      description: '',
    });
  };

  return (
    <form onSubmit={onFormSubmit}>
      <div>
        <label htmlFor="taskTitle">New Task:</label>
        <input
          title="taskTitle"
          value={formFields.title}
          onChange={onTitleChange}
        />
      </div>
      <div>
        <label htmlFor="taskDescription">Description:</label>
        <input
          title="taskDescription"
          value={formFields.description}
          onChange={onDescriptionChange}
        />
      </div>
      <input type="submit" value="Add Task" />
    </form>
  );
};

NewTaskForm.propTypes = {
  addTaskCallback: PropTypes.func.isRequired,
};

export default NewTaskForm;
