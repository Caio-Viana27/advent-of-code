
function createObjectLists(input) {
    const formatedInput = input.replaceAll("\n", "").split(" ");
    const lists = {right: [], left: []};

    for (let i = 0, r = 0, l = 0; i < formatedInput.length; i++) {
        if (i % 2 === 0) {
            lists.right[r++] = parseInt(formatedInput[i]);
        }
        else lists.left[l++] = parseInt(formatedInput[i]);
    }
    return lists;
}

function calculateDistance(input) {
    const lists = createObjectLists(input);

    lists.right.sort((x,y) => x-y);
    lists.left.sort((x,y) => x-y);

    let totalDistance = 0;
    for (let i = 0; i < lists.right.length; i++) {
        let distance = lists.right[i] - lists.left[i];
        distance < 0 ? distance *= -1 : distance;
        totalDistance += distance;
    }
    return totalDistance;
}

function calculateSimilarity(input) {
    const list = createObjectLists(input);
    const occurrencesRight = {};
    const occurrencesLeft = {};

    for (let num of list.right) {
        let property = num.toString();
        occurrencesRight[property] = (occurrencesRight[property] || 0) + num;
    }
    for (let num of list.left) {
        let property = num.toString();
        occurrencesLeft[property] = (occurrencesLeft[property] || 0) + 1;
    }

    let similarityScore = 0;
    for (let key in occurrencesRight) {
        if (occurrencesLeft[key] !== undefined)
            similarityScore += occurrencesRight[key] * occurrencesLeft[key];
    }
    return similarityScore;
}

export default function historianHysteria(input) {
    return {'Q1': calculateDistance(input), 'Q2': calculateSimilarity(input)};
}

// Answer first problem === 2970687
// Answer second problem === 23963899