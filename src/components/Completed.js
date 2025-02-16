function Completed({ comp,clearHistoryHandler }) {
  if (!Array.isArray(comp) || comp.length === 0) {
    return (
      <div className="completed">
        <p>No completed tasks yet.</p>
      </div>
    );
  }

  return (
    <div className="completed">
      <div className="clear">
        <button onClick={clearHistoryHandler} className="clear-btn">Clear History</button>
      </div>
      {comp.map(({ id, task, desc, completedAt }) => (
        <div className="task-completed" key={id}>
          <h3>{task}</h3>
          <p>{desc}</p>
          <p className="date">
            <strong>Completed At: </strong> {completedAt}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Completed;
