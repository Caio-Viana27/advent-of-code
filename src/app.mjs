import fs from 'node:fs';
import express from 'express';
import historianHysteria from '../2024/day-1/historianHysteria.mjs';
import calculateUnsafeReports from '../2024/day-2/redNosedReports.mjs';
import searchCorruptedMemory from '../2024/day-3/mullItOver.mjs';
import ceresSearch from '../2024/day-4/ceresSearch.mjs';
import printQueue from '../2024/day-5/printQueue.mjs';

const PORT = 3000;
const app = express();

app.use(express.static('../christmasTree'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/christmasTree/index.html');
    res.end();
});

fs.readFile('../2024/day-5/input.txt', 'utf-8', (err, input) => {
    if (err) {
        console.log('error opening the file');
        return;
    } else {
        //console.log('day 1 ', historianHysteria(input));
        //console.log('day 2 ', calculateUnsafeReports(input));
        //console.log('day 3 ', searchCorruptedMemory(input));
        //console.log('day 4 ', ceresSearch(input));
        console.log('day 5 ', printQueue(input));
    }
});

app.listen(PORT, () => {
    console.log(`server is running on localhost:${PORT}`);
});