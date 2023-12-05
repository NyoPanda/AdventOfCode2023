const events = require('events');
const fs = require('fs');
const readline = require('readline');
const util = require('util');

function isPossible(game, red, green, blue) {
    return (game['red'] == undefined || game['red'] <= red)
    && (game['green'] == undefined || game['green'] <= green)
    && (game['blue'] == undefined || game['blue'] <= blue)
}

async function part1() {
    try {
        const rl = readline.createInterface({
            input: fs.createReadStream('input.txt'),
            crlfDelay: Infinity
        });
  
        games = []
        rl.on('line', (line) => {
            game = line.split(':')[1]
            rounds = game.split(';')
            maxPerColor = {}
            for (const round of rounds) {
                balls = round.replace(/\s/g, '').split(',')
                for (const ball of balls) {
                    color = ball.replace(/[0-9]/g, '')
                    count = +(ball.replace(/[^0-9]/g, ''))
                    if (maxPerColor[color] == undefined || maxPerColor[color] < count) {
                        maxPerColor[color] = count
                    }
                }
            }
            games.push(maxPerColor)
        });
  
        await events.once(rl, 'close');

        // result for 12 red, 13 green, 14 blue:
        sum = 0
        for (i = 0; i < games.length; i++) {
            game = games[i]
            if (isPossible(game, 12, 13, 14)) {
               // console.log(i + 1)
               // console.log(util.inspect(game, {showHidden: false, depth: null, colors: true}))
                sum += i + 1
            }
        }
        console.log('result part1: ' + sum)
    } catch (err) {
        console.error(err);
    }
}

function getPower(game) {
    return (game['red'] != undefined ? game['red'] : 1)
        * (game['green'] != undefined ? game['green'] : 1)
        * (game['blue'] != undefined ? game['blue'] : 1)
}

async function part2() {
    try {
        const rl = readline.createInterface({
            input: fs.createReadStream('input.txt'),
            crlfDelay: Infinity
        });
  
        powers = []
        rl.on('line', (line) => {
            game = line.split(':')[1]
            rounds = game.split(';')
            maxPerColor = {}
            for (const round of rounds) {
                balls = round.replace(/\s/g, '').split(',')
                for (const ball of balls) {
                    color = ball.replace(/[0-9]/g, '')
                    count = +(ball.replace(/[^0-9]/g, ''))
                    if (maxPerColor[color] == undefined || maxPerColor[color] < count) {
                        maxPerColor[color] = count
                    }
                }
            }
            powers.push(getPower(maxPerColor))
        });
  
        await events.once(rl, 'close');
        
        console.log('result part2: ' + powers.reduce((a, b) => a + b))
    } catch (err) {
        console.error(err);
    }
}

(async function main() {
    await part1()
    await part2()
})();