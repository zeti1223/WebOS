const monitorStates = {};
let monitorIntervals = {};

function createSystemMonitorContent(windowId) {
    return `
        <div class="system-monitor">
            <div class="monitor-section">
                <div class="monitor-title">CPU USAGE</div>
                <div class="monitor-bar-container">
                    <div class="monitor-bar" id="cpu-bar-${windowId}">
                        <div class="monitor-fill" id="cpu-fill-${windowId}"></div>
                    </div>
                    <div class="monitor-value" id="cpu-value-${windowId}">0%</div>
                </div>
            </div>
            
            <div class="monitor-section">
                <div class="monitor-title">MEMORY USAGE</div>
                <div class="monitor-bar-container">
                    <div class="monitor-bar" id="mem-bar-${windowId}">
                        <div class="monitor-fill" id="mem-fill-${windowId}"></div>
                    </div>
                    <div class="monitor-value" id="mem-value-${windowId}">0%</div>
                </div>
            </div>
            
            <div class="monitor-section">
                <div class="monitor-title">DISK USAGE</div>
                <div class="monitor-bar-container">
                    <div class="monitor-bar" id="disk-bar-${windowId}">
                        <div class="monitor-fill" id="disk-fill-${windowId}"></div>
                    </div>
                    <div class="monitor-value" id="disk-value-${windowId}">0%</div>
                </div>
            </div>
            
            <div class="monitor-section">
                <div class="monitor-title">NETWORK ACTIVITY</div>
                <div class="network-stats">
                    <div class="network-item">
                        <span class="network-label">UPLOAD:</span>
                        <span class="network-value" id="upload-${windowId}">0 KB/s</span>
                    </div>
                    <div class="network-item">
                        <span class="network-label">DOWNLOAD:</span>
                        <span class="network-value" id="download-${windowId}">0 KB/s</span>
                    </div>
                </div>
            </div>
            
            <div class="monitor-section">
                <div class="monitor-title">SYSTEM INFO</div>
                <div class="system-info">
                    <div class="info-item">
                        <span class="info-label">OS:</span>
                        <span class="info-value">CYBER-OS v2.0</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">KERNEL:</span>
                        <span class="info-value">JavaScript ES6</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">UPTIME:</span>
                        <span class="info-value" id="uptime-${windowId}">0:00:00</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">PROCESSES:</span>
                        <span class="info-value" id="processes-${windowId}">0</span>
                    </div>
                </div>
            </div>
            
            <div class="monitor-section">
                <div class="monitor-title">ACTIVE PROCESSES</div>
                <div class="process-list" id="process-list-${windowId}"></div>
            </div>
        </div>
    `;
}

function updateSystemMonitor(windowId) {
    // Simulate CPU usage
    const cpuUsage = Math.floor(Math.random() * 30) + 20 + (Math.random() > 0.7 ? Math.floor(Math.random() * 40) : 0);
    document.getElementById(`cpu-fill-${windowId}`).style.width = cpuUsage + '%';
    document.getElementById(`cpu-value-${windowId}`).textContent = cpuUsage + '%';
    
    // Simulate memory usage
    const memUsage = Math.floor(Math.random() * 20) + 40 + (Math.random() > 0.8 ? Math.floor(Math.random() * 25) : 0);
    document.getElementById(`mem-fill-${windowId}`).style.width = memUsage + '%';
    document.getElementById(`mem-value-${windowId}`).textContent = memUsage + '%';
    
    // Simulate disk usage (relatively stable)
    const diskUsage = 65 + Math.floor(Math.random() * 5);
    document.getElementById(`disk-fill-${windowId}`).style.width = diskUsage + '%';
    document.getElementById(`disk-value-${windowId}`).textContent = diskUsage + '%';
    
    // Simulate network activity
    const upload = (Math.random() * 500).toFixed(1);
    const download = (Math.random() * 2000).toFixed(1);
    document.getElementById(`upload-${windowId}`).textContent = upload + ' KB/s';
    document.getElementById(`download-${windowId}`).textContent = download + ' KB/s';
    
    // Update uptime
    const state = monitorStates[windowId];
    if (state) {
        state.uptime++;
        const hours = Math.floor(state.uptime / 3600);
        const minutes = Math.floor((state.uptime % 3600) / 60);
        const seconds = state.uptime % 60;
        document.getElementById(`uptime-${windowId}`).textContent = 
            `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    // Update process count
    const processCount = 15 + Math.floor(Math.random() * 10);
    document.getElementById(`processes-${windowId}`).textContent = processCount;
    
    // Update process list
    updateProcessList(windowId);
}

function updateProcessList(windowId) {
    const processList = document.getElementById(`process-list-${windowId}`);
    const processes = [
        { name: 'systemd', cpu: Math.floor(Math.random() * 5), mem: Math.floor(Math.random() * 10) },
        { name: 'kernel_task', cpu: Math.floor(Math.random() * 8), mem: Math.floor(Math.random() * 15) },
        { name: 'window_mgr', cpu: Math.floor(Math.random() * 10) + 5, mem: Math.floor(Math.random() * 20) + 10 },
        { name: 'cyber_term', cpu: Math.floor(Math.random() * 15), mem: Math.floor(Math.random() * 25) },
        { name: 'neural_net', cpu: Math.floor(Math.random() * 20) + 10, mem: Math.floor(Math.random() * 30) + 20 },
        { name: 'crypto_miner', cpu: Math.floor(Math.random() * 25) + 15, mem: Math.floor(Math.random() * 15) + 5 },
    ];
    
    processList.innerHTML = processes.map(proc => `
        <div class="process-item">
            <span class="process-name">${proc.name}</span>
            <span class="process-cpu">${proc.cpu}%</span>
            <span class="process-mem">${proc.mem}%</span>
        </div>
    `).join('');
}

function initSystemMonitor(windowId) {
    monitorStates[windowId] = {
        uptime: 0
    };
    
    // Initial update
    updateSystemMonitor(windowId);
    
    // Set up interval for updates
    monitorIntervals[windowId] = setInterval(() => {
        updateSystemMonitor(windowId);
    }, 1000);
}

function cleanupSystemMonitor(windowId) {
    if (monitorIntervals[windowId]) {
        clearInterval(monitorIntervals[windowId]);
        delete monitorIntervals[windowId];
    }
    if (monitorStates[windowId]) {
        delete monitorStates[windowId];
    }
}