const arrayCartas = [
    { nombre: 'papas fritas', img: 'imgs/fries.png' },
    { nombre: 'hamburguesa', img: 'imgs/cheeseburger.png' },
    { nombre: 'perrito caliente', img: 'imgs/hotdog.png' },
    { nombre: 'helado', img: 'imgs/ice-cream.png' },
    { nombre: 'batido', img: 'imgs/milkshake.png' },
    { nombre: 'pizza', img: 'imgs/pizza.png' },
    { nombre: 'papas fritas', img: 'imgs/fries.png' },
    { nombre: 'hamburguesa', img: 'imgs/cheeseburger.png' },
    { nombre: 'perrito caliente', img: 'imgs/hotdog.png' },
    { nombre: 'helado', img: 'imgs/ice-cream.png' },
    { nombre: 'batido', img: 'imgs/milkshake.png' },
    { nombre: 'pizza', img: 'imgs/pizza.png' },
];

arrayCartas.sort(() => 0.5 - Math.random());

const mostrarCuadricula = document.querySelector('#cuadricula');
const mostrarResultado = document.querySelector('#resultado');
let cartasElegidas = [];
let idsCartasElegidas = [];
const cartasGanadas = [];

function crearTablero() {
    // Elimina el contenido anterior de la cuadrícula
    mostrarCuadricula.innerHTML = '';

    for (let i = 0; i < arrayCartas.length; i++) {
        const carta = document.createElement('img');
        carta.setAttribute('src', 'imgs/blank.png');
        carta.setAttribute('data-id', i);
        carta.addEventListener('click', voltearCarta);
        mostrarCuadricula.appendChild(carta);
    }
}

function verificarCoincidencia() {
    const cartas = document.querySelectorAll('img');
    const idPrimeraOpcion = idsCartasElegidas[0];
    const idSegundaOpcion = idsCartasElegidas[1];

    if (cartasElegidas[0] === cartasElegidas[1]) {
        cartas[idPrimeraOpcion].setAttribute('src', 'imgs/white.png');
        cartas[idSegundaOpcion].setAttribute('src', 'imgs/white.png');
        cartas[idPrimeraOpcion].removeEventListener('click', voltearCarta);
        cartas[idSegundaOpcion].removeEventListener('click', voltearCarta);
        cartasGanadas.push(cartasElegidas);
        mostrarResultado.textContent = '¡Encontraste una coincidencia!';
    } else {
        cartas[idPrimeraOpcion].setAttribute('src', 'imgs/blank.png');
        cartas[idSegundaOpcion].setAttribute('src', 'imgs/blank.png');
        mostrarResultado.textContent = 'Lo siento, ¡intenta de nuevo!';
    }

    cartasElegidas = [];
    idsCartasElegidas = [];

    mostrarResultado.textContent += ` Coincidencias encontradas: ${cartasGanadas.length}`;

    if (cartasGanadas.length === arrayCartas.length / 2) {
        mostrarResultado.textContent = '¡Felicidades, encontraste todas!';
    }
}

function voltearCarta() {
    const idCarta = this.getAttribute('data-id');
    if (!idsCartasElegidas.includes(idCarta)) {
        cartasElegidas.push(arrayCartas[idCarta].nombre);
        idsCartasElegidas.push(idCarta);
        this.setAttribute('src', arrayCartas[idCarta].img);

        if (cartasElegidas.length === 2) {
            setTimeout(verificarCoincidencia, 500);
        }
    } else {
        mostrarResultado.textContent = '¡Hiciste clic en la misma carta!';
    }
}

function iniciarJuego() {
    let juegoIniciado = false;

    while (!juegoIniciado) {
        const entradaUsuario = prompt('Escribe "comenzar" para iniciar el juego:');
        if (entradaUsuario && entradaUsuario.toLowerCase() === 'comenzar') {
            crearTablero();
            juegoIniciado = true;
        } else {
            alert('Debes escribir "comenzar" para iniciar el juego.');
        }
    }
}

iniciarJuego();
