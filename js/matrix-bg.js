// Matrix Rain Background Effect
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('matrix-bg');
    const ctx = canvas.getContext('2d');

    // Matrix characters
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charArray = chars.split('');

    // Font settings
    const fontSize = 14;
    let columns;
    let drops = [];

    // Set canvas size and initialize drops
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        columns = canvas.width / fontSize;
        
        // Reinitialize drops array when canvas is resized
        drops = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * -100; // Start above the screen with random offset
        }
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Draw function
    function draw() {
        // Semi-transparent black to create fade effect
        ctx.fillStyle = 'rgba(10, 10, 18, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Set font and color
        ctx.fillStyle = '#00ff88'; // Matrix green
        ctx.font = fontSize + 'px monospace';
        
        // Draw characters
        for (let i = 0; i < drops.length; i++) {
            // Random character
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            
            // Draw the character
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            // Move the drop down
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0; // Reset to top
            }
            drops[i]++;
        }
    }

    // Start animation
    setInterval(draw, 50);
});
