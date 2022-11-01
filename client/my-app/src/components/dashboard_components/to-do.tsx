import React from "react"


const Container={
    border: "1px solid red",

    
}
const Wrapper={
    display: "flex",
    height: "80vh",
    width: "100%",  
}
const Sidebar={
    border: "2px solid black",
    height: "100%",
    width: "125px",    
}

const rightContainer={
    border: "1px solid blue",
    height: "100%",
    width: "100%",
}

export const Todo = () => {
    return (
        <>
        <div style ={Container}>
            <div style ={Wrapper}>
            <div style={Sidebar}></div>
            <div style ={rightContainer}></div>
            </div>
        </div>
        
        </>
    );
}