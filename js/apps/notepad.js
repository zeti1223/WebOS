function createNotepadContent(windowId) {
    const savedContent = localStorage.getItem('notepad-content') || '';
    return `
        <div class="notepad-controls flex gap-2 mb-3">
            <button class="cyber-btn" onclick="saveNotepad('${windowId}')">SAVE</button>
            <button class="cyber-btn" onclick="loadNotepad('${windowId}')">LOAD</button>
            <button class="cyber-btn" onclick="clearNotepad('${windowId}')">CLEAR</button>
        </div>
        <div class="notepad">
            <textarea id="notepad-${windowId}">${savedContent}</textarea>
        </div>
    `;
}

function saveNotepad(windowId) {
    const content = document.getElementById(`notepad-${windowId}`).value;
    localStorage.setItem('notepad-content', content);
    playSound('maximize');
}

function loadNotepad(windowId) {
    const content = localStorage.getItem('notepad-content') || '';
    document.getElementById(`notepad-${windowId}`).value = content;
    playSound('open');
}

function clearNotepad(windowId) {
    document.getElementById(`notepad-${windowId}`).value = '';
    playSound('close');
}