import fs from 'node:fs';
import express from 'express';
import historianHysteria from '../2024/day-1/historianHysteria.mjs';
import calculateUnsafeReports from '../2024/day-2/redNosedReports.mjs';
import searchCorruptedMemory from '../2024/day-3/mullItOver.mjs';
import ceresSearch from '../2024/day-4/ceresSearch.mjs';
import printQueue from '../2024/day-5/printQueue.mjs';
import guardGallivant from '../2024/day-6/guardGallivant.mjs';
import bridgeRepair from '../2024/day-7/bridgeRepair.mjs';
import resonantCollinearity from '../2024/day-8/resonantCollinearity.mjs';

const PORT = 3000;
const app = express();

app.use(express.static('../christmasTree'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/christmasTree/index.html');
    res.end();
});

fs.readFile('../2024/day-8/input.txt', 'utf-8', (err, input) => {
    if (err) {
        console.log('Error opening the file');
        return;
    }
    console.time('time');
    const output = resonantCollinearity(input);
    console.timeEnd('time');
    fs.writeFile('../2024/day-8/output.txt', output, err => {
        if (err) {
          console.error('Error writing file');
          return;
        }
    });
});

app.listen(PORT, () => {
    console.log(`server is running on localhost:${PORT}`);
});