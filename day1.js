const events = require('events');
const fs = require('fs');
const readline = require('readline');

async function part1() {
    try {
        const rl = readline.createInterface({
            input: fs.createReadStream('input.txt'),
            crlfDelay: Infinity
        });
  
        numbers = []
        rl.on('line', (line) => {
            line = line.replace(/[^0-9]/g, '')
            first = line.charAt(0)
            last = line.charAt(line.length - 1)
            numbers.push(parseInt(first + last))
        });
  
        await events.once(rl, 'close');
        result = numbers.reduce((a, b) => a + b)
        console.log('result part1: ' + result)
    } catch (err) {
        console.error(err);
    }
}

function isNumber(str) {
    return /^\d+$/.test(str)
}

const numberstrings = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
async function part2() {
    try {
        const rl = readline.createInterface({
            input: fs.createReadStream('input2.txt'),
            crlfDelay: Infinity
        });
  
        numbers = []
        rl.on('line', (line) => {
            numbersInLine = []
            for (i = 0; i < line.length; i++) {
                char = line.charAt(i)
                if (isNumber(char)) {
                    numbersInLine.push(char)
                } else {
                    found = false
                    for (j = 0; j < numberstrings.length; j++) {
                        curr = numberstrings[j]
                        if (curr == line.substring(i, i + curr.length)) {
                            numbersInLine.push(j + 1)
                            break
                        }
                    }
                }
            }

            first = numbersInLine[0]
            last = numbersInLine.pop()
            numbers.push(parseInt('' + first + last))
        });
  
        await events.once(rl, 'close');
        result = numbers.reduce((a, b) => a + b)
        console.log('result part2: ' + result)
    } catch (err) {
        console.error(err);
    }
}

(async function main() {
    await part1()
    await part2()
})();