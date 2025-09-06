# To‑Do Web (Node + Express + UI)

> Aplicação simples de tarefas com front-end estático e back-end em Node + Express, salvando em arquivo JSON.

## Como rodar

1) Abra um terminal na pasta raiz do repositório.
2) Entre na pasta do projeto:
   ```bash
   cd todo-web
   ```
3) Instale as dependências:
   ```bash
   npm install
   ```
4) Inicie o servidor (porta padrão 3000):
   ```bash
   npm start
   ```
5) Acesse no navegador:
   - http://localhost:3000

## API
- `GET /api/tasks` → retorna a lista de tarefas.
- `POST /api/tasks` → adiciona uma tarefa. Body JSON: `{ text: string }`.
- `PATCH /api/tasks/:id` → alterna o status `done` da tarefa.
- `DELETE /api/tasks/:id` → remove uma tarefa.

## Estrutura de pastas
```
todo-web/
├─ src/
│  ├─ public/
│  │  ├─ index.html
│  │  ├─ styles.css
│  │  └─ app.js
│  └─ server.js
├─ data/
│  └─ tasks.json
├─ package.json
└─ README.md
```

## Prints (adicione os seus)
- Crie uma pasta `todo-web/docs` e coloque suas capturas de tela, por exemplo:
  - `docs/lista-vazia.png`
  - `docs/criando-tarefa.png`
  - `docs/tarefa-concluida.png`
- Depois, referencie-as aqui no README com:
  ```md
  ![Lista vazia](./docs/lista-vazia.png)
  ![Criando tarefa](./docs/criando-tarefa.png)
  ![Tarefa concluída](./docs/tarefa-concluida.png)
  ```

## Aprendizados
- Como criar um servidor com Express e servir arquivos estáticos.
- Como estruturar endpoints REST e manipular JSON no back-end.
- Persistência simples usando `fs/promises` para ler e escrever em arquivo.
- Integração front/back usando `fetch` e atualização reativa da UI.

## Observações
- O arquivo `data/tasks.json` começa vazio (`[]`) e vai sendo atualizado conforme você usa a aplicação.
- Para ambiente de produção, considere persistência mais robusta (SQLite/Postgres) e tratamento de concorrência.
