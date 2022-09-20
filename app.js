//* ======================================================
//*                     TODO APP
//* ======================================================

//?Selectors
const addBtn = document.getElementById("todo-button");
const todoInput = document.getElementById("todo-input");
const todoUl = document.getElementById("todo-ul");

//* Updating todos array with data from localStorage
//! If there is no item named todos in localStrge, assign an empty array.
let todos = JSON.parse(localStorage.getItem("TODOS")) || [];
console.log(todos);

const renderSavedTodos = () => {
  todos.forEach((todo) => {
    createListElement(todo);
  });
};

renderSavedTodos();

addBtn.addEventListener("click", () => {
  if (todoInput.value.trim() === "") {
    alert("PLease enter new todo");
  } else {
    const newTodo = {
      id: new Date().getTime(),
      completed: false,
      text: todoInput.value,
    };

    //! create a new li element and press it into the DOM
    createListElement(newTodo);

    //? Save newly created todo to array
    todos.push(newTodo);

    localStorage.setItem("TODOS", JSON.stringify(todos));
    console.log(todos);
    todoInput.value = "";
  }
});

function createListElement(newTodo) {
  const { id, completed, text } = newTodo; //!destr.

  //? Create a new li element and assign it the id value in the object and its completed class.
  const li = document.createElement("li");
  // li.id = newTodo.id;
  li.setAttribute("id", id);

  // newTodo.completed ? li.classList.add("completed") : "";
  completed && li.classList.add("checked");

  //? create okey icon and connect to li element
  const okIcon = document.createElement("i");
  okIcon.setAttribute("class", "fas fa-check");
  li.appendChild(okIcon);

  //? Connect to li by creating a p element and my writing node for the todo header
  const p = document.createElement("p");
  const pTextNode = document.createTextNode(text);
  p.appendChild(pTextNode);
  li.appendChild(p);

  //? create delete icon and attach to li element
  const deleteIcon = document.createElement("i");
  deleteIcon.setAttribute("class", "fas fa-trash");
  li.appendChild(deleteIcon);

  console.log(li);
  //? assign the resulting li element to ul as a child
  todoUl.appendChild(li);
}


//!If an event comes from any of the children of the ul element, detect it and take action. (Capturing)
todoUl.addEventListener("click", (e) => {
    console.log(e.target);
  
    const id = e.target.parentElement.getAttribute("id");
    //! event, bir delete butonundan geldi ise
    if (e.target.classList.contains("fa-trash")) {
      //? delete parent of delete button from DOM
      e.target.parentElement.remove();
  
      //? Delete related element of array
      todos = todos.filter((todo) => todo.id !== Number(id));
  
      //? save final todos array to localStorage
      localStorage.setItem("TODOS", JSON.stringify(todos));
    } else if (e.target.classList.contains("fa-check")) {
      //! If the event came from an okey button
      //? If the relevant li element has a class named checked, delete it, otherwise add it (DOM)
      e.target.parentElement.classList.toggle("checked");
    }
  });

  //? Adding is possible with the enter key
todoInput.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
      addBtn.click();
    }
  });
  
  //? Let the input be active at the start
  window.onload = function () {
    todoInput.focus();
  };