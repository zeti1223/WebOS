const terminalStates = {};

function createTerminalContent(windowId) {
    return `
        <div class="terminal-container">
            <div class="terminal-output" id="terminal-output-${windowId}">
                <div class="terminal-line">
                    <span class="terminal-prompt">CYBER-OS v3.2</span>
                </div>
                <div class="terminal-line">
                    <span class="terminal-prompt">Type 'help' for available commands</span>
                </div>
                <div class="terminal-line">&nbsp;</div>
            </div>
            <div class="terminal-input-line">
                <span class="terminal-prompt">root@cyber-os:~$</span>
                <input type="text" class="terminal-input" id="terminal-input-${windowId}" 
                       onkeydown="handleTerminalKeydown(event, '${windowId}')" 
                       onfocus="focusTerminal('${windowId}')" autocomplete="off" autofocus>
            </div>
        </div>
    `;
}

function focusTerminal(windowId) {
    const terminalInput = document.getElementById(`terminal-input-${windowId}`);
    if (terminalInput) {
        terminalInput.focus();
    }
}

function handleTerminalKeydown(event, windowId) {
    if (event.key === 'Enter') {
        const input = document.getElementById(`terminal-input-${windowId}`);
        const command = input.value.trim();
        input.value = '';
        
        if (command) {
            executeCommand(command, windowId);
        }
    }
}

function executeCommand(command, windowId) {
    const output = document.getElementById(`terminal-output-${windowId}`);
    
    // Add command to output
    const commandLine = document.createElement('div');
    commandLine.className = 'terminal-line';
    commandLine.innerHTML = `<span class="terminal-prompt">root@cyber-os:~$</span> ${escapeHtml(command)}`;
    output.appendChild(commandLine);
    
    // Parse and execute command
    const parts = command.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);
    
    let result = '';
    
    switch(cmd) {
        case 'help':
            result = `
Available commands:
  help        - Show this help message
  clear       - Clear terminal
  date        - Show current date and time
  echo [text] - Echo text back
  whoami      - Display current user
  uptime      - Show system uptime
  fastfech    - Display system information
  ls          - List files
  pwd         - Print working directory
  hack        - Simulate hacking sequence
            `;
            break;
        case 'clear':
            output.innerHTML = '';
            return;
        case 'date':
            result = new Date().toString();
            break;
        case 'echo':
            result = args.join(' ');
            break;
        case 'whoami':
            result = 'root';
            break;
        case 'uptime':
            const uptime = Math.floor(Math.random() * 1000000);
            result = `up ${uptime} seconds, load average: 0.52, 0.58, 0.59`;
            break;
        case 'fastfech':
            result = `
root@cyber-os
-----------
OS: CYBER-OS v3.2
Host: Web Browser
Kernel: JavaScript
Shell: CyberTerm
Resolution: ${window.innerWidth}x${window.innerHeight}
            `;
            break;
        case 'ls':
            result = 'desktop  documents  downloads  system  user  bin  etc';
            break;
        case 'pwd':
            result = '/root';
            break;
        case 'hack':
            simulateHack(windowId);
            result = 'Initiating hack sequence...';
            break;
        default:
            result = `Command not found: ${cmd}. Type 'help' for available commands.`;
    }
    
    // Add result to output
    const resultLine = document.createElement('div');
    resultLine.className = 'terminal-line';
    resultLine.innerHTML = `<span class="terminal-result">${result}</span>`;
    output.appendChild(resultLine);
    
    // Add empty line
    const emptyLine = document.createElement('div');
    emptyLine.className = 'terminal-line';
    emptyLine.innerHTML = '&nbsp;';
    output.appendChild(emptyLine);
    
    // Scroll to bottom
    output.scrollTop = output.scrollHeight;
    
    playSound('open');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function simulateHack(windowId) {
    const output = document.getElementById(`terminal-output-${windowId}`);
    const hackLines = [
        'Initializing hack sequence...',
        'Bypassing firewall...',
        'Accessing mainframe...',
        'Decrypting data...',
        'Downloading classified files...',
        'Covering tracks...',
        'Hack complete. Access granted.'
    ];
    
    let index = 0;
    const interval = setInterval(() => {
        if (index < hackLines.length) {
            const line = document.createElement('div');
            line.className = 'terminal-line';
            line.innerHTML = `<span class="terminal-hack">${hackLines[index]}</span>`;
            output.appendChild(line);
            output.scrollTop = output.scrollHeight;
            index++;
        } else {
            clearInterval(interval);
        }
    }, 500);
}

function initTerminal(windowId) {
    const terminalContainer = document.querySelector(`#window-${windowId} .terminal-container`);
    if (terminalContainer) {
        terminalContainer.addEventListener('click', () => focusTerminal(windowId));
    }
    focusTerminal(windowId);
}