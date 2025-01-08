const test = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";

export default function searchCorruptedMemory(input) {
    let sum = 0;
    let enabled = true;

    input = input.replaceAll("\n", "");
    for (let i = 0; i < input.length; i++) {
        if (input.substring(i, i + 4) === "do()") enabled = true;
        if (input.substring(i, i + 7) === "don't()") enabled = false;
        if (input.substring(i, i + 4) === "mul(") {
            let j = i + 4;
            let firstNum = "";
            for (; input[j] >= '0' && input[j] <= '9'; j++) firstNum += input[j];
            j++;
            let secondNum = "";
            for (; input[j] >= '0' && input[j] <= '9'; j++) secondNum += input[j];
            i = j;
            if (input[j] !== ')' || !enabled) continue;
            sum += parseInt(firstNum) * parseInt(secondNum);
        }
    }
    return sum;
}

// first problem answer --> 184122457
// second problem answer --> 107862689