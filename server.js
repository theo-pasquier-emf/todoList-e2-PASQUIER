const express = require("express");
const path = require("path");

const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let nextId = 4;
let tasks = [
  {
    id: 1,
    title: "Planifier la semaine",
    description: "Lister les priorites des prochains jours.",
    completed: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: "Preparer la reunion",
    description: "Rassembler les points a partager avec l'equipe.",
    completed: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    title: "Faire une pause",
    description: "Penser a souffler entre deux taches importantes.",
    completed: false,
    createdAt: new Date().toISOString()
  }
];

app.get("/api/tasks", (_req, res) => {
  const sortedTasks = [...tasks].sort((a, b) => b.id - a.id);
  res.json(sortedTasks);
});

app.post("/api/tasks", (req, res) => {
  const title = typeof req.body.title === "string" ? req.body.title.trim() : "";
  const description =
    typeof req.body.description === "string" ? req.body.description.trim() : "";

  if (!title) {
    return res.status(400).json({ message: "Le titre est obligatoire." });
  }

  const task = {
    id: nextId++,
    title,
    description,
    completed: false,
    createdAt: new Date().toISOString()
  };

  tasks.push(task);
  return res.status(201).json(task);
});

app.patch("/api/tasks/:id", (req, res) => {
  const taskId = Number.parseInt(req.params.id, 10);
  const task = tasks.find((item) => item.id === taskId);

  if (!task) {
    return res.status(404).json({ message: "Tache introuvable." });
  }

  if (typeof req.body.title === "string") {
    const title = req.body.title.trim();
    if (!title) {
      return res.status(400).json({ message: "Le titre ne peut pas etre vide." });
    }
    task.title = title;
  }

  if (typeof req.body.description === "string") {
    task.description = req.body.description.trim();
  }

  if (typeof req.body.completed === "boolean") {
    task.completed = req.body.completed;
  }

  return res.json(task);
});

app.delete("/api/tasks/:id", (req, res) => {
  const taskId = Number.parseInt(req.params.id, 10);
  const initialLength = tasks.length;

  tasks = tasks.filter((item) => item.id !== taskId);

  if (tasks.length === initialLength) {
    return res.status(404).json({ message: "Tache introuvable." });
  }

  return res.status(204).send();
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Serveur disponible sur http://localhost:${PORT}`);
});
