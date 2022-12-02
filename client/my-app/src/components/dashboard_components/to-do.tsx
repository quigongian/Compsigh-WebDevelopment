import React, { useEffect, useRef, useState } from "react";
import "./to-do.css";
import { Edit } from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { Task } from "../../services/models";
import { createTask, deleteTask, getTasksByStatus, updateTask, updateTaskCompletedStatus } from "../../services/requests";
import { HttpStatusCode } from "../../services/http-client";

const Container = {
  //   border: "1px solid pink",
  marginLeft: "9%",
  height: "99.5vh",
  width: "90vw",
  display: "grid !important",
};
const Wrapper = {
  display: "flex",
  height: "90vh",
  width: "100%",
};

const rightContainer = {
  //   border: "1px solid red",
  height: "100%",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const toDoList = {
  height: "92%",
  width: "90%",
  // margin: "20px",
  marginTop: "7rem",
  justifyContent: "center",
  alignItems: "center",
  overflow: "auto",
};

export const Todo = () => {
  const [toDo, setToDo] = useState<Task[]>([]);
  const [stale, setStale] = useState<boolean>(false);
  //Temp States
  const [newTask, setNewTask] = useState("");
  const [updateData, setUpdateData] = useState({
    id: 1,
    title: "",
    status: false,
  });
  const [active, setActive] = useState("First");

  const ref = useRef<null | HTMLDivElement>(null);

  const handleScroll = () => {
    ref.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  };

  useEffect(() => {
    getTasksByStatus()
      .then((response) => {
        if (response.status === HttpStatusCode.Ok) {
          setToDo(response.data);
        } else {
          console.log("Error", response.statusText);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [stale]);

  const addTask = () => {
    if (newTask) {
      createTask({ taskName: newTask, taskDescription: "" })
        .then((response) => {
          if (response.status === HttpStatusCode.Created) {
            setStale((st) => !st);
            setNewTask("");
          } else {
            console.log("Error", response.statusText);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const deleteTaskHandler = (id: number) => {
    deleteTask(id)
      .then((response) => {
        if (response.status === HttpStatusCode.NoContent) {
          setStale((st) => !st);
        } else {
          console.log("Error", response.statusText);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const markDone = (taskId: number) => {
    const idx = toDo.findIndex((task) => task.taskId === taskId);
    updateTaskCompletedStatus(taskId, {
      completed: !toDo[idx].completed,
    }).then((response) => {
      if (response.status === HttpStatusCode.NoContent) {
        setStale((st) => !st);
      } else {
        console.log("Error", response.statusText);
      }
    });
  };

  const changeTask = (e: any) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false,
    };
    setUpdateData(newEntry);
  };

  const updateTaskHandler = () => {
    updateTask(updateData.id, {
      taskName: updateData.title,
      taskDescription: "",
      completed: updateData.status,
    })
      .then((response) => {
        if (response.status === HttpStatusCode.Ok) {
          setStale((st) => !st);
          setUpdateData({ id: 0, title: "", status: false });
        } else {
          console.log("Error", response.statusText);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div style={Container}>
        <div style={Wrapper}>
          <div style={rightContainer}>
            <div style={toDoList}>
              <h2 ref={ref}>Your To-do List</h2>

              {/* Update Task */}
              {active === "Second" && (
                <span className="updateTask">
                  <div className="row">
                    <div className="col">
                      <input value={updateData && updateData.title} onChange={(e: any) => changeTask(e)} className="form-control" />
                    </div>
                    <div className="col-auto">
                      <button
                        className="btn"
                        onClick={() => {
                          updateTaskHandler();
                          setActive("First");
                        }}
                      >
                        Update
                      </button>
                      <button
                        className="btncancel"
                        onClick={() => {
                          setActive("First");
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                  <br />
                </span>
              )}
              {/* Add Task */}
              {active === "First" && (
                <span className="addTask">
                  <div className="row">
                    <div className="col">
                      <input value={newTask} onChange={(e: any) => setNewTask(e.target.value)} className="form-control" />
                    </div>
                    <div className="col-auto">
                      <button onClick={addTask} className="btn">
                        Add Task
                      </button>
                    </div>
                  </div>
                  <br />
                </span>
              )}
              {toDo && toDo.length ? "" : "No Tasks..."}

              {toDo &&
                toDo.map((task, index) => {
                  return (
                    <React.Fragment key={task.taskId}>
                      <div className="taskBg">
                        <div className={task.completed ? "done" : ""}>
                          <span className="taskNumber">{index + 1}</span>
                          <span className="taskText">{task.taskName}</span>
                        </div>
                        <div className="iconWrapper">
                          <span title="Complete/Uncomplete" onClick={(e: any) => markDone(task.taskId)}>
                            <CheckCircleIcon />
                          </span>
                          {task.completed ? null : (
                            <span
                              title="Edit"
                              onClick={() => {
                                setUpdateData({
                                  id: task.taskId,
                                  title: task.taskName,
                                  status: task.completed ? true : false,
                                });
                                setActive("Second");
                                handleScroll();
                              }}
                            >
                              <Edit />
                            </span>
                          )}
                          <span
                            title="Delete"
                            onClick={() => {
                              deleteTaskHandler(task.taskId);
                              setActive("First");
                            }}
                          >
                            <DeleteIcon />
                          </span>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
