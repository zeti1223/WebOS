let windows = {};
let windowIdCounter = 0;
let highestZIndex = 100;
let activeWindowId = null;

const appConfigs = {
    minesweeper: {
        title: '<i class="fa-solid fa-bomb"></i> MINESWEEPER',
        width: 350,
        height: 450,
        content: windowId => createMinesweeperContent(windowId)
    },
    notepad: {
        title: '<i class="fa-solid fa-file-lines"></i> NOTEPAD',
        width: 500,
        height: 400,
        content: windowId => createNotepadContent(windowId)
    },
    calculator: {
        title: '<i class="fa-solid fa-calculator"></i> CALCULATOR',
        width: 300,
        height: 450,
        content: windowId => createCalculatorContent(windowId)
    },
    settings: {
        title: '<i class="fa-solid fa-gear"></i> SETTINGS',
        width: 400,
        height: 300,
        content: windowId => createSettingsContent(windowId)
    },
    about: {
        title: '<i class="fa-solid fa-circle-info"></i> ABOUT',
        width: 400,
        height: 350,
        content: windowId => createAboutContent(windowId)
    }
};

function openApp(appName) {
    const windowId = `window-${windowIdCounter++}`;
    const config = appConfigs[appName];
    
    const windowEl = document.createElement('div');
    windowEl.className = 'window';
    windowEl.id = windowId;
    windowEl.style.width = config.width + 'px';
    windowEl.style.height = config.height + 'px';
    windowEl.style.top = (50 + Object.keys(windows).length * 30) + 'px';
    windowEl.style.left = (50 + Object.keys(windows).length * 30) + 'px';
    windowEl.style.zIndex = ++highestZIndex;
    
    windowEl.innerHTML = `
        <div class="title-bar flex justify-between items-center">
            <span>${config.title}</span>
            <div class="flex gap-1">
                <button class="window-btn minimize" onclick="minimizeWindow('${windowId}')">−</button>
                <button class="window-btn maximize" onclick="maximizeWindow('${windowId}')">□</button>
                <button class="window-btn close" onclick="closeWindow('${windowId}')">×</button>
            </div>
        </div>
        <div class="content"></div>
    `;
    
    document.getElementById('desktop').appendChild(windowEl);
    
    const contentEl = windowEl.querySelector('.content');
    contentEl.innerHTML = config.content(windowId);
    
    windows[windowId] = {
        element: windowEl,
        appName: appName,
        minimized: false,
        maximized: false
    };
    
    setupWindowDrag(windowEl);
    setupWindowFocus(windowEl);
    updateTaskbar();
    activeWindowId = windowId;
    
    playSound('open');
    
    if (appName === 'minesweeper') {
        initMinesweeper(windowId);
    }
}

function closeWindow(windowId) {
    const windowData = windows[windowId];
    if (windowData) {
        windowData.element.remove();
        delete windows[windowId];
        updateTaskbar();
        playSound('close');
    }
}

function minimizeWindow(windowId) {
    const windowData = windows[windowId];
    if (windowData) {
        windowData.minimized = true;
        windowData.element.classList.add('minimized');
        updateTaskbar();
        playSound('minimize');
    }
}

function maximizeWindow(windowId) {
    const windowData = windows[windowId];
    if (windowData) {
        windowData.maximized = !windowData.maximized;
        windowData.element.classList.toggle('maximized');
        playSound('maximize');
    }
}

function restoreWindow(windowId) {
    const windowData = windows[windowId];
    if (windowData && windowData.minimized) {
        windowData.minimized = false;
        windowData.element.classList.remove('minimized');
        windowData.element.style.zIndex = ++highestZIndex;
        updateTaskbar();
        activeWindowId = windowId;
        playSound('open');
    }
}

function setupWindowDrag(windowEl) {
    const titleBar = windowEl.querySelector('.title-bar');
    let isDragging = false;
    let startX, startY, initialX, initialY;

    titleBar.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('window-btn')) return;
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        initialX = windowEl.offsetLeft;
        initialY = windowEl.offsetTop;
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        windowEl.style.left = `${initialX + dx}px`;
        windowEl.style.top = `${initialY + dy}px`;
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
}

function setupWindowFocus(windowEl) {
    windowEl.addEventListener('mousedown', () => {
        windowEl.style.zIndex = ++highestZIndex;
        activeWindowId = windowEl.id;
        updateTaskbar();
    });
}

function updateTaskbar() {
    const taskbarApps = document.getElementById('taskbar-apps');
    taskbarApps.innerHTML = '';
    
    for (const [windowId, windowData] of Object.entries(windows)) {
        const item = document.createElement('button');
        item.className = 'taskbar-item';
        if (windowId === activeWindowId && !windowData.minimized) {
            item.classList.add('active');
        }
        item.innerHTML = appConfigs[windowData.appName].title;
        item.onclick = () => restoreWindow(windowId);
        taskbarApps.appendChild(item);
    }
}