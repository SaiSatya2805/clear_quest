export default function ProgressTracker({tasks}) {

    const completedTasks = tasks.filter((t)=>t.completed).length
    const totaltasks = tasks.length;
    const percentage = totaltasks === 0 ? 0 : (completedTasks / totaltasks) * 100;
    
  return (
    <div className='progress-tracker'>
        <h3>
            {completedTasks} out of {totaltasks} tasks completed.
        </h3>

        <div className='progress-bar'>
            <div className='progress-fill'
            style={{width: `${percentage}%`}}>
            </div>
        </div>
    </div>
  )
}