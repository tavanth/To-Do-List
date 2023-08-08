const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

taskInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
      addTask(taskText);
      taskInput.value = '';
    }
  }
});

function addTask(taskText) {
  const taskItem = document.createElement('li');
  taskItem.textContent = taskText;
  taskList.appendChild(taskItem);
}
