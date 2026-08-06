const audioContext = new (window.AudioContext || window.webkitAudioContext)();
window.soundEnabled = true;

function playSound(type) {
    if (!window.soundEnabled) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    switch(type) {
        case 'open':
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.1);
            break;
        case 'close':
            oscillator.frequency.value = 600;
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.1);
            break;
        case 'minimize':
            oscillator.frequency.value = 400;
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.15);
            break;
        case 'maximize':
            oscillator.frequency.value = 1000;
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.1);
            break;
    }
}

function toggleSound() {
    soundEnabled = !soundEnabled;
    return soundEnabled;
}

function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    document.getElementById('clock').textContent = timeString;
}

function startClock() {
    updateClock();
    setInterval(updateClock, 1000);
}

// Desktop icon drag and drop
function initDesktopIcons() {
    const icons = document.querySelectorAll('.desktop-icon');
    const desktop = document.getElementById('desktop');
    
    // Load saved positions
    loadIconPositions();
    
    // Deselect icons when clicking on desktop background
    desktop.addEventListener('mousedown', (e) => {
        if (!e.target.closest('.desktop-icon')) {
            document.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('selected'));
        }
    });
    
    icons.forEach(icon => {
        let isDragging = false;
        let startX, startY, initialX, initialY;
        let dragTimeout;
        
        icon.addEventListener('mousedown', (e) => {
            if (e.target.closest('.desktop-icon')) {
                // Clear selection from other icons
                document.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('selected'));
                // Select this icon
                icon.classList.add('selected');
                
                // Small delay to distinguish between click and drag
                dragTimeout = setTimeout(() => {
                    isDragging = true;
                    startX = e.clientX;
                    startY = e.clientY;
                    initialX = icon.offsetLeft;
                    initialY = icon.offsetTop;
                    icon.style.zIndex = 1000;
                }, 200);
            }
        });
        
        icon.addEventListener('mouseup', () => {
            if (dragTimeout) {
                clearTimeout(dragTimeout);
                dragTimeout = null;
            }
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            
            let newX = initialX + dx;
            let newY = initialY + dy;
            
            // Keep icons within desktop bounds
            const maxX = desktop.clientWidth - icon.clientWidth;
            const maxY = desktop.clientHeight - icon.clientHeight - 50; // -50 for taskbar
            
            newX = Math.max(0, Math.min(newX, maxX));
            newY = Math.max(0, Math.min(newY, maxY));
            
            icon.style.left = newX + 'px';
            icon.style.top = newY + 'px';
        });
        
        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                icon.style.zIndex = '';
                saveIconPositions();
            }
        });
    });
}

function saveIconPositions() {
    const icons = document.querySelectorAll('.desktop-icon');
    const positions = {};
    
    icons.forEach(icon => {
        const appId = icon.getAttribute('data-app');
        positions[appId] = {
            x: icon.offsetLeft,
            y: icon.offsetTop
        };
    });
    
    localStorage.setItem('desktop-icon-positions', JSON.stringify(positions));
}

function loadIconPositions() {
    const saved = localStorage.getItem('desktop-icon-positions');
    const icons = document.querySelectorAll('.desktop-icon');
    
    if (saved) {
        try {
            const positions = JSON.parse(saved);
            
            icons.forEach(icon => {
                const appId = icon.getAttribute('data-app');
                if (positions[appId]) {
                    icon.style.left = positions[appId].x + 'px';
                    icon.style.top = positions[appId].y + 'px';
                }
            });
        } catch (e) {
            console.error('Error loading icon positions:', e);
            setDefaultIconPositions();
        }
    } else {
        setDefaultIconPositions();
    }
}

function setDefaultIconPositions() {
    const icons = document.querySelectorAll('.desktop-icon');
    
    // Arrange icons in a nice grid pattern
    // Column 1: minesweeper, notepad, calculator, settings
    // Column 2: about, terminal, calendar, system-monitor
    const positions = {
        'minesweeper': { x: 20, y: 20 },
        'notepad': { x: 20, y: 120 },
        'calculator': { x: 20, y: 220 },
        'settings': { x: 20, y: 320 },
        'about': { x: 120, y: 20 },
        'terminal': { x: 120, y: 120 },
        'calendar': { x: 120, y: 220 },
        'system-monitor': { x: 120, y: 320 }
    };
    
    icons.forEach(icon => {
        const appId = icon.getAttribute('data-app');
        if (positions[appId]) {
            icon.style.left = positions[appId].x + 'px';
            icon.style.top = positions[appId].y + 'px';
        }
    });
    
    // Save default positions
    saveIconPositions();
}

function resetIconPositions() {
    localStorage.removeItem('desktop-icon-positions');
    setDefaultIconPositions();
    playSound('open');
}