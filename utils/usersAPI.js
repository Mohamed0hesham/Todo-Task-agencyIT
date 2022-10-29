const usersBaseURL = "https://reqres.in/api";

export async function getUserData(userId) {
  return await fetch(`${usersBaseURL}/users/${userId}`)
    .then((response) => response.json())
    .then((data) => data.data)
    .catch((error) => {
      alert(error);
    });
}

export async function login(credentials) {
  return await fetch(`${usersBaseURL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      alert(error);
    });
}

export async function register(credentials) {
  return await fetch(`${usersBaseURL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      alert(error);
    });
}
