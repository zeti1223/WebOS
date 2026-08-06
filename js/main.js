document.addEventListener('DOMContentLoaded', () => {
    startClock();
    initDesktopIcons();
    
    setTimeout(() => {
        openApp('minesweeper');
    }, 500);
    
    console.log('CYBER-OS v3.1 initialized successfully');
});