// script.js
// Selecting DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

// Function to add a new task
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return; // Don't add empty tasks

  // Create new list item
  const listItem = document.createElement('li');
  const taskSpan = document.createElement('span');
  taskSpan.textContent = taskText;

  // Toggle completion on click
  taskSpan.addEventListener('click', () => {
    taskSpan.classList.toggle('completed');
  });

  // Create Edit button
  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.className = 'edit';
  editButton.addEventListener('click', () =>
    toggleEditMode(listItem, taskSpan, editButton)
  );

  // Create Remove button
  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  removeButton.className = 'remove';
  removeButton.addEventListener('click', () => {
    taskList.removeChild(listItem);
  });

  listItem.appendChild(taskSpan);
  listItem.appendChild(editButton);
  listItem.appendChild(removeButton);
  taskList.appendChild(listItem);

  taskInput.value = ''; // Clear input field
}

// Function to handle Edit/Save toggle
function toggleEditMode(listItem, taskSpan, editButton) {
  if (editButton.textContent === 'Edit') {
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.value = taskSpan.textContent;
    listItem.replaceChild(editInput, taskSpan);
    editButton.textContent = 'Save';
  } else {
    taskSpan.textContent = listItem.querySelector('input').value;
    listItem.replaceChild(taskSpan, listItem.querySelector('input'));
    editButton.textContent = 'Edit';
  }
}

// Add task on button click
addTaskButton.addEventListener('click', addTask);

// Add task on Enter key press
taskInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
});
