import React, {useState} from 'react';    
import './to-do.css';
import { Edit } from '@mui/icons-material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';

const Container = {
  border: "1px solid red",
};
const Wrapper = {
  display: "flex",
  height: "90vh",
  width: "100%",
};
const Sidebar = {
  border: "2px solid black",
  height: "100%",
  width: "125px",
};
const rightContainer = {
  border: "1px solid blue",
  height: "100%",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const toDoList = {
  border: "2px solid purple",
  height: "92%",
  width: "90%",
  margin: "20px",
  justifyContent: "center",
  alignItems: 'center',
  
};
const textBox = {
  alignItems: "center",
  justifyContent: "center",
  width: "70%",
  border: "1px solid green",
  display: "flex",
};

export const Todo = () => {
    const[toDo, setToDo]=useState([
        {"id": 1, "title": "Task 1", "status": false },
        {"id": 2, "title": "Task 2", "status": false }
        ]);

    //Temp States
    const [newTask, setNewTask] = useState('');
    const [updateData, setUpdateData] = useState([
        {"id": 1, "title": "Task 1", "status": false },
        {"id": 2, "title": "Task 2", "status": false }
        ]);

    //adds task
    const addTask = () => {
        if(newTask){
            let num = toDo.length + 1;
            let newEntry = {id: num, title: newTask, status: false}
            setToDo([...toDo, newEntry])
            setNewTask('');
        }
    }

    //removes task
    const deleteTask = (id:number) =>{
        let newTasks = toDo.filter(task => task.id !== id)
        setToDo(newTasks)

    }
    
    //marks task as complete
    const markDone = (id:number) =>{
        let newTask = toDo.map( task => {
            if(task.id === id){
                return({...task,status: !task.status})
            }
            return task;
        })

        setToDo(newTask);
    }

    //cancels task update
    const cancelUpdate = () =>{
    }
    
    //updates task
    const changeTask = (e:any) =>{
    }


    return (
        <>
        <div style ={Container}>
            <div style ={Wrapper}>
                <div style={Sidebar}></div>
                    <div style ={rightContainer}>
                       
<div style={toDoList}>
        <br/><br/>
        <h2>To Do List App (ReactJs)</h2>
        <br/><br/>
        {/* Update Task */}
        <div className="row">
            <div className="col">
                <input 
                // value={updateData && updateData.title}
                className="form-control"/>
            </div> 
            <div className="col-auto">
                <button className="btn">Update</button>
                <button className="btn">Cancel</button>
            </div>
        </div>


        {/* Add Task */}
        <div className ="row">
            <div className="col">
                <input 
                value={newTask}
                onChange={ (e:any)=>setNewTask(e.target.value) }
                className="form-control"/>
            </div>
            <div className="col-auto">
                <button 
                onClick={addTask}
                className="btn" >Add Task</button>
            </div>
        </div>
        <br/>

                            
        {toDo && toDo.length ? '' : 'No Tasks...'} 

        {toDo && toDo
            .map((task,index)=>{
                return(
                    <React.Fragment key={task.id}>

                        <div className="col taskBg">
                            <div className={task.status ? 'done' : ''}>
                                <span className="taskNumber">{index + 1}</span>
                                <span className ="taskText">{task.title}</span>
                            </div>
                            <div className="iconWrapper">
                                
                                <span title="Completed / Not Completed"
                                    onClick={(e:any)=> markDone(task.id)}
                                >
                                <CheckCircleIcon/>
                                </span>
                                {task.status ? null :(
                                <span title="Edit"
                                                                  >
                                <Edit/>
                                </span>
                                )}
                                <span title="Delete"
                                    onClick={()=> deleteTask(task.id)}
                                > 
                                <DeleteIcon/>
                                </span>
                            </div>
                        </div>
                       

        
                    </React.Fragment>
                )
            })}                       
</div>


                </div>
            </div>
        </div>    
        </>
    );
}



    
  


