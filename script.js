// Get DOM elements
const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

// Modal elements
const modal = document.getElementById('modal');
const closeButton = document.querySelector('.close-button');

// Load tasks from local storage
loadTasksFromStorage();

// Add event listener for adding a new task
addTaskButton.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  addTask(taskText);
  taskInput.value = '';
});

// Function to add a new task
function addTask(taskText) {
  if (taskText === '') {
    showModal();
    return;
  }

  const taskItem = document.createElement('li');
  const taskCheckbox = document.createElement('input');
  taskCheckbox.type = 'checkbox';
  taskCheckbox.addEventListener('change', () => {
    toggleTaskCompletion(taskItem);
  });

  const taskTextElement = document.createElement('span');
  taskTextElement.classList.add('task-text');
  taskTextElement.textContent = taskText;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    deleteTask(taskItem);
  });

  taskItem.appendChild(taskCheckbox);
  taskItem.appendChild(taskTextElement);
  taskItem.appendChild(deleteButton);
  taskList.appendChild(taskItem);

  // Save tasks to local storage
  saveTasksToStorage();

  // Move the focus to the top of the page
  window.scrollTo(0, 0);
}

// Function to toggle task completion
function toggleTaskCompletion(taskItem) {
  const taskTextElement = taskItem.querySelector('.task-text');
  taskTextElement.classList.toggle('completed');
  saveTasksToStorage();
}

// Function to delete a task
function deleteTask(taskItem) {
  taskList.removeChild(taskItem);
  saveTasksToStorage();
}

// Function to save tasks to local storage
function saveTasksToStorage() {
  const tasks = [];
  const taskItems = taskList.getElementsByTagName('li');
  for (let i = 0; i < taskItems.length; i++) {
    const taskItem = taskItems[i];
    const taskText = taskItem.querySelector('.task-text').textContent;
    const isCompleted = taskItem.querySelector('.task-text').classList.contains('completed');
    tasks.push({ text: taskText, completed: isCompleted });
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasksFromStorage() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach((task) => {
    addTask(task.text);
    if (task.completed) {
      const taskItem = taskList.lastElementChild;
      toggleTaskCompletion(taskItem);
    }
  });
}

// Modal functions
function showModal() {
  modal.style.display = 'block';
}

function hideModal() {
  modal.style.display = 'none';
}

closeButton.addEventListener('click', hideModal);

window.addEventListener('click', (event) => {
  if (event.target == modal) {
    hideModal();
  }
});