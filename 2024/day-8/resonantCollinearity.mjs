import { constants } from "node:perf_hooks";

export default function resonantCollinearity(input) {
    return countAntinodes(input);
}

function countAntinodes(input) {
    const cityMap = input.split('\n');
    const antennas = getAntennas(cityMap);
    const size = cityMap.length;
    const uniquePoints = new Set();

    for (const frequency in antennas) {
        for (let i = 0; i < antennas[frequency].length - 1; i++) {
            for (let j = i + 1; j < antennas[frequency].length; j++) {
                const antinodes = antinodePositions(antennas[frequency][i], antennas[frequency][j], size);
                antinodes.forEach(position => {
                    uniquePoints.add(position);
                });
            }
        }
    }
    console.log(uniquePoints.size);
    return '';
}

const pointNotValid = (size, point) => {
    return point.i < 0 || point.i >= size || point.j < 0 || point.j >= size;
}

const antinodePositions = (antennaA, antennaB, size) => {
    const antinodes = [];

    if (antennaA.j < antennaB.j) {
        const diff = {
            i: (antennaB.i - antennaA.i),
            j: (antennaB.j - antennaA.j),
        };
        let currentPoint = {
            i: antennaA.i,
            j: antennaA.j,
        };
        while (!pointNotValid(size, currentPoint)) {
            antinodes.push(`${currentPoint.i},${currentPoint.j}`);
            currentPoint.i -= diff.i;
            currentPoint.j -= diff.j;
        }
        currentPoint = {
            i: antennaB.i,
            j: antennaB.j,
        };
        while (!pointNotValid(size, currentPoint)) {
            antinodes.push(`${currentPoint.i},${currentPoint.j}`);
            currentPoint.i += diff.i;
            currentPoint.j += diff.j;
        }
    }
    else {
        const diff = {
            i: (antennaB.i - antennaA.i),
            j: (antennaA.j - antennaB.j),
        };
        let currentPoint = {
            i: antennaA.i,
            j: antennaA.j,
        };
        while (!pointNotValid(size, currentPoint)) {
            antinodes.push(`${currentPoint.i},${currentPoint.j}`);
            currentPoint.i -= diff.i;
            currentPoint.j += diff.j;
        }
        currentPoint = {
            i: antennaB.i,
            j: antennaB.j,
        };
        while (!pointNotValid(size, currentPoint)) {
            antinodes.push(`${currentPoint.i},${currentPoint.j}`);
            currentPoint.i += diff.i;
            currentPoint.j -= diff.j;
        }
    }
    return antinodes;
}

const getAntennas = (cityMap) => {
    const antennas = {};
    for (let i = 0; i < cityMap.length; i++) {
        for (let j = 0; j < cityMap[i].length; j++) {
            const key = cityMap[i][j];
            if (key === '.') continue;
            if (antennas[key]) {
                antennas[key].push({i: i, j: j});
            }
            else {
                antennas[key] = [{i: i, j: j}]
            }
        }
    }
    return antennas;
}

// first answer is 371
// second answer is 1229