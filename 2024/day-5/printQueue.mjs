const test = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13
75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

function atoi(strNum = []) {
    const arrInt = [];
    for (let i = 0; i < strNum.length; i++) {
        arrInt.push(parseInt(strNum[i]));
    }
    return arrInt;
}

function getUpdateOrdering(input = []) {
    const data = {
        pageOrder: {},
        updateSequence: [],
    };

    let i = 0;
    for (; input[i][2] === '|'; i++) {
        let key = input[i].substring(0, 2);
        if (data.pageOrder[key]) {
            data.pageOrder[key].push(parseInt(input[i].substring(3)));
        } else {
            data.pageOrder[key] = []
            data.pageOrder[key].push(parseInt(input[i].substring(3)));
        }
    }
    for (; i < input.length; i++) {
        data.updateSequence.push(atoi(input[i].split(",")));
    }
    return data;
}

function includes(arr = [], value) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === value)
            return true;
    }
    return false;
}

function hasRightOrder(updateSequence = [], pageOrder = {}) {
    for (let i = 1; i < updateSequence.length; i++) {
        let key = updateSequence[i].toString();
        for (let j = 0; j < i; j++) {
            let value = updateSequence[j];
            if (includes(pageOrder[key], value)) {
                return false;
            }
        }
    }
    return true;
}

function getArrayMid(length) {
    return Math.floor(length / 2);
}

function sortPages(updateSequence = [], pageOrder = {}) {
    for (let i = 1; i < updateSequence.length; i++) {
        for (let j = 0; j < i; j++) {
            let tempI = i;
            let tempJ = j;
            while (includes(pageOrder[`${updateSequence[tempI]}`], updateSequence[tempJ]) && tempI > 0) {
                let temp = updateSequence[tempI];
                updateSequence[tempI] = updateSequence[tempJ];
                updateSequence[tempJ] = temp;
                tempI--;
                tempJ--;
            }
        }
    }
}

function calculateMiddleSum(data = {}) {
    let correctMiddleSum = 0;
    let incorrectMiddleSum = 0;
    for (let i = 0; i < data.updateSequence.length; i++) {
        if (hasRightOrder(data.updateSequence[i], data.pageOrder)) {
            let mid = getArrayMid(data.updateSequence[i].length);
            correctMiddleSum += data.updateSequence[i][mid];
        } else {
            let mid = getArrayMid(data.updateSequence[i].length);
            sortPages(data.updateSequence[i], data.pageOrder);
            incorrectMiddleSum += data.updateSequence[i][mid];
        }
    }
    return { 'Q1': correctMiddleSum, 'Q2': incorrectMiddleSum};
}

export default function printQueue(input = "") {
    return calculateMiddleSum(getUpdateOrdering(input.split("\n")));
}

// first answer --> 4135
// second answer --> 5285