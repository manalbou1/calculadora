import './style.css';



const container = document.querySelector("body");

// Crear el contenedor principal para la calculadora
const divGlobal = document.createElement("div");
divGlobal.classList.add("calculator");
container.appendChild(divGlobal);

// Crear la pantalla de la calculadora
const div = document.createElement("div");
div.classList.add("screen");
div.id = "screen";
divGlobal.appendChild(div);

// Crear la lista de botones
const ul = document.createElement("ul");
ul.id = "buttons";
ul.classList.add("buttons");
divGlobal.appendChild(ul);  // Agregar la lista de botones al DOM

// Definir los botones
const botones = [
    { key: 'clear', label: 'C' },
    { key: '-', label: '-' },
    { key: '/', label: '/' },
    { key: '*', label: 'X' },
    { key: '7', label: '7' },
    { key: '8', label: '8' },
    { key: '9', label: '9' },
    { key: '-', label: '-' },
    { key: '4', label: '4' },
    { key: '5', label: '5' },
    { key: '6', label: '6' },
    { key: '+', label: '+' },
    { key: '1', label: '1' },
    { key: '2', label: '2' },
    { key: '3', label: '3' },
    { key: 'equals', label: '=', class: ['equal', 'tall']  },
    { key: '0', label: '0', class: ['wide','shift'] }, 
    { key: '.', label: '.', class: 'shift' } // Puedes eliminar esta línea si no la necesitas
];

// Bucle para crear los elementos de la lista
botones.forEach(button => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = "#"; 
    a.dataset.key = button.key; 
    a.textContent = button.label;

    if (Array.isArray(button.class)) {
        button.class.forEach(cls => a.classList.add(cls)); // Añadir clases individualmente
    } else if (button.class) {
        a.classList.add(button.class); // Añadir una sola clase
    }

    li.appendChild(a);
    ul.appendChild(li);
});

// Seleccionar la pantalla de la calculadora
const screen = document.getElementById('screen');

// Variable para almacenar la operación actual
let currentOperation = '';

// Función para actualizar la pantalla
function updateScreen(value, error = false) {
    if (error) {
        screen.style.fontSize = '1rem'; // Reducir tamaño de la fuente en caso de error
    } else {
        screen.style.fontSize = '3rem'; // Tamaño normal
    }
    screen.textContent = value;
}

// Función para limpiar la pantalla
function clearScreen() {
    currentOperation = '';
    updateScreen('');
}

// Evento para manejar los clics en los botones
document.getElementById('buttons').addEventListener('click', (event) => {
    event.preventDefault();
    
    const key = event.target.dataset.key;
    
    if (!key) return; // Si no se ha pulsado un botón válido, salir de la función
    
    if (key === 'clear') {
        clearScreen(); // Limpiar la pantalla si se pulsa 'C'
        return;
    }
    
    if (key === 'equals') {
        // Intentar calcular el valor de la operación
        try {
            const result = eval(currentOperation); // Usamos eval para calcular la operación
            if (!isFinite(result)) throw new Error('Operación no válida'); // Para prevenir divisiones por cero
            updateScreen(result.toString());
            currentOperation = result.toString(); // Actualizar la operación para nuevas operaciones
        } catch (error) {
            updateScreen('Error', true); // Mostrar mensaje de error
            console.error(error.message); // Opcional: para depuración en consola
        }
        return;
    }

    // Añadir el valor del botón pulsado a la operación actual
    currentOperation += key;
    updateScreen(currentOperation);
});
