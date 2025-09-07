# PortfolioHUB

Portfólio responsivo, acessível e organizado por páginas, com componentes reutilizáveis (header/footer), SEO básico e mini‑apps didáticos.

## Estrutura

```
PortfolioHUB/
  index.html
  sobre.html
  projetos.html
  contato.html
  styles.css
  robots.txt
  sitemap.txt
  Portifolio.pdf
  /components/
    header.html
    footer.html
    components-loader.js
  /assets/
    /images/
    /icons/
      favicon.svg
  /apps/
    index.html
    /todo/
      index.html
      app.js
      styles.css
    /conversor/
      index.html
      app.js
      styles.css
    /pomodoro/
      index.html
      app.js
      styles.css
  /calculadora-web/
    index.html
    /src/
      main.js
      styles.css
```

## Desenvolvimento

- Recomendado usar um servidor local (ex.: VS Code Live Server) para que a importação de componentes via `fetch` funcione.
- Abra `index.html` (Home) para navegar.

## Componentização

- `components/header.html` e `components/footer.html` são injetados em runtime por `components/components-loader.js`.
- Em cada página HTML, inclua:
  ```html
  <div id="app-header"></div>
  ...conteúdo...
  <div id="app-footer"></div>
  <script src="/components/components-loader.js" data-root="."></script>
  ```
  Em páginas em subpastas (ex.: `apps/todo`), use `data-root="../.."`.

## Acessibilidade

- Navegação por teclado, foco visível (`:focus-visible`).
- ARIA nos botões e feedbacks `aria-live` em formulários e listas.
- Contraste AA com temas claro/escuro (`[data-theme]` + toggle no header, persistência em `localStorage`).

## SEO

- Metatags por página (`title`, `description`, Open Graph, `canonical`).
- `robots.txt` e `sitemap.txt` incluídos (atualize a URL `https://example.com/`).

## Apps

- Calculadora Web: operações básicas com validações (em `/calculadora-web`).
- To‑Do: adicionar, concluir, remover e filtrar; persistência local.
- Conversor: BRL↔USD (taxa fixa exemplo), °C↔°F, m↔km.
- Pomodoro: 25/5 min, play/pause/reset e contagem de ciclos (localStorage).

## Próximos passos (sugestões)

- Melhorar a Calculadora com grid de botões, histórico (10 operações) e suporte a teclado completo.
- Otimizar imagens em `/assets/images` usando `.webp` e `loading="lazy"` em todas as páginas.
- Ajustar `canonical`, `robots.txt` e `sitemap.txt` para a URL final (ex.: GitHub Pages).
- Marcar link ativo do menu conforme mais rotas/apps forem adicionadas.


