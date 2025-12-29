let valorFinal = 0;

// 1. Clientes fixos (Sempre aparecem)
const clientesFixos = {
  "PriPel": "5511981071671",
  "Karla Brie": "5511968971239",
  "Heldir": "5511981053823",
};

// 2. Carrega clientes novos salvos no navegador (ou cria vazio se não houver)
let novosClientes = JSON.parse(localStorage.getItem("meusNovosClientes")) || {};

// 3. Função para você cadastrar novos clientes via console ou botão
function cadastrarNovoCliente(nome, telefone) {
  novosClientes[nome] = telefone;
  localStorage.setItem("meusNovosClientes", JSON.stringify(novosClientes));
  alert(`Cliente ${nome} cadastrado com sucesso!`);
  // Opcional: recarregar a página para atualizar o <select> se você tiver um gerador de opções
  location.reload(); 
}

function calcular() {
  const km = parseFloat(document.getElementById("km").value);
  const valorKm = 1.90;
  const taxaMinima = 5.00;

  let valor = 0;
  document.getElementById("aviso").innerText = "";

  if (isNaN(km)) {
    alert("Por favor, insira a quilometragem.");
    return;
  }

  if (km <= 15) {
    valor = km * valorKm;
  } else {
    const base = 15 * valorKm;
    const extra = (km - 15) * (0.5 * valorKm);
    valor = base + extra;
  }

  if (valor < taxaMinima) {
    valor = taxaMinima;
    document.getElementById("aviso").innerText = "⚠️ Taxa mínima aplicada";
  }

  valorFinal = valor.toFixed(2);
  document.getElementById("resultado").innerText = `💰 Valor do frete: R$ ${valorFinal}`;
}

function whatsapp() {
  if (valorFinal === 0) {
    alert("Calcule o frete antes de enviar.");
    return;
  }

  const clienteSelecionado = document.getElementById("cliente").value;

  if (!clienteSelecionado) {
    alert("Selecione a cliente.");
    return;
  }

  // 4. Junta as duas listas para buscar o número correto
  const todosClientes = { ...clientesFixos, ...novosClientes };
  const numero = todosClientes[clienteSelecionado];

  if (!numero) {
    alert("Número não encontrado para este cliente.");
    return;
  }

  const mensagem = `🏍️ *ALENCAR FRETES*
👤 Cliente: ${clienteSelecionado}
💰 Valor do frete: R$ ${valorFinal}`;

  // Copia automaticamente
  navigator.clipboard.writeText(mensagem);

  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, "_blank");
}
