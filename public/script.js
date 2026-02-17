const taskTitleInput = document.getElementById('taskTitle');
const taskDescInput = document.getElementById('taskDesc');
const addTaskBtn = document.getElementById('addTaskBtn');

const modal = document.getElementById('taskModal');
const openModalBtn = document.getElementById('openModalBtn');
const closeBtn = document.querySelector('.close-btn');

document.addEventListener('DOMContentLoaded', fetchTasks);

openModalBtn.onclick = () => {
    modal.style.display = "block";
    taskTitleInput.focus(); 
};

closeBtn.onclick = () => {
    modal.style.display = "none";
};

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

const columns = document.querySelectorAll('.column');
columns.forEach(column => {
    column.addEventListener('dragover', e => {
        e.preventDefault(); 
    });

    column.addEventListener('drop', async (e) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData('text/plain');
        const newStatus = column.id; 

        await updateTaskStatus(taskId, newStatus);
    });
});


async function fetchTasks() {
    const response = await fetch('/api/tasks');
    const result = await response.json();
    
    document.querySelectorAll('.task-list').forEach(list => list.innerHTML = '');
    
    result.data.forEach(task => renderTask(task));
}

function renderTask(task) {
    const column = document.getElementById(task.status).querySelector('.task-list');
    const card = document.createElement('div');
    card.className = 'task-card';
    card.draggable = true;

    card.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text/plain', task.id);
        card.classList.add('dragging');
    });

    card.addEventListener('dragend', () => {
        card.classList.remove('dragging');
    });

    card.innerHTML = `
        <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
        <h3>${task.title}</h3>
        <p>${task.description || ''}</p>
    `;
    column.appendChild(card);
}

async function updateTaskStatus(id, newStatus) {
    const response = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
    });

    if (response.ok) {
        fetchTasks();
    }
}

async function deleteTask(id) {
    if (!confirm("Are you sure you want to delete this task?")) return;
    const response = await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
    if (response.ok) fetchTasks();
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
        modal.style.display = "none";
        fetchTasks();
    }
});