const calcStates = {};

function createCalculatorContent(windowId) {
    return `
        <div class="calc-display" id="calc-display-${windowId}">0</div>
        <div class="calc-buttons grid" style="grid-template-columns: repeat(4, 1fr); gap: 5px;">
            <button class="calc-btn" onclick="calcInput('${windowId}', '7')">7</button>
            <button class="calc-btn" onclick="calcInput('${windowId}', '8')">8</button>
            <button class="calc-btn" onclick="calcInput('${windowId}', '9')">9</button>
            <button class="calc-btn operator" onclick="calcInput('${windowId}', '/')">/</button>
            <button class="calc-btn" onclick="calcInput('${windowId}', '4')">4</button>
            <button class="calc-btn" onclick="calcInput('${windowId}', '5')">5</button>
            <button class="calc-btn" onclick="calcInput('${windowId}', '6')">6</button>
            <button class="calc-btn operator" onclick="calcInput('${windowId}', '*')">×</button>
            <button class="calc-btn" onclick="calcInput('${windowId}', '1')">1</button>
            <button class="calc-btn" onclick="calcInput('${windowId}', '2')">2</button>
            <button class="calc-btn" onclick="calcInput('${windowId}', '3')">3</button>
            <button class="calc-btn operator" onclick="calcInput('${windowId}', '-')">−</button>
            <button class="calc-btn" onclick="calcInput('${windowId}', '0')">0</button>
            <button class="calc-btn" onclick="calcInput('${windowId}', '.')">.</button>
            <button class="calc-btn equals" onclick="calcEquals('${windowId}')">=</button>
            <button class="calc-btn operator" onclick="calcInput('${windowId}', '+')">+</button>
            <button class="calc-btn" onclick="calcClear('${windowId}')" style="grid-column: span 4">CLEAR</button>
        </div>
    `;
}

function calcInput(windowId, value) {
    if (!calcStates[windowId]) {
        calcStates[windowId] = { display: '0', operation: null, previousValue: null };
    }
    
    const state = calcStates[windowId];
    const display = document.getElementById(`calc-display-${windowId}`);
    
    if (['+', '-', '*', '/'].includes(value)) {
        state.operation = value;
        state.previousValue = parseFloat(state.display);
        state.display = '0';
    } else {
        if (state.display === '0' && value !== '.') {
            state.display = value;
        } else {
            state.display += value;
        }
    }
    
    display.textContent = state.display;
}

function calcEquals(windowId) {
    const state = calcStates[windowId];
    if (!state || !state.operation || state.previousValue === null) return;
    
    const display = document.getElementById(`calc-display-${windowId}`);
    const current = parseFloat(state.display);
    let result;
    
    switch(state.operation) {
        case '+': result = state.previousValue + current; break;
        case '-': result = state.previousValue - current; break;
        case '*': result = state.previousValue * current; break;
        case '/': result = state.previousValue / current; break;
    }
    
    display.textContent = result;
    state.display = result.toString();
    state.operation = null;
    state.previousValue = null;
}

function calcClear(windowId) {
    calcStates[windowId] = { display: '0', operation: null, previousValue: null };
    document.getElementById(`calc-display-${windowId}`).textContent = '0';
}