let mensagemWhatsApp = "";

function calcularFrete() {
  const km = Number(document.getElementById("km").value);
  const valorPorKm = 1.90;
  const taxaMinima = 5.00;
  const limiteKm = 15;

  if (!km || km <= 0) {
    alert("Informe a quilometragem da entrega");
    return;
  }

  // Valor base (somente ida)
  let valor = km * valorPorKm;
  let aviso = "";

  // Regra da taxa adicional parcial de volta
  if (km > limiteKm) {
    const taxaAdicional = (km / 2) * valorPorKm;
    valor += taxaAdicional;
    aviso = "🚨 Distância acima de 15km: aplicada taxa adicional parcial de retorno";
  }

  // Taxa mínima
  if (valor < taxaMinima) {
    valor = taxaMinima;
    aviso = "⚠️ Aplicada taxa mínima";
  }

  const valorFormatado = valor.toFixed(2).replace(".", ",");

  mensagemWhatsApp =
`Olá 😊

O valor do seu frete ficou em *R$ ${valorFormatado}* 🛵💨

📍 Distância: ${km} km
${aviso ? "ℹ️ " + aviso + "\n" : ""}
Qualquer dúvida fico à disposição.
Obrigado!`;

  document.getElementById("resultado").innerHTML = `
    💰 <strong>Valor do frete:</strong> R$ ${valorFormatado}
    ${aviso ? `<div class="aviso">${aviso}</div>` : ""}
  `;
}

function copiarResultado() {
  if (!mensagemWhatsApp) {
    alert("Calcule o frete primeiro");
    return;
  }

  navigator.clipboard.writeText(mensagemWhatsApp).then(() => {
    alert("Mensagem copiada! Agora é só colar no WhatsApp 📲");
  });
}
