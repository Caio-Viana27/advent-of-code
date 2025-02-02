// part two code ----------------------------------------------------------------------------------------------->

export default function diskFragmenter(input) {
    return compactDiskMap(produceDiskMap(input));
}

function fsChecksum(compactedDiskMap) {
    let checksum = 0;
    for (const block of compactedDiskMap) {
        if (block.id === '.') continue;
        for (let i = 0, indexMult = block.start; i < block.size; i++, indexMult++) {
            checksum += indexMult * block.id;
        }
    }
    console.log(checksum);
}

function compactDiskMap(disk) {
    for (let j = disk.memoryMap.length - 1; j > 0; j--) {
        if (disk.memoryMap[j].id === '.') continue;
        for (let i = 0; i < j; i++) {
            if (disk.memoryMap[i].id !== '.') continue;
            if (disk.memoryMap[i].size === disk.memoryMap[j].size) {
                disk.memoryMap[i].id = disk.memoryMap[j].id;
                disk.memoryMap[j].id = '.';
                mergeFreeSpaces(disk, j);
                break;
            }
            else if (disk.memoryMap[i].size >= disk.memoryMap[j].size) {
                const sizeDiff = disk.memoryMap[i].size - disk.memoryMap[j].size;
                const newFreeSpaceStart = disk.memoryMap[i].start + disk.memoryMap[j].size;
                const newFreeSpaceSize = sizeDiff;
                disk.memoryMap[i].id = disk.memoryMap[j].id;
                disk.memoryMap[i].size -= sizeDiff;
                disk.memoryMap[j].id = '.';
                disk.memoryMap.splice(i + 1, 0, {id: '.', start: newFreeSpaceStart, size: newFreeSpaceSize});
                mergeFreeSpaces(disk, ++j);
                break;
            }
        }
    }
    console.log(disk);
    //console.log('00...111...2...333.44.5555.6666.777.888899');
    //console.log('00992111777.44.333....5555.6666.....8888..');
    
    fsChecksum(disk.memoryMap);
    return 'Disk compacted successfully!';
}

function mergeFreeSpaces(disk, freedPosition) {
    const size = disk.memoryMap.length;
    // prev-used + free + end of arr
    if (disk.memoryMap[freedPosition - 1].id !== '.' && freedPosition + 1 >= size) return;
    //  prev-used + free + next-free
    if (disk.memoryMap[freedPosition - 1].id !== '.' && disk.memoryMap[freedPosition + 1].id === '.') {
        disk.memoryMap[freedPosition].size += disk.memoryMap[freedPosition + 1].size;
        disk.memoryMap.splice(freedPosition + 1, 1);
        return;
    }
    // prev-free + free + end of arr
    if (disk.memoryMap[freedPosition - 1].id === '.' && freedPosition + 1 >= size) {
        disk.memoryMap[freedPosition - 1].size += disk.memoryMap[freedPosition].size;
        disk.memoryMap.splice(freedPosition, 1);
        return;
    }
    // prev-free + free + next-used
    if (disk.memoryMap[freedPosition - 1].id === '.' && disk.memoryMap[freedPosition + 1].id !== '.') {
        disk.memoryMap[freedPosition - 1].size += disk.memoryMap[freedPosition].size;
        disk.memoryMap.splice(freedPosition, 1);
        return;
    }
    // prev-free + free + next-free
    if (disk.memoryMap[freedPosition - 1].id === '.' && freedPosition + 1 < size) {
        disk.memoryMap[freedPosition - 1].size += disk.memoryMap[freedPosition].size + disk.memoryMap[freedPosition + 1].size;
        disk.memoryMap.splice(freedPosition, 2);
        return;
    }
}

function produceDiskMap(input) {
    const disk = {
        memoryMap: [],
        start: 0,
    };
    let id = 0;
    for (let i = 0; i < input.length; i++) {
        if (i % 2 == 0) {
            const blockSize = parseInt(input[i]);
            disk.memoryMap.push({id: id, start: disk.start, size: blockSize});
            disk.start += blockSize;
            id++;
        }
        else if (input[i] !== '0') {
            const freeSpaceSize = parseInt(input[i]);
            disk.memoryMap.push({id: '.', start: disk.start, size: freeSpaceSize});
            disk.start += freeSpaceSize;
        }
    }
    return disk;
}

// first problem answer 6323641412437
// Second problem answer 6351801932670

// part one code ----------------------------------------------------------------------------------------------->
/* 
export default function diskFragmenter(input) {
    return compactDiskMap(produceDiskMap(input)).join('');
}

function fsChecksum(compactedDiskMap) {
    let checksum = 0;
    for (let i = 0; compactedDiskMap[i] !== '.'; i++) {
        checksum += i * compactedDiskMap[i];
    }
    console.log(checksum);
}

function compactDiskMap(diskMap) {
    let i = 0, j = diskMap.length - 1;
    while (i < j) {
        while (diskMap[i] !== '.') i++;
        while (diskMap[j] === '.') j--;
        while (i < j && diskMap[i] === '.' && diskMap[j] !== '.') {
            diskMap[i++] = diskMap[j];
            diskMap[j--] = '.';
        }
    }
    fsChecksum(diskMap);

    return diskMap;
}

function produceDiskMap(input) {
    const diskMap = [];
    let id = 0;
    for (let i = 0; i < input.length; i++) {
        if (i % 2 == 0) {
            const blockSize = parseInt(input[i]);
            for (let j = 0; j < blockSize; j++) {
                diskMap.push(id);
            }
            id++;
        }
        else if (input[i] !== '0') {
            const freeSpaceSize = parseInt(input[i]);
            for (let j = 0; j < freeSpaceSize; j++) {
                diskMap.push('.');
            }
        }
    }
    return diskMap;
}
 */