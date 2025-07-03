// script.js

console.log("To-Do App loaded"); // minor change for Git commit testing

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filter-btn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render tasks based on current filter
function renderTasks(filter = "all") {
  taskList.innerHTML = "";

  tasks
    .filter(task => {
      if (filter === "active") return !task.completed;
      if (filter === "completed") return task.completed;
      return true;
    })
    .forEach((task, index) => {
      const li = document.createElement("li");
      li.className = task.completed ? "completed" : "";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      checkbox.addEventListener("change", () => {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks(document.querySelector(".filter-btn.active").dataset.filter);
      });

      const span = document.createElement("span");
      span.textContent = task.text;
      span.className = "task-text";

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "🗑";
      deleteBtn.className = "delete-btn";
      deleteBtn.addEventListener("click", () => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks(document.querySelector(".filter-btn.active").dataset.filter);
      });

      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(deleteBtn);
      taskList.appendChild(li);
    });
}

// Add new task
addBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    tasks.push({ text: taskText, completed: false });
    taskInput.value = "";
    saveTasks();
    renderTasks(document.querySelector(".filter-btn.active").dataset.filter);
  }
});

// Filter buttons logic
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter-btn.active").classList.remove("active");
    btn.classList.add("active");
    renderTasks(btn.dataset.filter);
  });
});

// Initial render
renderTasks();
