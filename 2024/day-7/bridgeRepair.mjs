export default function bridgeRepair(input) {
    return getCalculationResult(breakInput(input));
}

const contigenciesTable = [];

function breakInput(input) {
    const data = input.split('\n');
    const calibrationEquation = {};

    for (const str of data) {
        let i = 0;
        while (str[i] !== ':') i++;

        const equation = `${str.substring(0, i)}`;
        calibrationEquation[equation] = [];
        i += 2;

        while (i < str.length) {
            const j = i;
            while (str[i] >= '0' && str[i] <= '9') i++;
            calibrationEquation[equation].push(parseInt(str.substring(j, i)));
            i++;
        }
    }
    return calibrationEquation;
}

function getCalculationResult(calibrationEquation) {
    let result = 0;
    for (const key in calibrationEquation) {
        const numOfOperators = calibrationEquation[key].length - 1;
        if (!contigenciesTable[numOfOperators]) {
            contigenciesTable[numOfOperators] = createContigenciesTable(numOfOperators);
        }
        result += testOperators(calibrationEquation[key], parseInt(key), contigenciesTable[numOfOperators]);
    }
    console.log(result);
    return '';
}

function testOperators(nums, target, table) {
    let result = 0;
    for (let i = 0, j = 0; j < table[i].length; j++) {
        result = 0;
        result += nums[0];
        for (; i < table.length; i++) {
            if (table[i][j] === '+') result += nums[i + 1];
            if (table[i][j] === '*') result *= nums[i + 1];
            if (table[i][j] === '|') result = parseInt(`${result}${nums[i + 1]}`);
        }
        i = 0;
        if (result === target) return result;
    }
    return 0;
}

function createContigenciesTable(size) {
    let contigencies = [];
    let strLength = 3 ** size;
    for (let i = 0; i < size; i++) {
        let str = '';
        while (str.length < 3 ** size) {
            let j = 0;
            while (j < strLength / 3) {str += '+'; j++;}
            j = 0;
            while (j < strLength / 3) {str += '|'; j++;}
            j = 0;
            while (j < strLength / 3) {str += '*'; j++;}
      }
      strLength /= 3;
      contigencies.push(str);
    }
    return contigencies;
}

// first answer 28730327770375
// second answer 424977609625985