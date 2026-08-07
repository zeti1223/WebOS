document.addEventListener('DOMContentLoaded', () => {
    startClock();
    initDesktopIcons();
    
    setTimeout(() => {
        openApp('minesweeper');
    }, 500);
    
    console.log('CYBER-OS v3.2 initialized successfully');
});