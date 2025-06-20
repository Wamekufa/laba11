// 1. Демонстрация примитивных типов данных
document.getElementById('showPrimitivesBtn').addEventListener('click', function() {
    // Примитивные типы
    const stringVar = 'Это строка';
    const numberVar = 42;
    const booleanVar = true;
    const nullVar = null;
    const undefinedVar = undefined;
    const symbolVar = Symbol('описание');
    
    // Вывод информации о типах
    let output = `
        <p><strong>String:</strong> "${stringVar}" (тип: ${typeof stringVar})</p>
        <p><strong>Number:</strong> ${numberVar} (тип: ${typeof numberVar})</p>
        <p><strong>Boolean:</strong> ${booleanVar} (тип: ${typeof booleanVar})</p>
        <p><strong>Null:</strong> ${nullVar} (тип: ${typeof nullVar})</p>
        <p><strong>Undefined:</strong> ${undefinedVar} (тип: ${typeof undefinedVar})</p>
        <p><strong>Symbol:</strong> ${symbolVar.toString()} (тип: ${typeof symbolVar})</p>
    `;
    
    document.getElementById('primitivesOutput').innerHTML = output;
});

// 2. Работа с массивами
const myArray = [1, 2, 3, 'текст', true];

// Добавление элемента в массив
document.getElementById('addToArrayBtn').addEventListener('click', function() {
    const input = document.getElementById('arrayInput');
    const value = input.value.trim();
    
    if (value) {
        // Преобразуем в число, если возможно
        const processedValue = isNaN(value) ? value : Number(value);
        myArray.push(processedValue);
        updateArrayOutput();
        input.value = '';
    }
});

// Удаление последнего элемента
document.getElementById('removeFromArrayBtn').addEventListener('click', function() {
    if (myArray.length > 0) {
        myArray.pop();
        updateArrayOutput();
    }
});

// Демонстрация методов массива
document.getElementById('showArrayMethodsBtn').addEventListener('click', function() {
    let output = `
        <p><strong>Исходный массив:</strong> [${myArray.join(', ')}]</p>
        <p><strong>Длина массива:</strong> ${myArray.length}</p>
        <p><strong>Первый элемент:</strong> ${myArray[0]}</p>
        <p><strong>Последний элемент:</strong> ${myArray[myArray.length - 1]}</p>
        <p><strong>Индекс элемента "текст":</strong> ${myArray.indexOf('текст')}</p>
        <p><strong>Массив содержит число 2:</strong> ${myArray.includes(2)}</p>
        <p><strong>Отфильтрованный массив (только числа):</strong> [${myArray.filter(item => typeof item === 'number').join(', ')}]</p>
        <p><strong>Увеличенные числа (map):</strong> [${myArray.map(item => typeof item === 'number' ? item * 2 : item).join(', ')}]</p>
        <p><strong>Сумма чисел (reduce):</strong> ${myArray.reduce((sum, item) => typeof item === 'number' ? sum + item : sum, 0)}</p>
    `;
    
    document.getElementById('arrayOutput').innerHTML = output;
});

// Функция для обновления вывода массива
function updateArrayOutput() {
    document.getElementById('arrayOutput').innerHTML = `
        <p><strong>Текущий массив:</strong> [${myArray.join(', ')}]</p>
        <p><strong>Длина массива:</strong> ${myArray.length}</p>
    `;
}

// 3. Работа с объектами
const myObject = {
    name: 'Иван',
    age: 25,
    isStudent: true,
    courses: ['Математика', 'Программирование', 'История'],
    address: {
        city: 'Гродно',
        street: 'Советская'
    }
};

// Добавление свойства в объект
document.getElementById('addToObjectBtn').addEventListener('click', function() {
    const keyInput = document.getElementById('objKeyInput');
    const valueInput = document.getElementById('objValueInput');
    
    const key = keyInput.value.trim();
    let value = valueInput.value.trim();
    
    if (key && value) {
        // Преобразуем значение, если это число или булево значение
        if (!isNaN(value)) {
            value = Number(value);
        } else if (value.toLowerCase() === 'true') {
            value = true;
        } else if (value.toLowerCase() === 'false') {
            value = false;
        }
        
        myObject[key] = value;
        keyInput.value = '';
        valueInput.value = '';
        updateObjectOutput();
    }
});

// Показать объект
document.getElementById('showObjectBtn').addEventListener('click', updateObjectOutput);

// Функция для вывода объекта
function updateObjectOutput() {
    let output = '<p><strong>Свойства объекта:</strong></p><ul>';
    
    for (const key in myObject) {
        const value = myObject[key];
        const type = typeof value;
        
        output += `<li><strong>${key}:</strong> ${value} (тип: ${type})`;
        
        if (type === 'object' && !Array.isArray(value)) {
            output += '<ul>';
            for (const subKey in value) {
                output += `<li><strong>${subKey}:</strong> ${value[subKey]}</li>`;
            }
            output += '</ul>';
        } else if (Array.isArray(value)) {
            output += ` [${value.join(', ')}]`;
        }
        
        output += '</li>';
    }
    
    output += '</ul>';
    document.getElementById('objectOutput').innerHTML = output;
}

// 4. Функции и типы
document.getElementById('calculateBtn').addEventListener('click', function() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    
    if (isNaN(num1) || isNaN(num2)) {
        document.getElementById('functionOutput').innerHTML = 
            '<p class="error">Пожалуйста, введите оба числа</p>';
        return;
    }
    
    // Функции для вычислений
    function add(a, b) { return a + b; }
    function subtract(a, b) { return a - b; }
    function multiply(a, b) { return a * b; }
    function divide(a, b) { return b !== 0 ? a / b : 'Ошибка: деление на ноль'; }
    
    const operations = [
        { name: 'Сложение', func: add },
        { name: 'Вычитание', func: subtract },
        { name: 'Умножение', func: multiply },
        { name: 'Деление', func: divide }
    ];
    
    let output = `<p><strong>Результаты для чисел ${num1} и ${num2}:</strong></p><ul>`;
    
    operations.forEach(op => {
        const result = op.func(num1, num2);
        output += `<li>${op.name}: ${result} (тип результата: ${typeof result})</li>`;
    });
    
    output += '</ul>';
    document.getElementById('functionOutput').innerHTML = output;
});