let currentCardIndex = 0;
const cards = document.querySelectorAll('.card');
const totalCards = cards.length;

function showCard(index) {
    cards.forEach((card, i) => {
        card.classList.remove('active');
        if (i === index) {
            card.classList.add('active');
        }
    });
}

function rotateCards() {
    currentCardIndex = (currentCardIndex + 1) % totalCards;
    showCard(currentCardIndex);
}

// Initialize the first card
showCard(currentCardIndex);

// Rotate cards every 4 seconds
setInterval(rotateCards, 4000);
