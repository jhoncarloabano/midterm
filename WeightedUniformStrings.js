'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}


function weightedUniformStrings(s, queries) {
    const possibleWeights = new Set();
    let currentWeight = 0;
    
    for (let i = 0; i < s.length; i++) {
        if (i > 0 && s[i] === s[i-1]) {
            currentWeight += s.charCodeAt(i) - 'a'.charCodeAt(0) + 1;
        } else {
            currentWeight = s.charCodeAt(i) - 'a'.charCodeAt(0) + 1;
        }
        possibleWeights.add(currentWeight);
    }
    
    const results = [];
    for (const query of queries) {
        if (possibleWeights.has(query)) {
            results.push("Yes");
        } else {
            results.push("No");
        }
    }
    
    return results;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    const queriesCount = parseInt(readLine().trim(), 10);

    let queries = [];

    for (let i = 0; i < queriesCount; i++) {
        const queriesItem = parseInt(readLine().trim(), 10);
        queries.push(queriesItem);
    }

    const result = weightedUniformStrings(s, queries);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
