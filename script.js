let mensagemWhatsApp = "";

function calcularFrete() {
  const km = Number(document.getElementById("km").value);
  const valorPorKm = 1.90;
  const taxaMinima = 5.00;

  if (!km || km <= 0) {
    alert("Informe a quilometragem da entrega");
    return;
  }

  let valor = km * valorPorKm;
  let aviso = "";

  if (valor < taxaMinima) {
    valor = taxaMinima;
    aviso = "⚠️ Aplicada taxa mínima";
  }

  const valorFormatado = valor.toFixed(2).replace(".", ",");

  mensagemWhatsApp =
`Olá 😊

O valor do seu frete ficou em *R$ ${valorFormatado}* 🛵💨

📆Quando será a entrega?
👤Quem vai receber?
⌚Qual horario para ser entregue?
⏳Que horas retiro com você?
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
