const taskTitleInput = document.getElementById('taskTitle');
const taskDescInput = document.getElementById('taskDesc');
const addTaskBtn = document.getElementById('addTaskBtn');

document.addEventListener('DOMContentLoaded', fetchTasks);

async function fetchTasks() {
    const response = await fetch('/api/tasks');
    const result = await response.json();
    
    document.querySelectorAll('.task-list').forEach(list => list.innerHTML = '');

    result.data.forEach(task => {
        renderTask(task);
    });
}

function renderTask(task) {
    const column = document.getElementById(task.status).querySelector('.task-list');
    
    const card = document.createElement('div');
    card.className = 'task-card';
    card.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.description || ''}</p>
        <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
    `;
    
    column.appendChild(card);
}

async function deleteTask(id) {
    if (!confirm("Are you sure you want to delete this task?")) return;

    const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        fetchTasks();
    }
}

addTaskBtn.addEventListener('click', async () => {
    const title = taskTitleInput.value;
    const description = taskDescInput.value;

    if (!title) return alert("Please enter a title!");

    const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description })
    });

    if (response.ok) {
        taskTitleInput.value = '';
        taskDescInput.value = '';
        fetchTasks();
    }
});