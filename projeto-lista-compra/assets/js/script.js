// Selecionar os elementos HTML relevantes
const valorInput = document.querySelector('#valor');
const itemInput = document.querySelector('#item');
const valorError = document.querySelector('#valorError');
const resultadoBody = document.querySelector('#resultadoBody');
const btResult = document.querySelector('.btSubmit');

// Variáveis para armazenar os valores
let valorTotal = 0;

// Adicionar eventos de escuta para verificar a validade dos campos ao digitar
valorInput.addEventListener('input', validarCampos);
itemInput.addEventListener('input', validarCampos);

// Função para validar os campos
function validarCampos() {
  const valor = valorInput.value.trim();
  const item = itemInput.value.trim();
  const camposValidos = valor !== '' && !isNaN(valor) && item !== '';

  if (camposValidos) {
    habilitarBotao();
    exibirErro('');
  } else {
    desabilitarBotao();
    exibirErro('Campos inválidos.');
  }
}

// Função para tratar o envio do formulário
function submitForm(e) {
  e.preventDefault();

  const item = itemInput.value;
  const valor = valorInput.value;

  if (valor === '' || item === '') {
    exibirErro('Campos vazios. Insira um número e um item.');
    return;
  }

  const tr = document.createElement('tr');
  tr.classList.add('row-centered');

  const itemCell = document.createElement('td');
  const valorCell = document.createElement('td');
  const totalCell = document.createElement('td');

  itemCell.textContent = item;
  valorCell.textContent = adicionarMoeda(valor);

  valorTotal += Number(valor);
  totalCell.textContent = adicionarMoeda(valorTotal.toString());

  tr.appendChild(itemCell);
  tr.appendChild(valorCell);
  tr.appendChild(totalCell);

  resultadoBody.appendChild(tr);

  itemInput.value = '';
  valorInput.value = '';
  desabilitarBotao();
}

// Função para exibir mensagens de erro
function exibirErro(mensagem) {
  valorError.textContent = mensagem;
}

// Função para habilitar o botão de adicionar
function habilitarBotao() {
  btResult.removeAttribute('disabled');
  btResult.style.background = '#318bff';
}

// Função para desabilitar o botão de adicionar
function desabilitarBotao() {
  btResult.setAttribute('disabled', 'disabled');
  btResult.style.background = '#888888';
}

// Função para formatar o valor com a moeda
function adicionarMoeda(texto) {
  return `${texto} R$`;
}

// Função para gerar o PDF
function gerarPdf() {
  const options = {
    margin: [10, 10, 10, 10],
    filename: "projeto.pdf",
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
  };

  html2pdf().set(options).from(resultadoTotal).save();
}
