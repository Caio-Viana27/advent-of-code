export default function guardGallivant(input) {
    return getUniquePositions(buildLabMap(input));
}

function buildLabMap(input) {
    const map = input.split('\n').map(row => [...row]);
    return map;
}

const direction = [
    {dx:  0, dy:-1}, // up
    {dx: +1, dy: 0}, // right
    {dx:  0, dy: 1}, // down
    {dx: -1, dy: 0}, // left
];

function getUniquePositions(map) {
    const positions = new Set();
    const guard = findGuardPosition(map);

    let current = 0;
    while (true) {
        let y = guard.y + direction[current].dy;
        let x = guard.x + direction[current].dx;

        if (y >= map.length || y < 0 || x >= map[y].length || x < 0) {
            break;
        }
        if (map[y][x] === '#') {
            current = (current + 1) % 4;
        }
        else {
            if(foundLoop(map, guard, current)) {
                if (positions.add(`${y},${x}`)) {
                    map[y][x] = 'O';
                }
            }
            guard.y = y;
            guard.x = x;
        }
    }
    console.log(positions.size);
    return createMap(map);
}

function foundLoop(map, initialPosition, prev) {
    const visitedPositions = new Set();
    const guard = {
        y: initialPosition.y,
        x: initialPosition.x,
    };
    visitedPositions.add(`${initialPosition.y},${initialPosition.x},${prev}`);

    let current = (prev + 1) % 4;
    while (true) {
        let y = guard.y + direction[current].dy;
        let x = guard.x + direction[current].dx;

        const state = `${y},${x},${current}`;
        if (visitedPositions.has(state)) {
            return true;
        }
        
        if (y >= map.length || y < 0 || x >= map[y].length || x < 0) {
            return false;
        }
        if (map[y][x] === '#') {
            visitedPositions.add(state);
            current = (current + 1) % 4;
        }
        else {
            guard.y = y;
            guard.x = x;
        }
    }
}

function findGuardPosition(map) {

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] === '^') {
                return {y: y, x: x};
            }
        }
    }
    throw new Error('No guard was found');
}

function createMap(map) {
    for (let i = 0; i < map.length; i++) {
        map[i] = map[i].join('');
    }
    return map.join('\n');
}

// first problem answer 4964
// second problem answer 1740

/* const detectInfiniteLoop = (grid, startX, startY, startDirection) => {
    const directions = [
      { dx: -1, dy: 0 }, // Up
      { dx: 0, dy: 1 }, // Right
      { dx: 1, dy: 0 }, // Down
      { dx: 0, dy: -1 }, // Left
    ];

    const rows = grid.length;
    const cols = grid[0].length;

    let x = startX;
    let y = startY;
    let direction = startDirection;
    const visited = new Set(); // Tracks visited positions with direction

    while (true) {
      // Create a unique key for the current position and direction
      const state = `${x},${y},${direction}`;

      // If we have already visited this state, we are in an infinite loop
      if (visited.has(state)) {
        return true;
      }

      visited.add(state);

      // Calculate next position
      const nextX = x + directions[direction].dx;
      const nextY = y + directions[direction].dy;

      // Check if the guard is leaving the grid
      if (nextX < 0 || nextX >= rows || nextY < 0 || nextY >= cols) {
        return false; // No infinite loop
      }

      // Check if there's an obstacle at the next position
      if (grid[nextX][nextY] === "#") {
        // Turn 90 degrees to the right
        direction = (direction + 1) % 4;
      } else {
        // Move forward
        x = nextX;
        y = nextY;
      }
    }
};

const getStartingPosition = (grid) => {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        if (grid[i][j] !== "." && grid[i][j] !== "#") return [i, j];
      }
    }
};

export default function guardGallivant(data) {
      const grid = data.split("\n").map((row) => row.split(""));
    
      const [startX, startY] = getStartingPosition(grid);
      const startDirection = 0;
    
      const rows = grid.length;
      const cols = grid[0].length;
      let count = 0;

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          // Skip cells that are not free
          if (grid[i][j] !== ".") continue;
    
          // Temporarily add an obstacle at (i, j)
          grid[i][j] = "#";
    
          // Check if adding this obstacle causes an infinite loop
          if (detectInfiniteLoop(grid, startX, startY, startDirection)) {
            count++;
          }
    
          // Remove the obstacle
          grid[i][j] = ".";
        }
      }
      console.log({ part2: count });
      return '';
} */