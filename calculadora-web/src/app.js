console.log("app.js carregado");

const $ = (id) => document.getElementById(id);

function calcular() {
  const a = $("a").value.trim();
  const b = $("b").value.trim();
  const op = $("op").value;
  const msg = $("msg");
  const res = $("res");

  msg.textContent = "";
  res.textContent = "";

  if (a === "" || b === "") {
    msg.textContent = "Preencha os dois números.";
    return;
  }

  const x = Number(a), y = Number(b);
  if (!Number.isFinite(x) || !Number.isFinite(y)) {
    msg.textContent = "Valores inválidos.";
    return;
  }

  if (op === "/" && y === 0) {
    msg.textContent = "Divisão por zero não é permitida.";
    return;
  }

  const ops = { "+": (p,q)=>p+q, "-": (p,q)=>p-q, "*": (p,q)=>p*q, "/": (p,q)=>p/q };
  const out = ops[op](x, y);
  res.textContent = `Resultado: ${out}`;
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = $("calc");
  if (btn) btn.addEventListener("click", calcular);
});
