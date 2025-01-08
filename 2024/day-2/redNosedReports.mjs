
export default function calculateUnsafeReports(input) {
    let safe = 0;
    const reports = input.split("\n");

    for (let report of reports) {
        const array = report.split(" ");

        for (let i = 0; i < array.length; i++)
            array[i] = parseInt(array[i]);

        if (sequenceIsValid(array)) {
            safe++;
        } else {
            for (let i = 0; i < array.length; i++) {
                const modifiedLevels = array.slice(0, i).concat(array.slice(i + 1));
                if (sequenceIsValid(modifiedLevels)) {
                    safe++;
                    break;
                }
            }
        }
    }
    return safe;
}

function sequenceIsValid(levels = []) {
    let increasing = true;
    let decreasing = true;

    for (let i = 0; i < levels.length - 1; i++) {
        let diff = levels[i] - levels[i+1];

        if (diffIsNotValid(diff)) return false;
        if (diff > 0) increasing = false;
        if (diff < 0) decreasing = false;
    }
    return increasing || decreasing;
}

function diffIsNotValid(diff) {
    return (diff === 0 || diff > 3 || diff < -3);
}

// first problem answer 516
// second problem answer 561