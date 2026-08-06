const calendarStates = {};

function createCalendarContent(windowId) {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    
    calendarStates[windowId] = {
        currentDate: new Date(),
        selectedDate: null
    };
    
    return `
        <div class="calendar-container">
            <div class="calendar-header">
                <button class="calendar-nav" onclick="navigateMonth('${windowId}', -1)">◀</button>
                <div class="calendar-title" id="calendar-title-${windowId}"></div>
                <button class="calendar-nav" onclick="navigateMonth('${windowId}', 1)">▶</button>
            </div>
            <div class="calendar-weekdays">
                <div class="calendar-weekday">SUN</div>
                <div class="calendar-weekday">MON</div>
                <div class="calendar-weekday">TUE</div>
                <div class="calendar-weekday">WED</div>
                <div class="calendar-weekday">THU</div>
                <div class="calendar-weekday">FRI</div>
                <div class="calendar-weekday">SAT</div>
            </div>
            <div class="calendar-days" id="calendar-days-${windowId}"></div>
            <div class="calendar-footer">
                <div class="selected-date" id="selected-date-${windowId}">No date selected</div>
                <button class="cyber-btn" onclick="goToToday('${windowId}')">TODAY</button>
            </div>
        </div>
    `;
}

function renderCalendar(windowId) {
    const state = calendarStates[windowId];
    const year = state.currentDate.getFullYear();
    const month = state.currentDate.getMonth();
    
    // Update title
    const monthNames = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 
                       'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
    document.getElementById(`calendar-title-${windowId}`).textContent = `${monthNames[month]} ${year}`;
    
    // Get first day of month and total days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    
    // Render days
    const daysContainer = document.getElementById(`calendar-days-${windowId}`);
    daysContainer.innerHTML = '';
    
    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
        const day = document.createElement('div');
        day.className = 'calendar-day other-month';
        day.textContent = daysInPrevMonth - i;
        daysContainer.appendChild(day);
    }
    
    // Current month days
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement('div');
        day.className = 'calendar-day';
        day.textContent = i;
        
        // Check if today
        if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            day.classList.add('today');
        }
        
        // Check if selected
        if (state.selectedDate && 
            i === state.selectedDate.getDate() && 
            month === state.selectedDate.getMonth() && 
            year === state.selectedDate.getFullYear()) {
            day.classList.add('selected');
        }
        
        day.onclick = () => selectDate(windowId, i);
        daysContainer.appendChild(day);
    }
    
    // Next month days
    const totalCells = firstDay + daysInMonth;
    const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
    for (let i = 1; i <= remainingCells; i++) {
        const day = document.createElement('div');
        day.className = 'calendar-day other-month';
        day.textContent = i;
        daysContainer.appendChild(day);
    }
}

function navigateMonth(windowId, direction) {
    const state = calendarStates[windowId];
    state.currentDate.setMonth(state.currentDate.getMonth() + direction);
    renderCalendar(windowId);
    playSound('open');
}

function selectDate(windowId, day) {
    const state = calendarStates[windowId];
    state.selectedDate = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth(), day);
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById(`selected-date-${windowId}`).textContent = 
        state.selectedDate.toLocaleDateString('en-US', options);
    
    renderCalendar(windowId);
    playSound('maximize');
}

function goToToday(windowId) {
    const state = calendarStates[windowId];
    state.currentDate = new Date();
    state.selectedDate = new Date();
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById(`selected-date-${windowId}`).textContent = 
        state.selectedDate.toLocaleDateString('en-US', options);
    
    renderCalendar(windowId);
    playSound('open');
}

function initCalendar(windowId) {
    renderCalendar(windowId);
}