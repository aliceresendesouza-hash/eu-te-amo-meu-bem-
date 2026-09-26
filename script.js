// --- 1. Chuva de Corações em Tons Pastéis ---
const colors = ['#ffb3c1', '#ffc2d1', '#ffe5ec', '#e2afff', '#ffdfba', '#baffc9'];

function createHeart() {
    const container = document.getElementById('hearts-container');
    const heart = document.createElement('div');
    heart.classList.add('heart-fall');
    
    // Ícones variados fofos
    const icons = ['💗', '💖', '🌸', '✨', '💕', '🧸'];
    heart.innerText = icons[Math.floor(Math.random() * icons.length)];
    
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 3 + 's';
    heart.style.color = colors[Math.floor(Math.random() * colors.length)];
    heart.style.fontSize = Math.random() * 15 + 15 + 'px';
    
    container.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 6000);
}

setInterval(createHeart, 400);

// --- 2. Surpresa do Cabeçalho ---
function mostrarSurpresa() {
    const box = document.getElementById('surpresa-box');
    box.classList.toggle('hidden');
}

// --- 3. Música Romântica (Sintetizador Web Audio API) ---
let audioCtx = null;
let isPlaying = false;
let intervalId = null;

function toggleMusic() {
    const btn = document.getElementById('musicBtn');
    
    if (!isPlaying) {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        playMelody();
        btn.innerText = '🔊 Pausar Música';
        isPlaying = true;
    } else {
        clearInterval(intervalId);
        btn.innerText = '🎵 Tocar Música Romântica';
        isPlaying = false;
    }
}

function playMelody() {
    const notes = [261.63, 329.63, 392.00, 523.25, 440.00, 349.23]; // Notas suaves (Dó, Mi, Sol, Dó alto, Lá, Fá)
    let index = 0;

    intervalId = setInterval(() => {
        if (!isPlaying) return;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(notes[index], audioCtx.currentTime);
        
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + 1.2);

        index = (index + 1) % notes.length;
    }, 800);
}

// --- 4. Jogo da Velha do Amor ---
let boardState = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = '❤️';
let gameActive = true;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function makeMove(cell, index) {
    if (boardState[index] !== '' || !gameActive) return;

    boardState[index] = currentPlayer;
    cell.innerText = currentPlayer;

    checkResult();
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        document.getElementById('gameStatus').innerText = `O amor venceu! (${currentPlayer} ganhou) 🎉💋`;
        gameActive = false;
        return;
    }

    if (!boardState.includes('')) {
        document.getElementById('gameStatus').innerText = 'Deu empate! Mas no nosso amor ambos ganham 🥰';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === '❤️' ? '💋' : '❤️';
    document.getElementById('gameStatus').innerText = `Sua vez: ${currentPlayer}`;
}

function resetGame() {
    boardState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = '❤️';
    gameActive = true;
    document.getElementById('gameStatus').innerText = 'Sua vez: ❤️ (Amor)';
    
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.innerText = '');
}

// --- 5. Botões Interativos de Frases ---
const elogios = [
    "Seu sorriso é a minha coisa favorita no mundo todinho! ✨",
    "Você fica incrivelmente lindo até quando está distraído. 😍",
    "Você é o melhor namorado que eu poderia pedir pra vida! 💕",
    "Amo o jeito que você cuida de mim e dos nossos bichinhos! 🐾"
];

const mimoseFrases = [
    "Receba 1000 beijinhos virtuais agora mesmo! 💋💋💋",
    "Sinta-se abraçado bem forte por mim! 🤗",
    "Vale um abraço bem quentinho na próxima vez que nos vermos! 🫂",
    "Você ganhou o prêmio de amor mais fofo do planeta! 🏆❤️"
];

const promessas = [
    "Prometo te amar e te apoiar em todos os momentos! 💍",
    "Prometo cuidar de você e da nossa galerinha de pets para sempre. 🐾❤️",
    "Prometo ser sua parceira de vida e de risadas. ✨",
    "Prometo te fazer a pessoa mais feliz do mundo todos os dias! 💕"
];

function fazerElogio() {
    const random = elogios[Math.floor(Math.random() * elogios.length)];
    document.getElementById('mensagem-interativa').innerText = random;
}

function mimar() {
    const random = mimoseFrases[Math.floor(Math.random() * mimoseFrases.length)];
    document.getElementById('mensagem-interativa').innerText = random;
}

function promessa() {
    const random = promessas[Math.floor(Math.random() * promessas.length)];
    document.getElementById('mensagem-interativa').innerText = random;
}
