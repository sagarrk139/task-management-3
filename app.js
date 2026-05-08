const API = "http://localhost:5000/api";

let token = "";

const socket = io("http://localhost:5000");

socket.on("taskUpdated", () => {
  getTasks();
});

async function register() {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  alert("Registered Successfully");
}

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await res.json();

  token = data.token;

  getTasks();
}

async function addTask() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  await fetch(`${API}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      title,
      description,
    }),
  });

  getTasks();
}

async function getTasks() {
  const res = await fetch(`${API}/tasks`, {
    headers: {
      Authorization: token,
    },
  });

  const tasks = await res.json();

  const taskDiv = document.getElementById("tasks");

  taskDiv.innerHTML = "";

  tasks.forEach((task) => {
    taskDiv.innerHTML += `
      <div class="task">
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <p>Status: ${task.status}</p>

        <button onclick="deleteTask('${task._id}')">
          Delete
        </button>

        <button onclick="updateTask('${task._id}')">
          Mark Complete
        </button>
      </div>
    `;
  });
}

async function deleteTask(id) {
  await fetch(`${API}/tasks/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  });

  getTasks();
}

async function updateTask(id) {
  await fetch(`${API}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      status: "Completed",
    }),
  });

  getTasks();
}