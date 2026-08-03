document.addEventListener('DOMContentLoaded', () => {
    startClock();
    
    setTimeout(() => {
        openApp('minesweeper');
    }, 500);
    
    console.log('CYBER-OS v2.0 initialized successfully');
});