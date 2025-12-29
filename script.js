let valorFinal = 0;

// 1. Clientes fixos
const clientesFixos = {
  PriPel: "5511981071671",
  KarlaBrie: "5511968971239",
  Heldir: "5511981053823",
};

// 2. Carrega novos clientes do localStorage (com verificação de erro)
let novosClientes = {};
try {
  const dadosSalvos = localStorage.getItem("meusNovosClientes");
  if (dadosSalvos) {
    novosClientes = JSON.parse(dadosSalvos);
  }
} catch (e) {
  console.error("Erro ao carregar clientes salvos", e);
}

// 3. Função para popular o SELECT com os clientes novos
function carregarClientesNoSelect() {
  const select = document.getElementById("cliente");
  
  // Percorre o objeto de novos clientes e adiciona no HTML
  for (let nome in novosClientes) {
    // Verifica se o cliente já não existe no select (para não duplicar)
    if (!document.querySelector(`option[value="${nome}"]`)) {
      let opt = document.createElement('option');
      opt.value = nome;
      opt.innerHTML = nome;
      select.appendChild(opt);
    }
  }
}

// Chama a função assim que abrir a página
carregarClientesNoSelect();

// 4. Função Corrigida para Salvar
function salvarNovoCliente() {
  const nomeInput = document.getElementById("novoNome");
  const telefoneInput = document.getElementById("novoTelefone");
  
  const nome = nomeInput.value.trim();
  const telefone = telefoneInput.value.trim();

  if (nome === "" || telefone === "") {
    alert("Por favor, preencha nome e telefone.");
    return;
  }

  // Adiciona ao objeto na memória
  novosClientes[nome] = telefone;
  
  // Salva no localStorage (Transforma objeto em texto)
  localStorage.setItem("meusNovosClientes", JSON.stringify(novosClientes));

  alert(`Cliente ${nome} cadastrado com sucesso!`);
  
  // Limpa os campos
  nomeInput.value = "";
  telefoneInput.value = "";

  // Atualiza a lista na tela imediatamente sem precisar de F5
  carregarClientesNoSelect();
}

function calcular() {
  const kmInput = document.getElementById("km");
  const km = parseFloat(kmInput.value);
  const valorKm = 1.90;
  const taxaMinima = 5.00;

  if (isNaN(km) || km <= 0) {
    alert("Insira uma distância válida.");
    return;
  }

  let valor = 0;
  document.getElementById("aviso").innerText = "";

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

  // Combina fixos e novos para pegar o número
  const todosOsContatos = { ...clientesFixos, ...novosClientes };
  const numero = todosOsContatos[clienteSelecionado];

  const mensagem = `🏍️ *ALENCAR FRETES*
👤 Cliente: ${clienteSelecionado}
💰 Valor do frete: R$ ${valorFinal}`;

  navigator.clipboard.writeText(mensagem);
  
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, "_blank");
}
