let objetivo;

const inputJugador = document.querySelector('#human-guess');
const mostrarRonda = document.querySelector('#round-number');
const mostrarComputadora = document.querySelector('#computer-guess');
const puntajeJugador = document.querySelector('#human-score');
const puntajeComputadora = document.querySelector('#computer-score');
const mostrarObjetivo = document.querySelector('#target-number');
const resultadoComputadora = document.querySelector('#computer-wins');

const botonAdivinar = document.querySelector('#guess');
const botonSiguiente = document.querySelector('#next-round');

botonAdivinar.addEventListener('click', jugarRonda);
botonSiguiente.addEventListener('click', iniciarSiguienteRonda);

function jugarRonda() {
  objetivo = generateTarget();
  const intentoJugador = parseInt(inputJugador.value, 10);
  const intentoComputadora = Math.floor(Math.random() * 10);

  mostrarComputadora.textContent = intentoComputadora;
  mostrarObjetivo.textContent = objetivo;

  const ganaJugador = compareGuesses(intentoJugador, intentoComputadora, objetivo);
  const ganador = ganaJugador ? 'human' : 'computer';

  updateScore(ganador);

  if (ganaJugador) {
    botonAdivinar.textContent = 'You Win!!!!!';
    botonAdivinar.classList.toggle('winning-text');
  } else {
    resultadoComputadora.textContent = 'Computer Wins!!!';
  }

  puntajeJugador.textContent = humanScore;
  puntajeComputadora.textContent = computerScore;

  botonAdivinar.disabled = true;
  botonSiguiente.disabled = false;
}

function iniciarSiguienteRonda() {
  advanceRound();
  mostrarRonda.textContent = currentRoundNumber;

  botonSiguiente.disabled = true;
  botonAdivinar.disabled = false;

  mostrarObjetivo.textContent = '?';
  botonAdivinar.textContent = 'Make a Guess';
  inputJugador.value = '';
  mostrarComputadora.textContent = '?';
  resultadoComputadora.textContent = '';
  botonAdivinar.classList.remove('winning-text');
}

const botonIncrementar = document.querySelector('#add');
const botonDisminuir = document.querySelector('#subtract');

botonIncrementar.addEventListener('click', () => {
  const nuevoValor = parseInt(inputJugador.value || 0) + 1;
  inputJugador.value = nuevoValor;
  validarValor(nuevoValor);
});

botonDisminuir.addEventListener('click', () => {
  const nuevoValor = parseInt(inputJugador.value || 0) - 1;
  inputJugador.value = nuevoValor;
  validarValor(nuevoValor);
});

function validarValor(valor) {
  if (valor > 0 && valor <= 9) {
    botonDisminuir.disabled = false;
    botonIncrementar.disabled = false;
  } else if (valor > 9) {
    botonIncrementar.disabled = true;
  } else if (valor <= 0) {
    botonDisminuir.disabled = true;
  }
}

inputJugador.addEventListener('input', (evento) => {
  const valor = parseInt(evento.target.value || 0);
  validarValor(valor);
});
