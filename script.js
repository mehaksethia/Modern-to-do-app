// Selectors
const authScreen = document.getElementById('auth-screen');
const todoScreen = document.getElementById('todo-screen');
const usernameInput = document.getElementById('username-input');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const displayName = document.getElementById('display-name');
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

let currentUser = "";

// Check if a user is already logged in
window.onload = () => {
    const savedUser = localStorage.getItem('todo_user');
    if (savedUser) {
        login(savedUser);
    }
};

// Login Logic
loginBtn.onclick = () => {
    const user = usernameInput.value.trim();
    if (user) {
        localStorage.setItem('todo_user', user);
        login(user);
    }
};

function login(user) {
    currentUser = user;
    displayName.innerText = `Hi, ${user}!`;
    authScreen.classList.add('hidden');
    todoScreen.classList.remove('hidden');
    renderTasks();
}

// Logout Logic
logoutBtn.onclick = () => {
    localStorage.removeItem('todo_user');
    location.reload();
};

// Task Logic
addTaskBtn.onclick = () => {
    const task = taskInput.value.trim();
    if (task) {
        const tasks = JSON.parse(localStorage.getItem(`tasks_${currentUser}`)) || [];
        tasks.push(task);
        localStorage.setItem(`tasks_${currentUser}`, JSON.stringify(tasks));
        taskInput.value = "";
        renderTasks();
    }
};

function renderTasks() {
    const tasks = JSON.parse(localStorage.getItem(`tasks_${currentUser}`)) || [];
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task}</span>
            <button onclick="deleteTask(${index})">×</button>
        `;
        taskList.appendChild(li);
    });
}

function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem(`tasks_${currentUser}`));
    tasks.splice(index, 1);
    localStorage.setItem(`tasks_${currentUser}`, JSON.stringify(tasks));
    renderTasks();
}