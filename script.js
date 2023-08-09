
// List color picker (ex: have a little menu that pops up that has little circlular colors to pick from)


const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const clearBtn =document.getElementById('clear');


// Adding lists when text is entered
taskInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
      addTask(taskText);
      taskInput.value = '';
    }
  }
});

// Actual function to add list from text
function addTask(taskText) {
  const taskItem = document.createElement('li');
  taskItem.classList.add('bump-element');
// Adds a date const
  const creationDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long', 
    day: 'numeric',
  });

// Takes the date const and adds html to display the date next to a listed item
  taskItem.innerHTML = `
  <span>${taskText}</span>
  <span class="creation-date"> ${creationDate}</span>
`;

// click to add strike class to listed items
  taskItem.addEventListener('click', function () {
    taskItem.classList.toggle('completed');
    saveTasksToLocalStorage();
    });

// double click to remove list item
    taskItem.addEventListener('dblclick', function () {
      taskList.removeChild(taskItem);
      saveTasksToLocalStorage();
    });

// Clear all button, I did that on my own :)
// Add prompt on comeup 
const popupContainer = document.getElementById('popupContainer');
const confirmDeleteBtn = document.getElementById('confirmDelete');
const cancelDeleteBtn = document.getElementById('cancelDelete');

    clearBtn.addEventListener('click', () => {
      popupContainer.style.display = 'flex';
    });
    
    confirmDeleteBtn.addEventListener('click', () => {
      while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild)
      }
      saveTasksToLocalStorage();
      popupContainer.style.display = 'none';
    });

    cancelDeleteBtn.addEventListener('click', () => {
      popupContainer.style.display = 'none';
    });

// Append new text to the list 
    taskList.appendChild(taskItem);
    saveTasksToLocalStorage();
}


// Save tasks to local Storage 
function saveTasksToLocalStorage() {
  const tasks = Array.from(taskList.children).map(taskItem => ({
    text: taskItem.querySelector('span:first-child').textContent,
    completed: taskItem.classList.contains('completed'),
  }));

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    const tasks = JSON.parse(savedTasks);
    tasks.forEach(task => {
      addTask(task.text);
      const lastAddedTask = taskList.lastElementChild;
      if (task.completed) {
        lastAddedTask.classList.add('completed');
      }
    });
  }
}

// Load tasks from local storage when the page is loaded
window.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);
