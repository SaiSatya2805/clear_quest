import { memo, useCallback } from 'react';

const TaskList = memo(function TaskList({ tasks, updateTask, deleteTask }) {

  const toggleComplete = useCallback((index) => {
    const updatedTask = { ...tasks[index], completed: !tasks[index].completed };
    updateTask(updatedTask, index);
  }, [tasks, updateTask]);

  const formatTimestamp = useCallback((isoString) => {
    if (!isoString) return '';
    try {
      const d = new Date(isoString);
      const pad = (n, len = 2) => String(n).padStart(len, '0');
      const datePart = `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
      const hours24 = d.getHours();
      const minutes = pad(d.getMinutes());
      const ampm = hours24 >= 12 ? 'PM' : 'AM';
      const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
      const timePart = ` at ${pad(hours12)}:${minutes} ${ampm}`;
      return `${datePart} ${timePart}`;
    } catch (e) {
      return isoString;
    }
  }, []);

  return (
    <div className='task-list'>
      <ul>
        {tasks.map((task, index) => (
          <li 
            key={index} 
            className={task.completed ? 'completed' : ''}
            data-priority={task.priority?.toLowerCase()}
          >
            <div>
              <span>
                {task.text}
              </span>
              <div className='timestamps'>
                <small>• Priority : {task.priority}</small>
                <small>• Category : {task.category}</small>
                <small>• Created : {formatTimestamp(task.createdAt)}</small>
                <small>• Updated : {formatTimestamp(task.updatedAt)}</small>
              </div>
            </div>
            <button onClick={() => toggleComplete(index)}>
              {task.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => deleteTask(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default TaskList;