document.addEventListener('DOMContentLoaded', () => {
    startClock();
    initDesktopIcons();
    
    setTimeout(() => {
        openApp('minesweeper');
    }, 500);
    
    console.log('CYBER-OS v2.0 initialized successfully');
});