import React, {useEffect, useRef, useState} from 'react';    
import './to-do.css';
import { Edit } from '@mui/icons-material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';

const Container = {
//   border: "1px solid pink",
  marginLeft: "9%",
  height: "99.5vh"
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
  margin: "20px",
  justifyContent: "center",
  alignItems: 'center',
  overflow: 'auto'
};


export const Todo = () => {
    const[toDo, setToDo]=useState([
        {id: 1, title: "Write your first task!", "status": false }
        ]);

    //Temp States
    const [newTask, setNewTask] = useState('');
    const [updateData, setUpdateData] = useState({id: 1, title: "", status: false});
    const [active, setActive] = useState("First")
   
      const ref = useRef<null | HTMLDivElement>(null); 

      const handleScroll = () => {
        ref.current?.scrollIntoView({block: "nearest",behavior: 'smooth'});
      };

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

    //updates task
    const changeTask = (e:any) =>{
        let newEntry={
            id: updateData.id,
            title: e.target.value,
            status: updateData.status ? true : false
        }
        
        setUpdateData(newEntry)
    }

    const updateTask = () =>{
        let filterRecords = [...toDo].filter(task => task.id !== updateData.id)
        let updatedObject = [...filterRecords, updateData]
        if(updateData.id !== 0){
            setToDo(updatedObject)
        }
        setUpdateData({id: 0 , title: "", status: false})
    }
    
 


    return (
        <>
        <div style ={Container}>
            <div style ={Wrapper}>
                    <div style ={rightContainer}>
                       
<div style={toDoList}>
        
        <h2 ref={ref}>Your To-do List</h2>
        
        
            {/* Update Task */}
            {active === "Second" &&
            <span className = "updateTask">

                <div className="row">
                        <div className="col">
                            <input 
                            value={updateData && updateData.title}
                            onChange ={(e:any) => changeTask(e)}
                            className="form-control"/>
                        </div> 
                        <div className="col-auto">
                            <button className="btn"
                            onClick={()=>{updateTask(); setActive("First");}}>Update</button>
                            <button className="btncancel" onClick={()=>{setActive("First");}}>Cancel</button>
                        </div>
                </div>
            <br/>
            </span>
                   
                }
            {/* Add Task */}
            {active === "First" &&
     <span className ="addTask">
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
    </span>
    }                       
        {toDo && toDo.length ? '' : 'No Tasks...'} 

        {toDo && toDo
            .map((task,index)=>{
                return(
                    <React.Fragment key={task.id}>

                        <div className="taskBg">
                            <div className={task.status ? 'done' : ''}>
                                <span className="taskNumber">{index + 1}</span>
                                <span className ="taskText">{task.title}</span>
                            </div>
                            <div className="iconWrapper">
                                <span title="Complete/Uncomplete"
                                    onClick={(e:any)=> markDone(task.id)}>
                                <CheckCircleIcon/>
                                </span>
                                {task.status ? null :(
                                <span title="Edit"
                                    onClick={()=> {setUpdateData({
                                        id: task.id, 
                                        title: task.title,
                                        status: task.status ? true : false}); 
                                        setActive("Second");
                                        handleScroll();}}
                                >       
                                <Edit/>
                                </span>
                                )}
                                <span title="Delete"
                                    onClick={()=> {deleteTask(task.id); setActive("First")}}
                                > 
                                <DeleteIcon />
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



    
  


