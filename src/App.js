import { useEffect, useRef, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Tasks from "./components/Tasks";
import Completed from "./components/Completed";

function App() {
  const [task, setTask] = useState("");
  const [desc, setDesc] = useState("");
  const [comp, setComp] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const taskInputRef = useRef(null);

  useEffect(() => {
    const saveAllTasks = localStorage.getItem("allTasks");
    if (saveAllTasks) {
      setAllTasks(JSON.parse(saveAllTasks));
    }

    const savedCompletedTasks = localStorage.getItem("completedTasks");
    if (savedCompletedTasks) {
      setComp(JSON.parse(savedCompletedTasks));
    }
  }, []);

  useEffect(() => {
    if (allTasks.length > 0) {
      localStorage.setItem("allTasks", JSON.stringify(allTasks));
    } else {
      localStorage.removeItem("allTasks");
    }
  }, [allTasks]);

  useEffect(() => {
    if (comp.length > 0) {
      localStorage.setItem("completedTasks", JSON.stringify(comp));
    } else {
      localStorage.removeItem("completedTasks");
    }
  }, [comp]);

  const taskHandler = (e) => setTask(e.target.value);
  const descriptionHandler = (e) => setDesc(e.target.value);

  const addTask = () => {
    if (task.trim() === "" || desc.trim() === "") return;
    setAllTasks([...allTasks, { id: Date.now(), task, desc }]);
    setTask("");
    setDesc("");
    inputTaskFocus();
  };

  const deleteTaskHandler = (id) => {
    setAllTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const enterKey = (event) => {
    if (event.key === "Enter") addTask();
  };

  const getTaskCompletedHandler = (id) => {
    const completedTask = allTasks.find((t) => t.id === id);
    if (completedTask) {
      const completedWithDate = {
        ...completedTask,
        completedAt: new Date().toLocaleString(),
      };
      setComp((prevComp) => {
        const updatedComp = [...prevComp, completedWithDate];
        localStorage.setItem("completedTasks", JSON.stringify(updatedComp));
        return updatedComp;
      });
    }
    deleteTaskHandler(id);
  };

  const inputTaskFocus = () => {
    taskInputRef.current?.focus();
  };
  const clearHistoryHandler = () => {
    setComp([]);
    localStorage.removeItem("comp");
  };
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="App">
      <div className="container">
        <div className="title">
          <h1>To Do List</h1>
        </div>

        <div className="toDoBox mb-3">
          <div className="getInfo">
            <div className="inputs">
              <div className="task">
                <label htmlFor="task">Task:</label>
                <input
                  type="text"
                  placeholder="Enter Your Task..."
                  ref={taskInputRef}
                  id="task"
                  value={task}
                  onChange={taskHandler}
                  onKeyDown={enterKey}
                />
              </div>
              <div className="description">
                <label htmlFor="desc">Description:</label>
                <input
                  type="text"
                  placeholder="Task Description"
                  id="desc"
                  value={desc}
                  onChange={descriptionHandler}
                  onKeyDown={enterKey}
                />
              </div>
            </div>
            <div className="addTask">
              <button onClick={addTask}>Add</button>
            </div>
          </div>

          <div className="task-comp">
            <Link
              to="/"
              className={`toDo-btn ${isActive("/") ? "active" : ""}`}
            >
              To Do
            </Link>
            <Link
              to="/completed"
              className={`comp-btn ${isActive("/completed") ? "active" : ""}`}
            >
              Completed
            </Link>
          </div>
        </div>

        <Routes>
          <Route
            path="/"
            element={
              <Tasks
                allMainTasks={allTasks}
                deleteTaskHandler={deleteTaskHandler}
                getTaskCompletedHandler={getTaskCompletedHandler}
              />
            }
          />
          <Route
            path="/completed"
            element={
              <Completed
                comp={comp}
                clearHistoryHandler={clearHistoryHandler}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
