# CYBER-OS v3.1

A retro-futuristic web-based operating system with a cyberpunk aesthetic. Built entirely with vanilla HTML, CSS, and JavaScript - no frameworks required.

![Cyber-OS](https://img.shields.io/badge/version-3.1.0-neon_cyan) ![License](https://img.shields.io/badge/license-MIT-neon_pink)

## Features

### Core System
- **Desktop Environment**: Full window management system with draggable, resizable windows
- **Taskbar**: Dynamic taskbar with running applications and system clock
- **Desktop Icons**: Quick access to all applications from the desktop
- **Window Controls**: Minimize, maximize, and close functionality for all windows
- **Sound Effects**: Retro-style sound effects using Web Audio API
- **Animated Background**: Dynamic cyberpunk grid with pulsing effects

### Applications

#### Minesweeper
- Classic minesweeper game with 9x9 grid and 10 mines
- Left-click to reveal cells, right-click to flag
- Auto-reveal adjacent cells when clicking empty spaces
- Win/lose detection with status display
- Mine counter and game status indicators

#### Notepad
- Simple text editor for quick notes
- Save functionality using localStorage
- Load saved notes with one click
- Clear button to reset content
- Persistent storage across sessions

#### Calculator
- Fully functional calculator
- Basic operations: addition, subtraction, multiplication, division
- Clear button to reset calculation
- Responsive button grid layout
- Real-time display updates

#### Settings
- Toggle sound effects on/off
- Enable/disable animations
- Show/hide grid background
- Instant visual feedback

#### About
- System information display
- Version number and build details
- Cyberpunk-styled information panel

## Design Philosophy

CYBER-OS v3.1 features a unique retro-futuristic cyberpunk aesthetic that sets it apart from typical web applications:

- **Color Palette**: Neon cyan (#00f0ff), neon pink (#ff00aa), neon green (#00ff88), and neon yellow (#ffff00) on dark backgrounds
- **Typography**: Orbitron font for headers, Share Tech Mono for content - creating a futuristic terminal feel
- **Visual Effects**: Glowing borders, animated grid backgrounds, and smooth transitions
- **Glassmorphism**: Semi-transparent panels with backdrop blur effects
- **Responsive Interactions**: Hover effects, sound feedback, and visual state changes

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies or installations required

### Installation

1. Clone the repository:
```bash
git clone https://github.com/zeti1223/WebOS.git
cd WebOS
```

2. Open `index.html` directly in your browser


### Quick Start
- Click on desktop icons to launch applications
- Drag windows by their title bars to reposition them
- Use window controls (−, □, ×) to minimize, maximize, or close windows
- Click taskbar items to restore minimized windows
- Right-click in Minesweeper to flag potential mines

### Technical Details

#### Window Management System
- Dynamic window creation with unique IDs
- Z-index management for proper window stacking
- Drag-and-drop functionality with smooth positioning
- Window state management (minimized, maximized, normal)
- Taskbar integration for window switching

#### Sound System
- Web Audio API for generating retro sound effects
- Oscillator-based audio synthesis
- Context-aware sound playback
- Toggleable sound effects in settings

#### Storage
- localStorage for notepad persistence
- Session-based application state
- No server-side storage required

#### CSS Architecture
- CSS custom properties (variables) for theming
- BEM-inspired naming conventions
- Responsive design principles
- CSS Grid and Flexbox layouts
- CSS animations and transitions

## Usage Guide

### Minesweeper
1. Launch from desktop icon or taskbar
2. Click cells to reveal them
3. Right-click to flag suspected mines
4. Numbers indicate adjacent mine count
5. Reveal all non-mine cells to win
6. Click "RESTART" to play again

### Notepad
1. Open Notepad from desktop
2. Type your notes in the text area
3. Click "SAVE" to store in browser
4. Click "LOAD" to retrieve saved notes
5. Click "CLEAR" to reset the editor

### Calculator
1. Launch Calculator from desktop
2. Click numbers and operators
3. Current calculation displays in real-time
4. Click "=" for final result
5. Click "CLEAR" to reset

### Settings
1. Open Settings from desktop
2. Click toggles to enable/disable features
3. Changes apply immediately
4. Settings persist during session
