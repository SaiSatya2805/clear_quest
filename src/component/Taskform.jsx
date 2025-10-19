import { useState } from "react"

export default function Taskform({addTask, tasks = []}) {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [category, setCategory] = useState('General');

  const handlesubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    
    const nowIso = new Date().toISOString();
    addTask({
      text: task,
      priority,
      category,
      completed: false,
      createdAt: nowIso,
      updatedAt: nowIso
    });

    //reset
    setTask('');
    setPriority("Medium");
    setCategory("General");
  }

  // NOTE: Do not call addTask during render; it causes infinite re-renders.


  return (
      <form onSubmit={handlesubmit} className="task-form"> 
        
        <div id="inp">
          
          <input 
            type = "text" 
            placeholder = "Enter your task..." 
            value={task} 
            onChange={(e)=> setTask(e.target.value)}
            className="capsule-input"
          />
          <button type="submit">Add task</button>
        
        </div>
        
        <div id="btns">
          
          <label htmlFor="priorities"> <b>Priority</b> </label>
          
          <select id="priorities" value={priority} onChange={(e)=> setPriority(e.target.value)}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            
            <option value="High">High</option>
          </select>

          <label htmlFor="categories"> <b>Category</b> </label>  
          
          <select value={category} onChange={(e)=>setCategory(e.target.value)}>
            
            <option value="Education">Education</option>
            <option value="Finance">Finance</option>
            <option value="General">General</option>
            <option value="Health">Health</option>
            <option value="Personal">Personal</option>
            <option value="Work">Work</option>
          
          </select>
      
      </div>

   </form>

  )
}