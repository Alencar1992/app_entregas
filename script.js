let mensagemWhatsApp = "";

function calcularFrete() {
  const km = Number(document.getElementById("km").value);

  const valorPorKm = 1.90;
  const taxaMinima = 5.00;
  const limiteKm = 15;
  const taxaExtraPorKm = 0.50;

  if (!km || km <= 0) {
    alert("Informe a quilometragem da entrega");
    return;
  }

  // Valor base (somente ida) 
  {let valor = km * valorPorKm;
  let aviso = "";
}
  // Regra para km acima de 15
  if (km > limiteKm) {
    const taxaExtra = (km / 2) * taxaExtraPorKm;
    valor += taxaExtra;
    aviso = `🚨 Distância acima de 15 km: aplicada taxa adicional de retorno`;
  }

  // Taxa mínima
  if (valor < taxaMinima) {
    valor = taxaMinima;
    aviso = "⚠️ Aplicada taxa mínima";
  }

  const valorFormatado = valor.toFixed(2).replace(".", ",");

  mensagemWhatsApp =
`Oi 😊

O valor do seu frete ficou em *R$ ${valorFormatado}* 🛵💨

📍 Distância: ${km} km
${aviso ? "ℹ️ " + aviso + "\n" : ""}
📆Quando será a entrega?
👤Quem vai receber?
⌚Qual horario para ser entregue?
⏳Que horas retiro com você?
Obrigado!`;`;

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
