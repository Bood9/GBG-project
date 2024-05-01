const game = {
    deck: [],
    players: {
        player: [],
        dealer: []
    },
    cards: [
        { value: '2', suit: 'hearts', image: '/cards/2.png' },
        { value: '3', suit: 'hearts', image: '/cards/3.png' },
        { value: '4', suit: 'hearts', image: '/cards/4.png' },
        { value: '5', suit: 'hearts', image: '/cards/5.png' },
        { value: '6', suit: 'hearts', image: '/cards/6.png' },
        { value: '7', suit: 'hearts', image: '/cards/7.png' },
        { value: '8', suit: 'hearts', image: '/cards/8.png' },
        { value: '9', suit: 'hearts', image: '/cards/9.png' },
        { value: '10', suit: 'hearts', image: '/cards/10.png' },
        { value: 'J', suit: 'hearts', image: '/cards/j.png' },
        { value: 'Q', suit: 'hearts', image: '/cards/q.png' },
        { value: 'K', suit: 'hearts', image: '/cards/k.png' },
        { value: 'A', suit: 'hearts', image: '/cards/A.png' }
        // Добавьте другие карты при необходимости
    ],

    initialize() {
        this.createDeck();
        this.shuffleDeck();
    },

    createDeck() {
        // Создаем колоду карт на основе данных
        for (let cardData of this.cards) {
            this.deck.push({
                value: cardData.value,
                suit: cardData.suit,
                image: cardData.image
            });
        }
    },

    shuffleDeck() {
        // Перемешиваем колоду карт
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    },

    dealInitialCards() {
        // Раздаем начальные карты игроку и дилеру
        for (let i = 0; i < 2; i++) {
            this.players.player.push(this.deck.pop());
            this.players.dealer.push(this.deck.pop());
        }
    },

    hit(player) {
        // Даем дополнительную карту игроку
        player.push(this.deck.pop());
    },

    calculateHandValue(hand) {
        // Вычисляем сумму очков на руке
        let sum = 0;
        let hasAce = false;
        for (let card of hand) {
            if (card.value === 'A') {
                hasAce = true;
            }
            if (card.value === 'J' || card.value === 'Q' || card.value === 'K') {
                sum += 10;
            } else if (card.value !== 'A') {
                sum += parseInt(card.value);
            }
        }
        if (hasAce) {
            if (sum + 11 <= 21) {
                sum += 11;
            } else {
                sum += 1;
            }
        }
        return sum;
    },

    checkBlackjack(hand) {
        // Проверяем, есть ли блэкджек на руке
        if (hand.length === 2) {
            const values = hand.map(card => card.value);
            if (values.includes('A') && (values.includes('10') || values.includes('J') || values.includes('Q') || values.includes('K'))) {
                return true;
            }
        }
        return false;
    },

    checkBust(hand) {
        // Проверяем, перебор у игрока
        return this.calculateHandValue(hand) > 21;
    },

    dealerPlay() {
        // Ход дилера
        while (this.calculateHandValue(this.players.dealer) < 17) {
            this.hit(this.players.dealer);
        }
    },

    determineWinner() {
        // Определяем победителя игры
        const playerValue = this.calculateHandValue(this.players.player);
        const dealerValue = this.calculateHandValue(this.players.dealer);

        if (playerValue > 21) {
            return 'dealer';
        } else if (dealerValue > 21 || playerValue > dealerValue) {
            return 'player';
        } else if (playerValue === dealerValue) {
            return 'tie';
        } else {
            return 'dealer';
        }
    },

    // Другие функции и логика игры...

    startGame() {
        this.initialize();
        this.dealInitialCards();
        // Добавьте здесь логику начала игры после инициализации и раздачи карт
    }
};

// Для начала игры вызовите метод startGame()
game.startGame();
