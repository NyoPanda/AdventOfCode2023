const fs = require('fs');
const { type } = require('os');
const readline = require('readline');
const lcm = require('compute-lcm')

Object.defineProperties(Array.prototype, {
    count: {
        value: function(value) {
            return this.filter(x => x==value).length;
        }
    }
});

function getStation(stationLine) {
    station = stationLine.replace(' (', '').replace(')', '').split(', ')
    return {
        left: station[0],
        right: station[1]
    }
}

async function day8() {
    try {
        const rl = readline.createInterface({
            input: fs.createReadStream('input.txt'),
            crlfDelay: Infinity
        });

        instructions = []
        stations = new Map() // <String, {left, right}>
        startStations = []
        rl.on('line', (line) => {
            if (line.trim().length == 0) {
                return
            }
            if (instructions.length == 0) {
                instructions = line.split('')
            } else {
                splitLine = line.split('=')
                stationName = splitLine[0].trim()
                stations.set(stationName, getStation(splitLine[1]))
                if (stationName.endsWith('A'))
                    startStations.push(stationName)
            }
        })
        .on('close', () => {
            steps = 0
            reachedGoal = false
            station = stations.get('AAA')
            /*for (i = 0; !reachedGoal; i++) {
                steps++
                i = i == instructions.length ? 0 : i
                direction = instructions[i]
                if (direction == 'L')
                    destination = station.left
                else
                    destination = station.right
                if (destination.endsWith('ZZZ'))
                    reachedGoal = true
                station = stations.get(destination)
            }
            console.log('part1:', steps)*/


            currStations = startStations
            allSteps = []
            for (j = 0; j < currStations.length; j++) {
                steps = 0
                reachedGoal = false
                station = stations.get(currStations[j])
                for (i = 0; !reachedGoal; i++) {
                    steps++
                    i = i == instructions.length ? 0 : i
                    direction = instructions[i]
                    if (direction == 'L')
                        destination = station.left
                    else
                        destination = station.right
                    if (destination.endsWith('Z'))
                        reachedGoal = true
                    station = stations.get(destination)
                }
                allSteps.push(steps)
            }

            console.log('part2:', lcm(...allSteps))
        });
    } catch (err) {
        console.error(err);
    }
}

(async function main() {
    await day8()
})();