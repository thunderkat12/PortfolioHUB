# Calculadora Web

> Projeto simples de calculadora em HTML/CSS/JS com validações amigáveis. Ideal para começar na Web.

## Como rodar

Você pode rodar de duas formas. Escolha a que preferir.

### Opção A) VS Code + Live Server
- Instale a extensão "Live Server" do VS Code.
- Abra a pasta `calculadora-web` no VS Code.
- Clique com o botão direito no arquivo `src/index.html` e selecione `Open with Live Server`.
- O navegador abrirá a página. Faça seus testes!

### Opção B) Python http.server
- Pré-requisito: ter o Python instalado (3.x).
- No terminal, vá para a pasta `calculadora-web/src`:
  ```bash
  cd calculadora-web/src
  python -m http.server 5500
  ```
- Abra `http://localhost:5500` no navegador.

## Funcionalidades
- 2 inputs numéricos.
- Select com operações: `+`, `-`, `*`, `/`.
- Botão "Calcular".
- Validações:
  - Campos obrigatórios.
  - Impede divisão por zero.
  - Mensagens de erro claras e amigáveis.
- Layout simples e responsivo.

## Estrutura de pastas
```
calculadora-web/
├─ src/
│  ├─ index.html
│  ├─ styles.css
│  └─ app.js
└─ README.md
```

## Prints (adicione os seus)
- Crie uma pasta `calculadora-web/docs` e coloque suas capturas de tela, por exemplo:
  - `docs/tela-principal.png`
  - `docs/validacao-erro.png`
- Depois, referencie-as aqui no README com:
  ```md
  ![Tela principal](./docs/tela-principal.png)
  ![Validação de erro](./docs/validacao-erro.png)
  ```

## Aprendizados
- Estrutura básica de um projeto web estático (HTML + CSS + JS).
- Como manipular o DOM e lidar com eventos (`submit`).
- Boas práticas de validação (inputs obrigatórios e regras de negócio como impedir divisão por zero).
- Dicas para deixar o layout mais agradável e legível sem frameworks.

## Observações
- Não há backend: é um projeto 100% estático.
- Para publicar gratuitamente, você pode usar GitHub Pages apontando para a pasta `src`.
