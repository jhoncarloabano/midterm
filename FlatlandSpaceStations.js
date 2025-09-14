'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the flatlandSpaceStations function below.
function flatlandSpaceStations(n, c) {
    c.sort((a, b) => a - b);

    let maxDistance = c[0];

    for (let i = 0; i < c.length - 1; i++) {
        const distanceBetweenStations = c[i + 1] - c[i];
        const halfDistance = Math.floor(distanceBetweenStations / 2);
        if (halfDistance > maxDistance) {
            maxDistance = halfDistance;
        }
    }

    const distanceToEnd = (n - 1) - c[c.length - 1];
    if (distanceToEnd > maxDistance) {
        maxDistance = distanceToEnd;
    }

    return maxDistance;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nm = readLine().split(' ');

    const n = parseInt(nm[0], 10);

    const m = parseInt(nm[1], 10);

    const c = readLine().split(' ').map(cTemp => parseInt(cTemp, 10));

    let result = flatlandSpaceStations(n, c);

    ws.write(result + "\n");

    ws.end();
}
