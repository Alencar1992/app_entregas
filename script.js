let mensagemWhatsApp = "";

const VALOR_POR_KM = 1.90;
const TAXA_MINIMA = 5.00;

function calcularFrete() {
  const km = Number(document.getElementById("km").value);

  if (!km || km <= 0) {
    alert("Informe a quilometragem da entrega");
    return;
  }

  let valor = km * VALOR_POR_KM;
  let aviso = "";

  if (valor < TAXA_MINIMA) {
    valor = TAXA_MINIMA;
    aviso = "⚠️ Aplicada taxa mínima";
  }

  const valorFormatado = valor.toFixed(2).replace(".", ",");

  mensagemWhatsApp =
`Olá 😊

O valor do seu frete ficou em *R$ ${valorFormatado}* 🛵

📍 Distância: ${km} km
${aviso}

Qualquer dúvida fico à disposição.`;

  document.getElementById("resultado").innerHTML = `
    💰 <strong>Valor do frete:</strong> R$ ${valorFormatado}<br>
    ${aviso}
  `;
}

function abrirWhatsApp() {
  if (!mensagemWhatsApp) {
    alert("Calcule o frete primeiro");
    return;
  }

  const texto = encodeURIComponent(mensagemWhatsApp);
  window.open(`https://wa.me/?text=${texto}`, "_blank");
}
