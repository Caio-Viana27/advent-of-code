const test =
`MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

//          M M M S X X M A S M
//          M S A M X M S M S A -- 1 2
//          A M X S X M A A M M -- 2 6, 2 7
//          M S A M A S M S M X -- 3 2, 3 4
//          X M A S-A-M X A M M -- X 4 4
//          X X A M M X X A M A
//          S M S M S A S X S S
//          S A X A M A S A A A
//          M A M M M X M M M M
//          M X M X A X M A S X

const TARGET_WORD = "XMAS";
const REVERSED_TARGET_WORD = "SAMX";

function getInputLines(input) {
    const matrix = input.split("\n");
    for (let i = 0; i < matrix.length; i++) {
        matrix[i] = [...matrix[i]];
    }
    return matrix;
}

function getAllLines(input) {
    const matrix = getInputLines(input);
    const lines = [];
    let temp;

    // get horizontal lines
    for (let i = 0; i < matrix.length; i++) {
        lines.push(matrix[i].join(""));
    }
    // get vertical lines
    for (let j = 0; j < matrix[0].length; j++) {
        temp = [];
        for (let i = 0; i < matrix.length; i++) {
            temp.push(matrix[i][j]);
        }
        lines.push(temp.join(""));
    }
    // get main diagonal lines
    for (let i = matrix.length - TARGET_WORD.length; i >= 0; i--) {
        temp = [];
        for (let j = i, k = 0; j < matrix[0].length; k++, j++) {
            temp.push(matrix[k][j]);
        }
        lines.push(temp.join(""));
    }
    for (let i = matrix.length - TARGET_WORD.length; i > 0; i--) {
        temp = [];
        for (let j = 0, k = i; k < matrix[0].length; k++, j++) {
            temp.push(matrix[k][j]);
        }
        lines.push(temp.join(""));
    }
    // get secondary diagonal lines
    for (let i = TARGET_WORD.length - 1; i < matrix.length; i++) {
        temp = [];
        for (let j = 0, k = i; k >= 0; k--, j++) {
            temp.push(matrix[k][j]);
        }
        lines.push(temp.join(""));
    }
    for (let i = matrix.length - TARGET_WORD.length; i > 0; i--) {
        temp = [];
        for (let j = i, k = matrix.length - 1; j < matrix.length; k--, j++) {
            temp.push(matrix[k][j]);
        }
        lines.push(temp.join(""));
    }
    return lines;
}

function numberOfOccurrences(lines = [], TARGET_WORD, REVERSED_TARGET_WORD) {
    let occurrences = 0;
    for (let line of lines) {
        for(let i = 0; i < line.length; i++) {
            if (line.substring(i, i + TARGET_WORD.length) === TARGET_WORD ||
                line.substring(i, i + TARGET_WORD.length) === REVERSED_TARGET_WORD)
                occurrences++;
        }
    }
    return occurrences;
}

function findXMAS(matrix = []) {
    let occurrences = 0;
    for (let i = 1; i < matrix.length - 1; i++) {
        for (let j = 1; j < matrix[i].length - 1; j++) {
            if (((matrix[i-1][j-1] === 'M' && matrix[i][j] === 'A' && matrix[i+1][j+1] === 'S')  ||
                 (matrix[i-1][j-1] === 'S' && matrix[i][j] === 'A' && matrix[i+1][j+1] === 'M')) &&
                ((matrix[i-1][j+1] === 'M' && matrix[i][j] === 'A' && matrix[i+1][j-1] === 'S')  ||
                 (matrix[i-1][j+1] === 'S' && matrix[i][j] === 'A' && matrix[i+1][j-1] === 'M')))
                occurrences++;
        }
    }
    return occurrences;
}

export default function ceresSearch(input) {
    return { 'Q1': numberOfOccurrences(getAllLines(input), TARGET_WORD, REVERSED_TARGET_WORD),
             'Q2': findXMAS(getInputLines(input))};
}

// first problem answer --> 2591
// second problem answer --> 1880