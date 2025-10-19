import TaskForm from './component/Taskform'
import TaskList from './component/Tasklist';
import Progresstracker from './component/Progresstracker';
import { useEffect, useState } from 'react';
import './style.css';


export default function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(()=> {
    localStorage.setItem("tasks",JSON.stringify(tasks))
  }, [tasks]);

  const addTask = (task)=>{
    setTasks([...tasks, task])
  }

  const updateTask = (updatedTask, index)=>{
    const newtask = [...tasks];
    const existing = newtask[index] || {};
    const preservedCreatedAt = existing.createdAt || new Date().toISOString();
    newtask[index] = {
      ...existing,
      ...updatedTask,
      createdAt : preservedCreatedAt,
      updatedAt : new Date().toISOString()
    };
    setTasks(newtask);
  }

  const deleteTask = (index)=>{
    setTasks(tasks.filter((_, i) => i != index))
   }

   const clearTasks = () => {
      setTasks([]);
   }
   
  return (
    <div className='App'>
      <header>
        <h1 className='title'>Clear Quest</h1>
        <h5 className='tagline'>Conquer chaos. Check off your quest.</h5>
      </header>
      <TaskForm addTask = {addTask} tasks={tasks}/>
      <TaskList tasks = {tasks}
      updateTask = {updateTask}
      deleteTask = {deleteTask} />
      <Progresstracker tasks = {tasks}/>

      {tasks.length>0 && (<button onClick={clearTasks} className='clear-btn'>Clear all tasks</button>)}
    
    </div>

  )
}