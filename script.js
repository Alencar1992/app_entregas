let valorFinal = 0;

// 1. Clientes Fixos (Estes não podem ser excluídos pelo botão)
const clientesFixos = {
    "PriPel": "5511981071671",
    "Karla Brie": "5511968971239",
    "Heldir": "5511981053823"
};

// 2. Carrega clientes novos do localStorage
let novosClientes = JSON.parse(localStorage.getItem("meusNovosClientes")) || {};

// Função para atualizar o Select e a Lista de Edição
function atualizarInterface() {
    const select = document.getElementById("cliente");
    const listaGere = document.getElementById("listaGerenciamento");

    // Limpa tudo antes de reconstruir
    select.innerHTML = '<option value="">Selecione a cliente</option>';
    listaGere.innerHTML = "";

    // Junta fixos e novos em um só lugar para facilitar
    const todos = { ...clientesFixos, ...novosClientes };

    for (let nome in todos) {
        // Adiciona no SELECT
        let opt = document.createElement('option');
        opt.value = nome;
        opt.innerHTML = nome;
        select.appendChild(opt);

        // Se o cliente for um dos "Novos", adiciona botões de Editar e Excluir
        if (novosClientes[nome]) {
            let li = document.createElement('li');
            li.style.padding = "5px 0";
            li.style.borderBottom = "1px solid #eee";
            li.innerHTML = `
                <span>${nome}</span>
                <div style="float: right">
                    <button onclick="prepararEdicao('${nome}')" style="background:none; border:none; cursor:pointer;">✏️</button>
                    <button onclick="excluirCliente('${nome}')" style="background:none; border:none; cursor:pointer;">❌</button>
                </div>
            `;
            listaGere.appendChild(li);
        }
    }
}

// 3. Salvar ou Editar
function salvarNovoCliente() {
    const nome = document.getElementById("novoNome").value.trim();
    const fone = document.getElementById("novoTelefone").value.trim();

    if (!nome || !fone) {
        alert("Preencha nome e telefone!");
        return;
    }

    // Se tentar salvar com nome de um fixo, avisa
    if (clientesFixos[nome]) {
        alert("Este nome pertence a um cliente fixo e não pode ser alterado.");
        return;
    }

    novosClientes[nome] = fone;
    localStorage.setItem("meusNovosClientes", JSON.stringify(novosClientes));
    
    document.getElementById("novoNome").value = "";
    document.getElementById("novoTelefone").value = "";
    
    atualizarInterface();
}

// 4. Preparar Edição (Puxa os dados para os campos)
function prepararEdicao(nome) {
    document.getElementById("novoNome").value = nome;
    document.getElementById("novoTelefone").value = novosClientes[nome];
    document.getElementById("novoNome").focus();
}

// 5. Excluir
function excluirCliente(nome) {
    if (confirm(`Excluir ${nome}?`)) {
        delete novosClientes[nome];
        localStorage.setItem("meusNovosClientes", JSON.stringify(novosClientes));
        atualizarInterface();
    }
}

// Funções de Cálculo e WhatsApp permanecem as mesmas
function calcular() {
    const km = parseFloat(document.getElementById("km").value);
    const valorKm = 1.90;
    const taxaMinima = 5.00;
    let valor = 0;

    if (isNaN(km)) return;

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
    } else {
        document.getElementById("aviso").innerText = "";
    }

    valorFinal = valor.toFixed(2);
    document.getElementById("resultado").innerText = `💰 Valor do frete: R$ ${valorFinal}`;
}

function whatsapp() {
    if (valorFinal === 0) return alert("Calcule o frete!");
    const nome = document.getElementById("cliente").value;
    if (!nome) return alert("Selecione o cliente!");

    const todos = { ...clientesFixos, ...novosClientes };
    const numero = todos[nome];
    const mensagem = `🏍️ *ALENCAR FRETES*\n👤 Cliente: ${nome}\n💰 Valor do frete: R$ ${valorFinal}`;

    navigator.clipboard.writeText(mensagem);
    window.open(`https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`, "_blank");
}

// Inicia a lista ao carregar a página
atualizarInterface();
