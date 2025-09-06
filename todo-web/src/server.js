// Servidor Node + Express para To‑Do Web
// Endpoints: GET/POST/PATCH/DELETE /api/tasks
// Persistência simples em data/tasks.json usando fs/promises

const express = require('express');
const path = require('path');
const fs = require('fs/promises');

const app = express();
const PORT = process.env.PORT || 3000;

// Arquivo de persistência (caminho relativo ao projeto)
const DATA_DIR = path.join(__dirname, '..', 'data');
const DATA_FILE = path.join(DATA_DIR, 'tasks.json');

app.use(express.json());

// Servir o front-end estático (src/public)
app.use(express.static(path.join(__dirname, 'public')));

// Utilitário: garante que a pasta data existe
async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

// Carrega tarefas do arquivo (se não existir, retorna [])
async function loadTasks() {
  try {
    await ensureDataDir();
    const raw = await fs.readFile(DATA_FILE, 'utf8');
    const tasks = JSON.parse(raw);
    if (!Array.isArray(tasks)) return [];
    return tasks;
  } catch (err) {
    // Se o arquivo não existir ou estiver inválido, começamos com uma lista vazia
    return [];
  }
}

// Salva tarefas no arquivo, com indentação para facilitar leitura
async function saveTasks(tasks) {
  await ensureDataDir();
  const data = JSON.stringify(tasks, null, 2);
  await fs.writeFile(DATA_FILE, data, 'utf8');
}

// Gera ID simples (alternativa ao UUID sem dependências externas)
function genId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

// GET /api/tasks -> retorna lista
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await loadTasks();
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Falha ao carregar tarefas.' });
  }
});

// POST /api/tasks -> adiciona { id, text, done:false }
app.post('/api/tasks', async (req, res) => {
  try {
    const { text } = req.body || {};
    const trimmed = (text || '').trim();
    if (!trimmed) {
      return res.status(400).json({ error: 'Texto da tarefa é obrigatório.' });
    }
    const tasks = await loadTasks();
    const task = { id: genId(), text: trimmed, done: false };
    tasks.push(task);
    await saveTasks(tasks);
    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Falha ao adicionar tarefa.' });
  }
});

// PATCH /api/tasks/:id -> alterna done
app.patch('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const tasks = await loadTasks();
    const idx = tasks.findIndex((t) => t.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Tarefa não encontrada.' });
    tasks[idx].done = !tasks[idx].done;
    await saveTasks(tasks);
    res.json(tasks[idx]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Falha ao alternar tarefa.' });
  }
});

// DELETE /api/tasks/:id -> remove
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const tasks = await loadTasks();
    const exists = tasks.some((t) => t.id === id);
    if (!exists) return res.status(404).json({ error: 'Tarefa não encontrada.' });
    const filtered = tasks.filter((t) => t.id !== id);
    await saveTasks(filtered);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Falha ao remover tarefa.' });
  }
});

app.listen(PORT, () => {
  console.log(`To‑Do Web rodando em http://localhost:${PORT}`);
});

