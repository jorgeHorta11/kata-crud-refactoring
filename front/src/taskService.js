const HOST_API = "http://localhost:8080/api";

export const addTask = async (request) => {
  return fetch(HOST_API + "/todo", {
    method: "POST",
    body: JSON.stringify(request),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};

export const editTask = async (request) => {
  return fetch(HOST_API + "/todo", {
    method: "PUT",
    body: JSON.stringify(request),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};

export const changeTaskStatus = async (request) => {
  return fetch(HOST_API + "/todo", {
    method: "PUT",
    body: JSON.stringify(request),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};

export const deleteTask = async (id) => {
  return fetch(HOST_API + "/" + id + "/todo", {
    method: "DELETE",
  })
    .then(() => id)
    .catch((err) => console.log(err));
};

export const updateList = async () => {
  return fetch(HOST_API + "/todos").then((response) => response.json());
};
