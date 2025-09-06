// Calculadora Web - lógica principal
// Objetivo: ler os inputs, validar os casos, realizar o cálculo e exibir mensagens amigáveis.

(function () {
  const form = document.getElementById('calc-form');
  const num1El = document.getElementById('num1');
  const num2El = document.getElementById('num2');
  const opEl = document.getElementById('operation');
  const errorEl = document.getElementById('error');
  const resultEl = document.getElementById('result');

  function clearMessages() {
    errorEl.textContent = '';
    resultEl.textContent = '';
  }

  function parseNumber(value) {
    // Converte string para número (float). Retorna NaN se não for válido.
    return Number(value);
  }

  function validateInputs(n1, n2, op) {
    // Regras de validação:
    // - Ambos os campos são obrigatórios e precisam ser números.
    // - Divisão por zero não é permitida.
    if (Number.isNaN(n1) || Number.isNaN(n2)) {
      return 'Preencha os dois números corretamente.';
    }
    if (op === '/' && n2 === 0) {
      return 'Divisão por zero não é permitida. Informe um divisor diferente de 0.';
    }
    return null; // sem erros
  }

  function calculate(n1, n2, op) {
    switch (op) {
      case '+':
        return n1 + n2;
      case '-':
        return n1 - n2;
      case '*':
        return n1 * n2;
      case '/':
        return n1 / n2;
      default:
        throw new Error('Operação inválida');
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearMessages();

    const n1 = parseNumber(num1El.value);
    const n2 = parseNumber(num2El.value);
    const op = opEl.value;

    const validationError = validateInputs(n1, n2, op);
    if (validationError) {
      errorEl.textContent = validationError;
      return;
    }

    try {
      const result = calculate(n1, n2, op);
      // Exibir com no máx 6 casas se necessário
      const pretty = Number.isFinite(result) ? Number(result.toFixed(6)).toString() : String(result);
      resultEl.textContent = `Resultado: ${pretty}`;
    } catch (err) {
      errorEl.textContent = err.message || 'Ocorreu um erro ao calcular.';
    }
  });
})();

