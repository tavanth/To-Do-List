// Things I want to add
// Clear all list button
// List color picker (ex: have a little menu that pops up that has little circlular colors to pick from)
// Save local data base still 
// Add some cute cats to the bg lmao

const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

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
// Adds a date const
  const creationDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long', 
    day: 'numeric',
  });

  const taskData = {
    text: taskText,
    completed: false,
    createdDate: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  };

// Takes the date const and adds html to display the date next to a listed item
  taskItem.innerHTML = `
  <span>${taskText}</span>
  <span class="creation-date"> ${creationDate}</span>
`;

// click to add strike class to listed items
  taskItem.addEventListener('click', function () {
    taskItem.classList.toggle('completed');  
    });

// double click to remove list item
    taskItem.addEventListener('dblclick', function () {
      taskList.removeChild(taskItem);
    });

    taskList.appendChild(taskItem);
}