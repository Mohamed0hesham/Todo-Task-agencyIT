const todoBaseURL = "https://jsonplaceholder.typicode.com/todos";

//Getting all the user's todos
export async function getTodos(userId) {
  return await fetch(`${todoBaseURL}?userId=${userId}`)
    .then((response) => response.json())
    .then((data) => data);
}

//creating a new todo
export async function createTodo(todo) {
  return await fetch(`${todoBaseURL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  })
    .then((response) => response.json())
    .then((data) => data);
}

//deleting a todo
export async function deleteTodo(id) {
  return await fetch(`${todoBaseURL}/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => data);
}

//updating a todo
export async function UpdateTodo(id, data) {
  return await fetch(`${todoBaseURL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => data);
}
