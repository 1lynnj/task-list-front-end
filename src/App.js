import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList.js';
import NewTaskForm from './components/NewTaskForm.js';

import './App.css';

// const TASKS = [
//   {
//     id: 1,
//     title: 'Mow the lawn',
//     isComplete: false,
//   },
//   {
//     id: 2,
//     title: 'Cook Pasta',
//     isComplete: true,
//   },
// ];

const App = () => {
  // const tasksCopy = TASKS.map((task) => {
  //   return { ...task };
  // });
  const [tasksList, setTasksList] = useState([]);
  // Back-end URL
  const URL = 'http://127.0.0.1:5000/tasks';

  const fetchAllTasks = () => {
    axios
      .get(URL)
      .then((response) => {
        console.log(response);
        const tasksAPIResponseCopy = response.data.map((task) => {
          task.isComplete = task.is_complete;
          delete task['is_complete'];
          return {
            ...task,
          };
        });
        setTasksList(tasksAPIResponseCopy);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(fetchAllTasks, []);

  const updateComplete = (taskId, updatedTask) => {
    console.log(`3. updateComplete called with ${JSON.stringify(updatedTask)}`);

    let status = '';
    if (updatedTask.isComplete) {
      console.log(
        `4a. updatedTask.isComplete is ${updatedTask.isComplete}, so mark_complete`
      );
      status = 'mark_complete';
    } else {
      console.log(
        `4bs. updatedTask.isComplete is ${updatedTask.isComplete}, so mark_incomplete`
      );
      status = 'mark_incomplete';
    }
    console.log('5. Update the database');
    const newTasksList = [];
    axios
      .patch(`${URL}/${taskId}/${status}`)
      .then(() => {
        for (const task of tasksList) {
          if (task.id !== taskId) {
            newTasksList.push(task);
          } else {
            console.log(`6. Updated task in list is ${updatedTask.isComplete}`);
            const newTask = {
              ...task,
              isComplete: updatedTask.isComplete,
            };
            console.log(`7. newTask is ${JSON.stringify(newTask)}`);
            newTasksList.push(newTask);
          }
        }
        console.log('8. Update the task list.');
        setTasksList(newTasksList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteTask = (taskId) => {
    console.log('deleteTask called');
    axios
      .delete(`${URL}/${taskId}`)
      .then(() => {
        const newTasksList = [];
        for (const task of tasksList) {
          if (task.id !== taskId) {
            newTasksList.push(task);
          }
        }
        setTasksList(newTasksList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addNewTask = (newTask) => {
    console.log('add new task is called');
    // newTask = {
    //   title: '',
    // };
    axios
      .post(URL, newTask)
      .then((response) => {
        let task = response.data.task;
        task.isComplete = task.is_complete;
        const newTasksList = [...tasksList];
        newTasksList.push(response.data.task);
        setTasksList(newTasksList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          {
            <TaskList
              tasks={tasksList}
              updateComplete={updateComplete}
              deleteTask={deleteTask}
            />
          }
        </div>
        <NewTaskForm addTaskCallback={addNewTask}></NewTaskForm>
      </main>
    </div>
  );
};

export default App;
