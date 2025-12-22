<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>ALENCAR-FRETES</title>

  <link rel="manifest" href="manifest.json">
  <meta name="theme-color" content="#1f2937">

  <link rel="stylesheet" href="style.css">
</head>
<body>

  <h1>🛵 ALENCAR-FRETES</h1>

  <label>KM da entrega:</label>
  <input type="number" id="km" placeholder="Ex: 4">

  <button onclick="calcularFrete()">Calcular</button>

  <p id="resultado"></p>

  <script src="script.js"></script>

  <script>
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('service-worker.js');
    }
  </script>

</body>
</html>
