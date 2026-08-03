const settings = {
    sound: true,
    animation: true,
    grid: true
};

function createSettingsContent(windowId) {
    return `
        <div class="settings-panel flex flex-col gap-4">
            <div class="setting-item flex justify-between items-center p-2 border border-cyan-500/30" style="border-color: rgba(0,240,255,0.3);">
                <span class="setting-label" style="font-family: 'Orbitron', sans-serif; font-size: 12px; letter-spacing: 1px;">SOUND EFFECTS</span>
                <div class="cyber-toggle active ${settings.sound ? 'active' : ''}" id="sound-toggle-${windowId}" onclick="toggleSetting('sound', '${windowId}')"></div>
            </div>
            <div class="setting-item flex justify-between items-center p-2 border border-cyan-500/30" style="border-color: rgba(0,240,255,0.3);">
                <span class="setting-label" style="font-family: 'Orbitron', sans-serif; font-size: 12px; letter-spacing: 1px;">ANIMATIONS</span>
                <div class="cyber-toggle active ${settings.animation ? 'active' : ''}" id="anim-toggle-${windowId}" onclick="toggleSetting('animation', '${windowId}')"></div>
            </div>
            <div class="setting-item flex justify-between items-center p-2 border border-cyan-500/30" style="border-color: rgba(0,240,255,0.3);">
                <span class="setting-label" style="font-family: 'Orbitron', sans-serif; font-size: 12px; letter-spacing: 1px;">GRID BACKGROUND</span>
                <div class="cyber-toggle active ${settings.grid ? 'active' : ''}" id="grid-toggle-${windowId}" onclick="toggleSetting('grid', '${windowId}')"></div>
            </div>
        </div>
    `;
}

function toggleSetting(setting, windowId) {
    settings[setting] = !settings[setting];
    
    const toggleEl = document.getElementById(`${setting === 'animation' ? 'anim' : setting}-toggle-${windowId}`);
    if (toggleEl) {
        toggleEl.classList.toggle('active');
    }
    
    if (setting === 'sound') {
        // Sync with global sound state
        const wasEnabled = soundEnabled;
        soundEnabled = settings.sound;
        if (wasEnabled !== soundEnabled) {
            // Play feedback sound only if enabling
            if (soundEnabled) playSound('open');
        }
    }
    
    if (setting === 'grid') {
        const bg = document.querySelector('.background');
        if (bg) {
            bg.style.display = settings.grid ? 'block' : 'none';
        }
    }
    
    if (setting === 'animation') {
        document.body.style.setProperty('--animation-enabled', settings.animation ? '1' : '0');
    }
}