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

function alternate(s) {
    let maxLength = 0;
    
    const uniqueChars = [...new Set(s)];
    
    for (let i = 0; i < uniqueChars.length; i++) {
        for (let j = i + 1; j < uniqueChars.length; j++) {
            const char1 = uniqueChars[i];
            const char2 = uniqueChars[j];
            
            let tempString = '';
            for (const char of s) {
                if (char === char1 || char === char2) {
                    tempString += char;
                }
            }
            
            let isAlternating = true;
            for (let k = 0; k < tempString.length - 1; k++) {
                if (tempString[k] === tempString[k + 1]) {
                    isAlternating = false;
                    break;
                }
            }
            
            if (isAlternating) {
                maxLength = Math.max(maxLength, tempString.length);
            }
        }
    }
    
    return maxLength;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const l = parseInt(readLine().trim(), 10);

    const s = readLine();

    const result = alternate(s);

    ws.write(result + '\n');

    ws.end();
}
