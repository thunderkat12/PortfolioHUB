(() => {
  const STORAGE_KEY = 'todo-items-v1';
  const form = document.getElementById('todo-form');
  const input = document.getElementById('todo-input');
  const list = document.getElementById('todo-list');
  const filters = document.querySelectorAll('.filters button');
  const countEl = document.querySelector('.todo .count');
  let currentFilter = 'all';
  let items = [];

  function load() {
    try { items = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { items = []; }
  }
  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch {}
  }

  function leftCount() { return items.filter(i => !i.completed).length; }

  function render() {
    list.innerHTML = '';
    const filtered = items.filter(i => currentFilter === 'all' || (currentFilter === 'active' ? !i.completed : i.completed));
    if (!filtered.length) {
      const empty = document.createElement('li');
      empty.className = 'todo-empty';
      empty.textContent = 'Sem tarefas.';
      list.appendChild(empty);
    } else {
      for (const item of filtered) {
        const li = document.createElement('li');
        li.className = 'todo-item' + (item.completed ? ' completed' : '');
        li.dataset.id = item.id;

        const cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.checked = item.completed;
        cb.setAttribute('aria-label', `Concluir: ${item.title}`);

        const title = document.createElement('span');
        title.className = 'title';
        title.textContent = item.title;

        const del = document.createElement('button');
        del.type = 'button';
        del.textContent = 'Remover';
        del.setAttribute('aria-label', `Remover: ${item.title}`);

        cb.addEventListener('change', () => {
          item.completed = cb.checked;
          save();
          render();
        });
        del.addEventListener('click', () => {
          items = items.filter(i => i.id !== item.id);
          save();
          render();
        });

        li.append(cb, title, del);
        list.appendChild(li);
      }
    }
    countEl.textContent = `${leftCount()} restante(s)`;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = (input.value || '').trim();
    if (!title) return;
    items.push({ id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()), title, completed: false });
    input.value = '';
    save();
    render();
  });

  filters.forEach(btn => btn.addEventListener('click', () => {
    filters.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    currentFilter = btn.dataset.filter;
    render();
  }));

  load();
  render();
})();

