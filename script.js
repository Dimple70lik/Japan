<meta name='viewport' content='width=device-width, initial-scale=1'/><!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Japan Matching</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="game-container">
        <h1>Japan Matching</h1>
        <div id="score">Puan: 0</div>
        <div id="game-board" class="game-board"></div>
        <button id="new-game-button" style="display: none;">Yeni Oyun</button>
    </div>
    <script src="script.js"></script>
</body>
</html><style>body {
    background: linear-gradient(to right, #ff9a9e, #fad0c4);
    font-family: 'Arial', sans-serif;
}

#game-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
}

h1 {
    color: #333;
    font-size: 2em;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

#score {
    font-size: 1.5em;
    color: white;
    background-color: #ff69b4; /* Buton rengi */
    border: none;
    border-radius: 8px; /* Kenar yuvarlama */
    padding: 10px 20px; /* İç boşluk */
    margin-bottom: 20px;
    cursor: default; /* Tıklanamaz gibi göster */
    text-align: center; /* Metni ortala */
    transition: background-color 0.3s; /* Hover geçiş efekti */
}

#score:hover {
    background-color: #ff85c0; /* Hover efekti */
}

.game-board {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 5px; /* Sütunlar arası boşluk */
}

.card {
    background-color: white;
    border: 2px solid #ff69b4;
    border-radius: 8px;
    height: 40px;
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0; /* Kapalı kart için başlangıçta metin görünmesin */
    cursor: pointer;
    transition: 0.3s;
}

.card.show {
    font-size: 24px; /* Açık kartta ikon boyutu */
}</style><script>const cardsArray = [
    '🎋', '🎋', 
    '🏯', '🏯', 
    '🌸', '🌸', 
    '🍣', '🍣', 
    '🎎', '🎎', 
    '🗻', '🗻', 
    '🦋', '🦋', 
    '🎏', '🎏', 
    '🍙', '🍙', 
    '🎶', '🎶', 
    '🗾', '🗾', 
    '🧧', '🧧', 
    '🎊', '🎊',
    '🎌', '🎌',
    '🍡', '🍡',
    '🌊', '🌊',
    '🏮', '🏮',
    '🧚', '🧚',
    '🎈', '🎈',
    '🎍', '🎍',
    '🧧', '🧧',
    '🍥', '🍥',
    '🥢', '🥢',
    '🌺', '🌺',
];

let cardElements = [];
let selectedCards = [];
let score = 0;

function createBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = ''; // Board'u sıfırla
    score = 0; // Puanı sıfırla
    document.getElementById('score').textContent = `Puan: ${score}`; // Puan metnini güncelle
    cardsArray.sort(() => 0.5 - Math.random()); // Kartları karıştır

    cardsArray.forEach((card) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.cardValue = card; // Kart değeri
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
        cardElements.push(cardElement);
    });
}

function flipCard() {
    if (selectedCards.length < 2 && !this.classList.contains('show')) {
        this.classList.add('show');
        this.textContent = this.dataset.cardValue; // Kartı göster

        selectedCards.push(this);

        if (selectedCards.length === 2) {
            setTimeout(checkForMatch, 1000); // Eşleşmeyi kontrol et
        }
    }
}

function checkForMatch() {
    const [firstCard, secondCard] = selectedCards;

    if (firstCard.dataset.cardValue === secondCard.dataset.cardValue) {
        // Eşleşme varsa
        firstCard.remove(); // Kartı kaldır
        secondCard.remove(); // Kartı kaldır
        score += 5; // Puanı artır
        document.getElementById('score').textContent = `Puan: ${score}`;

        // Tüm kartlar eşleşti mi kontrol et
        cardElements = cardElements.filter(card => card !== firstCard && card !== secondCard); // Kaldırılan kartları listeden çıkar

        if (cardElements.length === 0) {
            setTimeout(() => {
                alert('Tebrikler! Tüm kartları eşleştirdiniz!');
                document.getElementById('new-game-button').style.display = 'block'; // Yeni oyun butonunu göster
            }, 500);
        }
    } else {
        // Eşleşme yoksa
        firstCard.classList.remove('show');
        firstCard.textContent = ''; // Kartı gizle
        secondCard.classList.remove('show');
        secondCard.textContent = ''; // Kartı gizle
    }

    selectedCards = []; // Seçilen kartları sıfırla
}

document.getElementById('new-game-button').addEventListener('click', () => {
    cardElements = []; // Kartları sıfırla
    selectedCards = []; // Seçilen kartları sıfırla
    createBoard(); // Yeni oyunu başlat
    document.getElementById('new-game-button').style.display = 'none'; // Butonu gizle
});

// Oyun başlat
createBoard();</script>