import React from "react";

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
};

const textBox = {
  alignItems: "center",
  justifyContent: "center",
  width: "70%",
  border: "1px solid green",
  display: "flex",
};

export const Todo = () => {
  return (
    <>
      <div style={Container}>
        <div style={Wrapper}>
          <div style={Sidebar}></div>
          <div style={rightContainer}>
            <div style={toDoList}>
              <div style={textBox}>
                <p>To-Do List</p>
                <p>Filter</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
