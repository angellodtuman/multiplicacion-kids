
let nivel = 0;
let contador = 0;
let correctas = 0;

function nuevaPregunta() {
  if (nivel > 12) {
    document.getElementById("mensaje").innerText = "¡Felicidades! Terminaste todos los niveles.";
    return;
  }
  const factor = nivel;
  const otro = Math.floor(Math.random() * 13);
  document.getElementById("pregunta").innerText = `${factor} × ${otro} = ?`;
  document.getElementById("pregunta").setAttribute("data-respuesta", factor * otro);
  document.getElementById("explicacion").innerText = explicaciones[nivel]?.[contador] || "";
  document.getElementById("visual").innerText = "🧱 ".repeat(factor) + " × " + "🧱 ".repeat(otro);
  document.getElementById("reto").innerText = `¿Tiene lógica que ${factor} × ${otro} = ${factor * otro + 1}?`;
  document.getElementById("inversa").innerText = `¿Qué número multiplicado por ${factor} da ${factor * otro}?`;
}

function verificar() {
  const respuestaUsuario = parseInt(document.getElementById("respuesta").value);
  const respuestaCorrecta = parseInt(document.getElementById("pregunta").getAttribute("data-respuesta"));
  const mensaje = document.getElementById("mensaje");
  if (isNaN(respuestaUsuario)) {
    mensaje.innerText = "Por favor, ingresa un número.";
    return;
  }
  if (respuestaUsuario === respuestaCorrecta) {
    mensaje.innerText = "¡Correcto! Bien hecho 🎉";
    document.getElementById("sonidoCorrecto").play();
    lanzarConfeti(); // 🎆 Aquí se activa la bombarda visual
    correctas++;
    contador++;
    actualizarProgreso();
    if (contador >= 5) {
      nivel++;
      contador = 0;
      mensaje.innerText += ` ¡Subiste al nivel ${nivel}!`;
    }
    nuevaPregunta();
  } else {
    mensaje.innerText = "Ups, intenta otra vez.";
    document.getElementById("explicacion").innerText = "Pista: " + (explicaciones[nivel]?.[contador] || "Observa los bloques.");
    document.getElementById("sonidoError").play();
  }
  document.getElementById("respuesta").value = "";
}

function actualizarProgreso() {
  const total = (nivel * 5 + contador);
  const progreso = (total / 65) * 100;
  document.getElementById("progreso").style.width = progreso + "%";
  const estrellas = Math.min(5, Math.floor(total / 13));
  document.getElementById("estrellas").innerText = "⭐".repeat(estrellas) + "☆".repeat(5 - estrellas);
}

function lanzarConfeti() {
  confetti({
    particleCount: 120,
    spread: 90,
    origin: { y: 0.6 },
    zIndex: 999
  });
  setTimeout(() => {
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.4, x: 0.5 },
      zIndex: 999
    });
  }, 400);

  const canvas = document.getElementById("confetti-canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const confettis = Array.from({ length: 150 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    r: Math.random() * 6 + 4,
    d: Math.random() * 5 + 5,
    color: `hsl(${Math.random() * 360}, 100%, 50%)`,
    tilt: Math.random() * 10 - 5
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettis.forEach((c) => {
      ctx.beginPath();
      ctx.lineWidth = c.r;
      ctx.strokeStyle = c.color;
      ctx.moveTo(c.x + c.tilt, c.y);
      ctx.lineTo(c.x, c.y + c.tilt + c.d);
      ctx.stroke();
    });
    update();
  }

  function update() {
    confettis.forEach((c) => {
      c.y += c.d;
      c.tilt += Math.random() * 0.5 - 0.25;
      if (c.y > canvas.height) {
        c.y = -10;
        c.x = Math.random() * canvas.width;
      }
    });
  }

  let interval = setInterval(draw, 20);
  setTimeout(() => {
    clearInterval(interval);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, 2000);
}

nuevaPregunta();
