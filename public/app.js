const taskForm = document.querySelector("#taskForm");
const taskList = document.querySelector("#taskList");
const feedback = document.querySelector("#feedback");
const totalTasks = document.querySelector("#totalTasks");
const completedTasks = document.querySelector("#completedTasks");
const taskTemplate = document.querySelector("#taskItemTemplate");

let tasks = [];

async function request(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json"
    },
    ...options
  });

  if (!response.ok) {
    let message = "Une erreur est survenue.";

    try {
      const payload = await response.json();
      if (payload.message) {
        message = payload.message;
      }
    } catch {
      // Ignore parsing errors and keep the default message.
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

function setFeedback(message, type = "") {
  feedback.textContent = message;
  feedback.className = "feedback";

  if (type) {
    feedback.classList.add(type);
  }
}

function updateStats() {
  totalTasks.textContent = String(tasks.length);
  completedTasks.textContent = String(tasks.filter((task) => task.completed).length);
}

function renderTasks() {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    const emptyState = document.createElement("p");
    emptyState.className = "empty-state";
    emptyState.textContent =
      "Aucune tache pour le moment. Ajoutez-en une pour lancer votre suivi.";
    taskList.append(emptyState);
    updateStats();
    return;
  }

  for (const task of tasks) {
    const fragment = taskTemplate.content.cloneNode(true);
    const card = fragment.querySelector(".task-card");
    const checkbox = fragment.querySelector('input[type="checkbox"]');
    const title = fragment.querySelector("h3");
    const description = fragment.querySelector(".task-card__description");
    const status = fragment.querySelector(".task-card__status");
    const deleteButton = fragment.querySelector(".delete-button");

    card.dataset.id = String(task.id);
    card.classList.toggle("is-completed", task.completed);
    checkbox.checked = task.completed;
    title.textContent = task.title;
    description.textContent = task.description || "Aucune description";
    status.textContent = task.completed ? "Terminee" : "En cours";

    checkbox.addEventListener("change", async () => {
      await toggleTask(task.id, checkbox.checked);
    });

    deleteButton.addEventListener("click", async () => {
      await deleteTask(task.id);
    });

    taskList.append(fragment);
  }

  updateStats();
}

async function loadTasks() {
  try {
    tasks = await request("/api/tasks");
    renderTasks();
    setFeedback("Les taches sont a jour.");
  } catch (error) {
    setFeedback(error.message, "error");
  }
}

async function createTask(event) {
  event.preventDefault();

  const formData = new FormData(taskForm);
  const payload = {
    title: String(formData.get("title") || "").trim(),
    description: String(formData.get("description") || "").trim()
  };

  try {
    const task = await request("/api/tasks", {
      method: "POST",
      body: JSON.stringify(payload)
    });

    tasks = [task, ...tasks];
    renderTasks();
    taskForm.reset();
    setFeedback("La tache a ete ajoutee.", "success");
  } catch (error) {
    setFeedback(error.message, "error");
  }
}

async function toggleTask(id, completed) {
  try {
    const updatedTask = await request(`/api/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ completed })
    });

    tasks = tasks.map((task) => (task.id === id ? updatedTask : task));
    renderTasks();
    setFeedback("Le statut de la tache a ete mis a jour.", "success");
  } catch (error) {
    setFeedback(error.message, "error");
    await loadTasks();
  }
}

async function deleteTask(id) {
  try {
    await request(`/api/tasks/${id}`, {
      method: "DELETE"
    });

    tasks = tasks.filter((task) => task.id !== id);
    renderTasks();
    setFeedback("La tache a ete supprimee.", "success");
  } catch (error) {
    setFeedback(error.message, "error");
  }
}

taskForm.addEventListener("submit", createTask);
loadTasks();
