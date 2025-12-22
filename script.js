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

  document.getElementById("resultado").innerHTML =
    `💰 Valor do frete: <strong>R$ ${valor.toFixed(2)}</strong><br>${mensagem}`;
}

