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



