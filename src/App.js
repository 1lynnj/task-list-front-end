import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList.js';
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
  const URL = 'http://127.0.0.1:5000';

  useEffect(() => {
    axios
      .get(`${URL}/tasks`)
      .then((response) => {
        console.log(response);
        const tasksAPIResponseCopy = response.data.map((task) => {
          return {
            ...task,
          };
        });
        setTasksList(tasksAPIResponseCopy);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const updateComplete = (taskId) => {
    console.log('update iscomplete called');
    const newTasksList = [];
    for (const task of tasksList) {
      if (task.id !== taskId) {
        newTasksList.push(task);
      } else {
        const newTask = {
          ...task,
          isComplete: !task.isComplete,
        };
        newTasksList.push(newTask);
      }
    }
    setTasksList(newTasksList);
  };

  const deleteTask = (taskId) => {
    console.log('deleteTask called');
    axios
      .delete(`${URL}/tasks/${taskId}`)
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
      </main>
    </div>
  );
};

export default App;
