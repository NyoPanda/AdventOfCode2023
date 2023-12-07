const events = require('events');
const fs = require('fs');
const readline = require('readline');

function getHand(cards, hasJoker = false) {
    hand = [...cards]
    hand = hand.map(char => {
        char = char.replace('T', 10)
        char = hasJoker ? char.replace('J', 1) : char.replace('J', 11)
        char = char.replace('Q', 12)
        char = char.replace('K', 13)
        char = char.replace('A', 14)
        return char
    });
    return hand
}

Object.defineProperties(Array.prototype, {
    count: {
        value: function(value) {
            return this.filter(x => x==value).length;
        }
    }
});

function getStrength(cards, hasJoker) {
    jokers = 0
    if (hasJoker) {
        jokers = cards.count(1)
        cards = cards.filter(c => c != 1)
    }
    count = cards.map(c => [...cards].count(c))
    if (count.includes(5) || hasJoker && jokers == 5)
        return 7 // five of a kind
    if (count.includes(4))
        return 6 + jokers // four of a kind
    if (count.includes(3) && count.includes(2))
        return 5 // full house
    if (count.includes(3)) // three of a kind
        return 4 + (hasJoker ? jokers + 1 : 0)
    if (count.includes(2) && count.count(2) == 4) // two pair
        return 3 + jokers * 2
    if (count.includes(2)) { // one pair
        if (hasJoker) {
            if (jokers == 1)
                return 4 // three of a kind
            if (jokers == 2)
                return 6 // four of a kind
            if (jokers == 3)
                return 7 // five of a kind
        }
        return 2 // no joker
    }
    if (hasJoker) {
        if (jokers == 1)
            return 2 // one pair
        if (jokers == 2)
            return 4 // three of a kind
        if (jokers == 3)
            return 6 // four of a kind
        if (jokers == 4)
            return 7 // five of a kind
    }
    return 1 // high card
}

function compareHands(hand1, hand2, hasJoker = false) {
    strength1 = getStrength(hand1.cards, hasJoker)
    strength2 = getStrength(hand2.cards, hasJoker)
    if (strength1 == strength2) {
        for (let i = 0; i < hand1.cards.length; i++) {
            card1 = +(hand1.cards[i])
            card2 = +(hand2.cards[i])
            if (card1 == card2)
                continue
            if (card1 > card2) {
                strength1 += 1
                break
            }
            if (card2 > card1) {
                strength2 += 1
                break
            }
        }
    }
    return strength1 - strength2
}

async function day7() {
    try {
        const rl = readline.createInterface({
            input: fs.createReadStream('input.txt'),
            crlfDelay: Infinity
        });

        const hands = []
        rl.on('line', (line) => {
            splitLine = line.split(' ')
            hands.push({cards: splitLine[0], bid: +(splitLine[1])})
        })
        .on('close', () => {
            // part1
            hands1 = [...hands]
            hands1 = hands1.map(h => {return {cards: getHand(h.cards), bid: h.bid}})
            hands1.sort(compareHands)
            let result = 0
            for (let i = 0; i < hands1.length; i++) {
                result += (i + 1) * +(hands1[i].bid)
            }
            console.log(result)

            //part2
            console.log('part2')
            hands2 = [...hands]
            hands2 = hands2.map(h => {return {cards: getHand(h.cards, true), bid: h.bid}})
            hands2.sort((a, b) => compareHands(a, b, true))
            //console.log(hands2)
            result = 0
            for (let i = 0; i < hands2.length; i++) {
                result += (i + 1) * +(hands2[i].bid)
            }
            console.log(result)
        });
    } catch (err) {
        console.error(err);
    }
}

(async function main() {
    await day7()
})();