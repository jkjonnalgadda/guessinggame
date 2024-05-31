document.addEventListener("DOMContentLoaded", function() {
    const colors = ['red', 'yellow', 'green', 'orange', 'pink'];
    const numbers = Array.from({ length: 10 }, (_, i) => i + 1);

    let deck = [];
    for (let color of colors) {
        for (let number of numbers) {
            deck.push({ color, number });
        }
    }

    // Shuffle the deck
    deck = deck.sort(() => Math.random() - 0.5);

    // Split the deck between the system and the player
    const halfDeckSize = Math.floor(deck.length / 2);
    let systemDeck = deck.slice(0, halfDeckSize);
    let playerDeck = deck.slice(halfDeckSize);

    const systemCardEl = document.getElementById("system-card");
    const playerHandEl = document.getElementById("player-hand");
    const drawButton = document.getElementById("draw-button");
    const messageEl = document.getElementById("message");

    function drawCard(deck) {
        return deck.length > 0 ? deck.pop() : null;
    }

    function renderCard(card) {
        const cardEl = document.createElement("div");
        cardEl.className = `card ${card.color}`;
        cardEl.textContent = card.number;
        return cardEl;
    }

    function startGame() {
        systemCardEl.innerHTML = '';
        playerHandEl.innerHTML = '';
        messageEl.textContent = '';

        const systemCard = drawCard(systemDeck);
        systemCardEl.appendChild(renderCard(systemCard));

        playerDeck.forEach(card => {
            const cardEl = renderCard(card);
            cardEl.addEventListener("click", function() {
                if (card.color === systemCard.color || card.number === systemCard.number) {
                    messageEl.textContent = "You win this round!";
                    systemDeck = systemDeck.concat(playerDeck.splice(playerDeck.indexOf(card), 1));
                    if (systemDeck.length > 0) {
                        const newSystemCard = drawCard(systemDeck);
                        systemCardEl.innerHTML = '';
                        systemCardEl.appendChild(renderCard(newSystemCard));
                    }
                } else {
                    messageEl.textContent = "No match, try again!";
                }
                if (playerDeck.length === 0 || systemDeck.length === 0) {
                    endGame();
                }
                playerHandEl.removeChild(cardEl);
            });
            playerHandEl.appendChild(cardEl);
        });

        drawButton.addEventListener("click", function() {
            const newSystemCard = drawCard(systemDeck);
            if (newSystemCard) {
                systemCardEl.innerHTML = '';
                systemCardEl.appendChild(renderCard(newSystemCard));
            } else {
                endGame();
            }
        });
    }

    function endGame() {
        if (playerDeck.length === 0) {
            messageEl.textContent = "Player wins the game!";
        } else if (systemDeck.length === 0) {
            messageEl.textContent = "System wins the game!";
        }
        drawButton.disabled = true;
    }

    startGame();
});
 