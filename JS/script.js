// VARIABLES GLOBALES
const navButtons = document.querySelectorAll('.nav-btn');
const pages = document.querySelectorAll('.page');
const logoutBtn = document.getElementById('logout-btn');
const logoutModal = document.getElementById('logout-modal');
const cancelLogout = document.getElementById('cancel-logout');
const confirmLogout = document.getElementById('confirm-logout');

// CALCULADORA VARIABLES
let currentDisplay = '0';
let previousValue = '';
let operation = null;
let shouldResetDisplay = false;

// ==================== NAVEGACIÓN ====================

// Cambiar página al hacer click en botones del navbar
navButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (button.id === 'logout-btn') return;
        
        const pageName = button.getAttribute('data-page');
        showPage(pageName);
        
        // Efecto visual del click
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 100);
    });
});

// Función para mostrar página
function showPage(pageName) {
    pages.forEach(page => page.classList.remove('active'));
    
    const targetPage = document.getElementById(pageName);
    if (targetPage) {
        targetPage.classList.add('active');
    }
}

// ==================== CUADRADO ====================

const generateSquareBtn = document.getElementById('generate-square');
const squareSizeInput = document.getElementById('square-size');
const squareColorInput = document.getElementById('square-color');
const squareElement = document.getElementById('square');

generateSquareBtn.addEventListener('click', generateSquare);

// Generar cuadrado con tamaño y color
function generateSquare() {
    const size = parseInt(squareSizeInput.value);
    const color = squareColorInput.value;
    
    if (size < 50) {
        alert('El tamaño mínimo es 50px');
        squareSizeInput.value = 50;
        return;
    }
    
    if (size > 500) {
        alert('El tamaño máximo es 500px');
        squareSizeInput.value = 500;
        return;
    }
    
    squareElement.style.width = size + 'px';
    squareElement.style.height = size + 'px';
    squareElement.style.background = color;
}

// Generar cuadrado por defecto al cargar
window.addEventListener('load', generateSquare);

// ==================== CALCULADORA ====================

const display = document.getElementById('display');
const calcButtons = document.querySelectorAll('.calc-btn');

calcButtons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        handleCalculatorInput(value);
    });
});

// Teclas del teclado
document.addEventListener('keydown', (e) => {
    const key = e.key;
    
    if (/[0-9]/.test(key)) {
        handleCalculatorInput(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        handleCalculatorInput(key);
    } else if (key === 'Enter') {
        e.preventDefault();
        handleCalculatorInput('=');
    } else if (key === '.') {
        handleCalculatorInput('.');
    } else if (key === 'Backspace') {
        handleCalculatorInput('DEL');
    } else if (key === 'Escape') {
        handleCalculatorInput('C');
    }
});

function handleCalculatorInput(value) {
    switch (value) {
        case 'C':
            clearCalculator();
            break;
        case 'DEL':
            deleteLastDigit();
            break;
        case '=':
            calculateResult();
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            setOperation(value);
            break;
        case '.':
            addDecimal();
            break;
        default:
            appendDigit(value);
    }
}

function appendDigit(digit) {
    if (shouldResetDisplay) {
        currentDisplay = digit;
        shouldResetDisplay = false;
    } else {
        if (currentDisplay === '0') {
            currentDisplay = digit;
        } else {
            currentDisplay += digit;
        }
    }
    updateDisplay();
}

function addDecimal() {
    if (shouldResetDisplay) {
        currentDisplay = '0.';
        shouldResetDisplay = false;
    } else if (!currentDisplay.includes('.')) {
        currentDisplay += '.';
    }
    updateDisplay();
}

function setOperation(op) {
    if (operation !== null && !shouldResetDisplay) {
        calculateResult();
    }
    previousValue = currentDisplay;
    operation = op;
    shouldResetDisplay = true;
}

function calculateResult() {
    if (operation === null || shouldResetDisplay) return;
    
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentDisplay);
    
    let result;
    
    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert('No se puede dividir entre 0');
                clearCalculator();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }
    
    currentDisplay = result.toString();
    operation = null;
    shouldResetDisplay = true;
    updateDisplay();
}

function deleteLastDigit() {
    if (currentDisplay.length > 1) {
        currentDisplay = currentDisplay.slice(0, -1);
    } else {
        currentDisplay = '0';
    }
    updateDisplay();
}

function clearCalculator() {
    currentDisplay = '0';
    previousValue = '';
    operation = null;
    shouldResetDisplay = false;
    updateDisplay();
}

function updateDisplay() {
    display.value = currentDisplay;
}

// ==================== CERRAR SESIÓN ====================

logoutBtn.addEventListener('click', openLogoutModal);
cancelLogout.addEventListener('click', closeLogoutModal);
confirmLogout.addEventListener('click', confirmLogoutAction);

// Click fuera del modal para cerrar
logoutModal.addEventListener('click', (e) => {
    if (e.target === logoutModal) {
        closeLogoutModal();
    }
});

function openLogoutModal() {
    logoutModal.classList.add('active');
    logoutBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        logoutBtn.style.transform = 'scale(1)';
    }, 100);
}

function closeLogoutModal() {
    logoutModal.classList.remove('active');
}

function confirmLogoutAction() {
    // Simulación de cierre de sesión
    console.log('Sesión cerrada');
    
    // Animación de salida
    document.body.style.opacity = '0';
    document.body.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        alert('¡Sesión cerrada correctamente!');
        // Aquí podrías redirigir a una página de login
        // window.location.href = 'login.html';
        
        // Por ahora, reiniciamos la página
        location.reload();
    }, 300);
}

// ==================== EFECTOS ADICIONALES ====================

// Animación de carga al inicio
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.5s ease';
    }, 100);
});

// Efecto de ripple en botones
document.addEventListener('DOMContentLoaded', () => {
    const allButtons = document.querySelectorAll('button');
    
    allButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
});

// CSS para el efecto ripple
const style = document.createElement('style');
style.textContent = `
    button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: rippleEffect 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
