function parseMarkdown(text) {
    let html = text;
    
    // Escape HTML
    html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    
    // Code blocks (```code```)
    html = html.replace(/```([\s\S]*?)```/g, '<pre class="markdown-code-block"><code>$1</code></pre>');
    
    // Inline code (`code`)
    html = html.replace(/`([^`]+)`/g, '<code class="markdown-inline-code">$1</code>');
    
    // Headers (# H1, ## H2, ### H3)
    html = html.replace(/^### (.+)$/gm, '<h3 class="markdown-h3">$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2 class="markdown-h2">$1</h2>');
    html = html.replace(/^# (.+)$/gm, '<h1 class="markdown-h1">$1</h1>');
    
    // Bold (**text**)
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong class="markdown-bold">$1</strong>');
    
    // Italic (*text*)
    html = html.replace(/\*([^*]+)\*/g, '<em class="markdown-italic">$1</em>');
    
    // Blockquotes (> text)
    html = html.replace(/^&gt; (.+)$/gm, '<blockquote class="markdown-blockquote">$1</blockquote>');
    
    // Unordered lists (- item or * item)
    html = html.replace(/^[\-*] (.+)$/gm, '<li class="markdown-list-item">$1</li>');
    
    // Wrap lists
    html = html.replace(/(<li class="markdown-list-item">.*<\/li>\n?)+/g, '<ul class="markdown-list">$&</ul>');
    
    // Line breaks
    html = html.replace(/\n/g, '<br>');
    
    return html;
}

function createNotepadContent(windowId) {
    const savedContent = localStorage.getItem('notepad-content') || '';
    return `
        <div class="notepad-controls flex gap-2 mb-3">
            <button class="cyber-btn" onclick="saveNotepad('${windowId}')">SAVE</button>
            <button class="cyber-btn" onclick="loadNotepad('${windowId}')">LOAD</button>
            <button class="cyber-btn" onclick="clearNotepad('${windowId}')">CLEAR</button>
        </div>
        <div class="notepad">
            <div class="notepad-editor">
                <textarea id="notepad-${windowId}" class="notepad-textarea" placeholder="Write markdown here...">${savedContent}</textarea>
                <div id="notepad-preview-${windowId}" class="notepad-preview markdown-content"></div>
            </div>
        </div>
    `;
}

function updateMarkdownPreview(windowId) {
    const textarea = document.getElementById(`notepad-${windowId}`);
    const preview = document.getElementById(`notepad-preview-${windowId}`);
    if (textarea && preview) {
        preview.innerHTML = parseMarkdown(textarea.value);
    }
}

function saveNotepad(windowId) {
    const content = document.getElementById(`notepad-${windowId}`).value;
    localStorage.setItem('notepad-content', content);
    updateMarkdownPreview(windowId);
    playSound('maximize');
}

function loadNotepad(windowId) {
    const content = localStorage.getItem('notepad-content') || '';
    document.getElementById(`notepad-${windowId}`).value = content;
    updateMarkdownPreview(windowId);
    playSound('open');
}

function clearNotepad(windowId) {
    document.getElementById(`notepad-${windowId}`).value = '';
    updateMarkdownPreview(windowId);
    playSound('close');
}

function initNotepad(windowId) {
    const textarea = document.getElementById(`notepad-${windowId}`);
    if (textarea) {
        textarea.addEventListener('input', () => updateMarkdownPreview(windowId));
        updateMarkdownPreview(windowId);
    }
}