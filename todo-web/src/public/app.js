// Front-end To‑Do Web
// Funções: carregar lista, adicionar, alternar concluída, remover.

(function () {
  const API = {
    base: '/api/tasks',
    list: () => fetch('/api/tasks').then(r => r.json()),
    add: (text) => fetch('/api/tasks', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text }) }).then(r => r.json()),
    toggle: (id) => fetch(`/api/tasks/${id}`, { method: 'PATCH' }).then(r => r.json()),
    remove: (id) => fetch(`/api/tasks/${id}`, { method: 'DELETE' }).then(r => r.json()),
  };

  const form = document.getElementById('new-task-form');
  const input = document.getElementById('task-input');
  const list = document.getElementById('task-list');
  const feedback = document.getElementById('feedback');

  function setFeedback(msg) {
    feedback.textContent = msg || '';
  }

  function el(tag, props = {}, ...children) {
    const node = document.createElement(tag);
    Object.assign(node, props);
    children.forEach((c) => (typeof c === 'string' ? node.appendChild(document.createTextNode(c)) : c && node.appendChild(c)));
    return node;
  }

  function render(tasks) {
    list.innerHTML = '';
    if (!tasks || tasks.length === 0) {
      setFeedback('Nenhuma tarefa por aqui. Que tal criar uma?');
      return;
    }
    setFeedback('');
    tasks.forEach((t) => {
      const text = el('p', { className: `task-text ${t.done ? 'done' : ''}`, textContent: t.text });
      const toggleBtn = el('button', { className: 'btn btn-toggle', type: 'button', title: t.done ? 'Desfazer' : 'Concluir' }, t.done ? 'Desfazer' : 'Concluir');
      const removeBtn = el('button', { className: 'btn btn-remove', type: 'button', title: 'Remover' }, 'Remover');

      toggleBtn.addEventListener('click', async () => {
        try {
          await API.toggle(t.id);
          await load();
        } catch (err) {
          alert('Falha ao alternar tarefa.');
          console.error(err);
        }
      });
      removeBtn.addEventListener('click', async () => {
        try {
          await API.remove(t.id);
          await load();
        } catch (err) {
          alert('Falha ao remover tarefa.');
          console.error(err);
        }
      });

      const item = el('li', { className: 'task-item' }, text, toggleBtn, removeBtn);
      list.appendChild(item);
    });
  }

  async function load() {
    try {
      const tasks = await API.list();
      render(tasks);
    } catch (err) {
      setFeedback('Erro ao carregar tarefas. Confira se o servidor está rodando.');
      console.error(err);
    }
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    try {
      await API.add(text);
      input.value = '';
      await load();
    } catch (err) {
      alert('Falha ao adicionar tarefa.');
      console.error(err);
    }
  });

  // Inicializa a lista quando a página carrega
  load();
})();

