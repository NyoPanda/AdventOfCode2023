const events = require('events');
const fs = require('fs');
const readline = require('readline');
const util = require('util');

function getRacePossibilities(time, distance) {
    let minTimeHeld = Math.floor(time / 2 - Math.sqrt(time ** 2 / 4 - distance) + 1)
    let maxTimeHeld = time - minTimeHeld
    return maxTimeHeld - minTimeHeld + 1
}

async function day6() {
    try {
        const rl = readline.createInterface({
            input: fs.createReadStream('input.txt'),
            crlfDelay: Infinity
        });

        const lines = []
        rl.on('line', (line) => lines.push(line))
        .on('close', () => {
            let times = lines[0].split(':')[1].trim().split(/[ ]+/)
            let distances = lines[1].split(':')[1].trim().split(/[ ]+/)
            let result = 1
            for (let i = 0; i < times.length; i++) {
                result *= getRacePossibilities(times[i], distances[i])
            }
            console.log('part1: ' + result)
            
            let result2 = getRacePossibilities(+(times.join('')), +(distances.join('')))
            console.log('part2: ' + result2)
        });
  
        //await events.once(rl, 'close');

        //console.log('result part1: ')
    } catch (err) {
        console.error(err);
    }
}

(async function main() {
    await day6()
})();