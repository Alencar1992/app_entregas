let textoParaCopiar = "";

function calcularFrete() {
  const km = Number(document.getElementById("km").value);
  const valorPorKm = 1.90;
  const taxaMinima = 5.00;

  if (km <= 0 || isNaN(km)) {
    alert("Informe uma quilometragem válida");
    return;
  }

  let valor = km * valorPorKm;
  let mensagem = "";

  if (valor < taxaMinima) {
    valor = taxaMinima;
    mensagem = "⚠️ Aplicada taxa mínima";
  }

  textoParaCopiar =
`🛵 *ALENCAR FRETES*🛵
📍 KM: ${km}
💰 Valor: R$ ${valor.toFixed(2)}
${mensagem}`;

  document.getElementById("resultado").innerHTML = `
    💰 <strong>Valor do frete:</strong> R$ ${valor.toFixed(2)}
    ${mensagem ? `<div class="aviso">${mensagem}</div>` : ""}
  `;

  document.getElementById("msgCopiado").innerText = "";
}

function copiarResultado() {
  if (!textoParaCopiar) {
    alert("Calcule o frete primeiro");
    return;
  }

  navigator.clipboard.writeText(textoParaCopiar).then(() => {
    document.getElementById("msgCopiado").innerText =
      "✅ Copiado! Agora é só colar no WhatsApp";
  });
}
