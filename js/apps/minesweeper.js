const msGames = {};
const MS_SIZE = 9;
const MS_MINES = 10;

function createMinesweeperContent(windowId) {
    return `
        <div class="ms-header flex justify-between items-center mb-4" style="font-family: 'Orbitron', sans-serif;">
            <span class="text-pink-400 flex items-center gap-2" style="color: var(--neon-pink); text-shadow: 0 0 5px var(--neon-pink);">
                <i class="fa-solid fa-bomb"></i> <span id="ms-mine-count-${windowId}">10</span>
            </span>
            <button class="cyber-btn" onclick="initMinesweeper('${windowId}')">RESTART</button>
            <span id="ms-status-${windowId}" class="text-pink-400" style="color: var(--neon-pink);">PLAYING</span>
        </div>
        <div id="ms-grid-${windowId}" class="grid" style="grid-template-columns: repeat(9, 30px); grid-template-rows: repeat(9, 30px); gap: 2px; user-select: none;"></div>
    `;
}

function initMinesweeper(windowId) {
    msGames[windowId] = {
        board: [],
        revealedCount: 0,
        gameOver: false
    };
    
    const game = msGames[windowId];
    document.getElementById(`ms-status-${windowId}`).textContent = 'PLAYING';
    document.getElementById(`ms-mine-count-${windowId}`).textContent = MS_MINES;

    for (let r = 0; r < MS_SIZE; r++) {
        const row = [];
        for (let c = 0; c < MS_SIZE; c++) {
            row.push({ mine: false, revealed: false, flagged: false, adjacent: 0 });
        }
        game.board.push(row);
    }

    let placed = 0;
    while (placed < MS_MINES) {
        const r = Math.floor(Math.random() * MS_SIZE);
        const c = Math.floor(Math.random() * MS_SIZE);
        if (!game.board[r][c].mine) {
            game.board[r][c].mine = true;
            placed++;
        }
    }

    for (let r = 0; r < MS_SIZE; r++) {
        for (let c = 0; c < MS_SIZE; c++) {
            if (game.board[r][c].mine) continue;
            let count = 0;
            for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                    const nr = r + dr, nc = c + dc;
                    if (nr >= 0 && nr < MS_SIZE && nc >= 0 && nc < MS_SIZE && game.board[nr][nc].mine) {
                        count++;
                    }
                }
            }
            game.board[r][c].adjacent = count;
        }
    }

    renderMinesweeper(windowId);
}

function renderMinesweeper(windowId) {
    const game = msGames[windowId];
    if (!game) return;
    
    const grid = document.getElementById(`ms-grid-${windowId}`);
    grid.innerHTML = '';
    
    for (let r = 0; r < MS_SIZE; r++) {
        for (let c = 0; c < MS_SIZE; c++) {
            const cellData = game.board[r][c];
            const cellEl = document.createElement('div');
            cellEl.className = 'ms-cell';
            
            if (cellData.revealed) {
                cellEl.classList.add('revealed');
                if (cellData.mine) {
                    cellEl.classList.add('mine');
                    cellEl.innerHTML = '<i class="fa-solid fa-bomb"></i>';
                } else if (cellData.adjacent > 0) {
                    cellEl.textContent = cellData.adjacent;
                }
            } else if (cellData.flagged) {
                cellEl.classList.add('flagged');
                cellEl.innerHTML = '<i class="fa-solid fa-flag"></i>';
            }

            cellEl.addEventListener('click', (e) => {
                e.stopPropagation();
                revealCell(windowId, r, c);
            });
            cellEl.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFlag(windowId, r, c);
            });

            grid.appendChild(cellEl);
        }
    }
}

function revealCell(windowId, r, c) {
    const game = msGames[windowId];
    if (!game || game.gameOver) return;
    
    const cell = game.board[r][c];
    if (cell.revealed || cell.flagged) return;

    cell.revealed = true;
    game.revealedCount++;

    if (cell.mine) {
        game.gameOver = true;
        revealAllMines(windowId);
        document.getElementById(`ms-status-${windowId}`).innerHTML = '<i class="fa-solid fa-skull"></i> GAME OVER';
        renderMinesweeper(windowId);
        return;
    }

    if (cell.adjacent === 0) {
        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                const nr = r + dr, nc = c + dc;
                if (nr >= 0 && nr < MS_SIZE && nc >= 0 && nc < MS_SIZE) {
                    if (!game.board[nr][nc].revealed && !game.board[nr][nc].flagged) {
                        revealCell(windowId, nr, nc);
                    }
                }
            }
        }
    }

    checkWin(windowId);
    renderMinesweeper(windowId);
}

function toggleFlag(windowId, r, c) {
    const game = msGames[windowId];
    if (!game || game.gameOver) return;
    
    const cell = game.board[r][c];
    if (cell.revealed) return;
    
    cell.flagged = !cell.flagged;
    const flaggedCount = game.board.flat().filter(cell => cell.flagged).length;
    document.getElementById(`ms-mine-count-${windowId}`).textContent = MS_MINES - flaggedCount;
    renderMinesweeper(windowId);
}

function revealAllMines(windowId) {
    const game = msGames[windowId];
    if (!game) return;
    
    for (let r = 0; r < MS_SIZE; r++) {
        for (let c = 0; c < MS_SIZE; c++) {
            if (game.board[r][c].mine) game.board[r][c].revealed = true;
        }
    }
}

function checkWin(windowId) {
    const game = msGames[windowId];
    if (!game) return;
    
    const totalCells = MS_SIZE * MS_SIZE;
    if (game.revealedCount === totalCells - MS_MINES) {
        game.gameOver = true;
        document.getElementById(`ms-status-${windowId}`).innerHTML = '<i class="fa-solid fa-trophy"></i> YOU WIN!';
    }
}