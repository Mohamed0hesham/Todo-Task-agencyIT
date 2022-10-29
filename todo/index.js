window.module = {};
import { getUserData } from "../utils/usersAPI.js";
import { getCookie, setCookie } from "../utils/Cookies.js";
import {
  getTodos,
  deleteTodo,
  UpdateTodo,
  createTodo,
} from "../utils/todosAPI.js";

const table = document.getElementById("table");
const userName = document.querySelector(".user > p");
const userImage = document.querySelector(".user > img");
const logOut = document.getElementById("logOut");

const modalAddTodoBtn = document.getElementById("addTodoBtn");
const modalEditTodoBtn = document.getElementById("editTodoBtn");
const modalBodyTextArea = document.getElementById("add-todo-title");
const editModalBodyTextArea = document.getElementById("edit-todo-title");

const userId = getCookie("id");
let todosList = [];
let elementHoldingTodoTitle;
let todoIndex;

//fetching users from the API
const fetchUserData = async () => {
  const user = await getUserData(userId);
  userName.innerHTML = `Welcome ${user.first_name} ${user.last_name}`;
  userImage.src = `${user.avatar}`;
};

//fetching user todos and calling the listTodos function for listing them
const getUserTodos = async () => {
  todosList = await getTodos(userId);
  listTodos();
};

fetchUserData();
getUserTodos();

//listing the todos into the table by creating new row at the end of
//the table rows every time and assigning it the todos data
function listTodos() {
  table.innerHTML = "";
  //Inserting a row that contains the headers
  let row = table.insertRow();
  row.innerHTML = " <tr> <th>Title</th> <th>Settings</th> </tr>";

  //A loop that iterates on the todosList creating a new row everytime containing
  //a single todo with its edit and delete buttons.
  for (let i = 0; i < todosList.length; i++) {
    let row = table.insertRow(-1);
    row.innerHTML = `<tr>
        <td>
          <input type="checkbox" class="titleInput" id='todo${i}' name="todo" value="todo" ${
      todosList[i].completed ? "checked" : ""
    }/>
          <label class="titleLabale" for='todo${i}' id="${"check" + i}">${
      todosList[i].title
    }</label>
        </td>
        <td>
        <button id="${
          todosList[i].id + "e"
        }" type="button" class="btn btn-secondary me-2s" data-bs-toggle="modal" data-bs-target="#editModal" data-bs-whatever="@mdo">Edit</button>
      <button id="${
        todosList[i].id + "d"
      }" class="btn btn-danger float-end">Delete</button>

        </td>
    </tr>`;
    //attaching a listener the buttons and the checkbox
    let editBtn = document.getElementById(`${todosList[i].id + "e"}`);
    let delBtn = document.getElementById(`${todosList[i].id + "d"}`);
    let checkbox = document.getElementById(`${"todo" + i}`);
    editBtn.addEventListener("click", handelTitleEdit);
    delBtn.addEventListener("click", handleDelete);
    checkbox.addEventListener("click", handleStatusChange);
  }
}

const handleDelete = (event) => {
  //getting the parent row that contains the clicked button
  const row = event.target.parentElement.parentElement;
  //the row index inside the table
  const index = row.rowIndex;
  //getting the todo Id for calling the DELETE request
  //(it won't affect the data on the api due to api limitations)
  const TodoId = todosList[index - 1].id;
  deleteTodo(TodoId);
  //deleting the todo from the local todos list and listing them again
  //because the api does not change the list on the database
  todosList.splice(index - 1, 1);
  listTodos();
};

const handelTitleEdit = (event) => {
  //getting the parent row that contains the clicked button
  const row = event.target.parentElement.parentElement;
  //the row index inside the table
  const index = row.rowIndex;
  //setting the "todoIndex" global variable to the index of the row
  todoIndex = index;
  //getting the element that contains the title of the todo
  const TileElement =
    event.target.parentElement.previousElementSibling.lastElementChild;
  //setting the "elementHoldingTodoTitle" global variable to the TitleElement variable
  elementHoldingTodoTitle = TileElement;
  //setting the text area inside the modal to the title that needs to be edited
  editModalBodyTextArea.value = TileElement.innerHTML;
};

const handleStatusChange = (event) => {
  //getting the parent row that contains the clicked button
  const row = event.target.parentElement.parentElement;
  const index = row.rowIndex;
  //editing the todo completed property in the local todos list
  //because the api does not update the list on the database
  const status = todosList[index - 1].completed;
  todosList[index - 1].completed = !status;
};

modalAddTodoBtn.addEventListener("click", () => {
  //getting the text inside the text area of the modal
  let todoTitle = modalBodyTextArea.value;
  //calling the function containing the logic of adding a new Todo
  addNewTodo(todoTitle);
  //clearing the text inside the text area of the modal
  modalBodyTextArea.value = "";
});

modalEditTodoBtn.addEventListener("click", () => {
  //setting the title of the todo with the title provided in the modal text area
  elementHoldingTodoTitle.innerHTML = editModalBodyTextArea.value;
  //calling the function containing the logic of editing the title
  editTodoTitle(editModalBodyTextArea.value);
});

function addNewTodo(todoTitle) {
  //data object containg the new Todo to be sent to the API
  const newTodo = {
    userId: userId,
    id: todosList.length + 1,
    title: todoTitle,
    completed: false,
  };
  //pushing the new Todo object to the local Todos list and listing the todos
  todosList.push(newTodo);
  listTodos();
  //calling the API for posting the new Todo
  //(it won't affect the data on the api due to api limitations)
  createTodo(newTodo);
}

function editTodoTitle(newValue) {
  //updating the todo title in the local todos list
  todosList[todoIndex - 1].title = newValue;
  const todoId = todosList[todoIndex - 1].id;
  //data object containg the updated title value to be sent to the API
  const data = {
    userId: userId,
    id: todosList.length + 1,
    title: newValue,
    completed: false,
  };
  //using the API PUT request
  //(it won't affect the data on the api due to api limitations)
  UpdateTodo(todoId, data);
}

logOut.addEventListener("click", function () {
  //clearing the Cookies on loggin out
  setCookie("token", "", 0);
  setCookie("id", "", 0);
  window.location.replace(`../index.html`);
});
