// Select elements
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

// Load tasks on page load
window.onload = loadTasks;

addBtn.addEventListener('click', addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  if (!taskText) {
    alert("Please enter a task.");
    return;
  }

  const taskObj = {
    id: Date.now(),
    text: taskText,
    completed: false
  };

  const tasks = getTasks();
  tasks.push(taskObj);
  saveTasks(tasks);
  renderTasks();

  taskInput.value = "";
}

function renderTasks() {
  const tasks = getTasks();
  taskList.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task-item';
    if (task.completed) li.classList.add('completed');

    li.innerHTML = `
      <span class="task-text">${task.text}</span>
      <div class="task-buttons">
        <input type="checkbox" ${task.completed ? "checked" : ""} onclick="toggleComplete(${task.id})" />
        <button onclick="editTask(${task.id})">✏️</button>
        <button onclick="deleteTask(${task.id})">🗑️</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

function getTasks() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}

function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(id) {
  const tasks = getTasks().filter(task => task.id !== id);
  saveTasks(tasks);
  renderTasks();
}

function editTask(id) {
  const tasks = getTasks();
  const task = tasks.find(t => t.id === id);
  const newText = prompt("Edit your task:", task.text);
  if (newText !== null && newText.trim() !== "") {
    task.text = newText.trim();
    saveTasks(tasks);
    renderTasks();
  }
}

function toggleComplete(id) {
  const tasks = getTasks();
  const task = tasks.find(t => t.id === id);
  task.completed = !task.completed;
  saveTasks(tasks);
  renderTasks();
}

function loadTasks() {
  renderTasks();
}
