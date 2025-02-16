
function Tasks({allMainTasks,deleteTaskHandler,getTaskCompletedHandler}) {

  const task = allMainTasks.map(({id,task,desc}) => {
    return (
      <div className="task" key={id}>
        <div className="task-info">
          <h3>{task}</h3>
          <p>{desc}</p>
        </div>
        <div className="task-method">
          <button onClick={() => deleteTaskHandler(id)}>
            <i className="fa-solid fa-trash delete-i"></i>
          </button>
          <button onClick={() => getTaskCompletedHandler(id)}>
            <i className="fa-solid fa-check checked-i"></i>
          </button>
        </div>
      </div>
    );
  });
  return (
    <div className="main-task">
      <div className="tasks">{task}</div>
      
    </div>
  );
}

export default Tasks;
