// Simple in-memory task list
let tasks = [];
let nextId = 1;


function getTasks() {
  return tasks;
}


function reset() {
  tasks = [];
  nextId = 1;
}

module.exports = { getTasks, reset };

function addTask(name) {
  if (!name || typeof name !== 'string') {
    throw new Error('Le nom de la tâche est requis');
  }
  
  const trimmedName = name.trim();
  if (trimmedName.length === 0) {
    throw new Error('Le nom ne peut pas être vide');
  }
  
  const task = {
    id: nextId++,
    name: trimmedName,
    done: false
  };
  
  tasks.push(task);
  return task;
}

function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) {
    throw new Error(`Tâche avec l'id ${id} introuvable`);
  }
  task.done = !task.done;
  return task;
}

module.exports = { getTasks, reset, addTask, toggleTask };

