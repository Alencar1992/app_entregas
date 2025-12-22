let valorFinal = 0;

function calcular() {
  const km = parseFloat(document.getElementById("km").value);
  const valorKm = 1.90;
  const taxaMinima = 5.00;

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
  document.getElementById("resultado").innerText =
    `💰 Valor do frete: R$ ${valorFinal}`;
}

function whatsapp() {
  if (valorFinal === 0) {
    alert("Calcule o frete antes de enviar.");
    return;
  }

  const mensagem = `🏍️ *ALENCAR FRETES*\n\n💰 Valor do frete: R$ ${valorFinal}`;

  // copia automaticamente
  navigator.clipboard.writeText(mensagem);

  // abre o WhatsApp
  const url = `https://wa.me/?text=${encodeURIComponent(mensagem)}`;
  window.open(url, "_blank");
}
