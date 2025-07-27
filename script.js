let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  const list = document.getElementById('task-list');
  list.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    if (task.completed) li.classList.add('completed');

    const taskSpan = document.createElement('span');
    taskSpan.textContent = task.text;

    const buttons = document.createElement('div');
    buttons.classList.add('task-buttons');

    const completeBtn = document.createElement('button');
    completeBtn.textContent = '✔';
    completeBtn.classList.add('complete-btn');
    completeBtn.onclick = () => toggleComplete(index);

    const editBtn = document.createElement('button');
    editBtn.textContent = '✏';
    editBtn.classList.add('edit-btn');
    editBtn.onclick = () => editTask(index);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '🗑';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.onclick = () => deleteTask(index);

    buttons.appendChild(completeBtn);
    buttons.appendChild(editBtn);
    buttons.appendChild(deleteBtn);

    li.appendChild(taskSpan);
    li.appendChild(buttons);
    list.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById('task-input');
  const text = input.value.trim();
  if (text === '') return;

  tasks.push({ text, completed: false });
  input.value = '';
  saveTasks();
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const newText = prompt("Edit task:", tasks[index].text);
  if (newText !== null && newText.trim() !== '') {
    tasks[index].text = newText.trim();
    saveTasks();
    renderTasks();
  }
}

function deleteTask(index) {
  if (confirm("Are you sure you want to delete this task?")) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }
}

// Initial load
renderTasks();