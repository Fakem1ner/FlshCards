let card = document.querySelector('#card');
let question = document.querySelector('#question');

let readLocalStorage = variable => {
    if(localStorage.getItem(variable)) {
        return localStorage.getItem(variable);
    }
    else {
        localStorage.setItem(variable, '0');
        return localStorage.getItem(variable);
    }
};

question.addEventListener('click', e => {
    card.classList.add('opened');
});

let addButton = document.querySelector('#add');

addButton.addEventListener('click', e => {
    let type = document.querySelector('#category').value;
    let nextOfType = Number(readLocalStorage(`LastOf${type}`)) + 1;
    localStorage.setItem(`LastOf${type}`, Number(readLocalStorage(`LastOf${type}`)) + 1);

    let newQuestion = document.querySelector('#new-question').value;
    let newAnswer = document.querySelector('#new-answer').value;
    let newType = document.querySelector('#category').value;
    let newNumber = readLocalStorage(`LastOf${type}`)

    localStorage.setItem(`${newType}_${newNumber}_question`, newQuestion);
    localStorage.setItem(`${newType}_${newNumber}_answer`, newAnswer);

    console.log(`Создана новая карточка. Тип: ${newType}; Номер: ${newNumber}; Вопрос: ${newQuestion}; Ответ: ${newAnswer}`)
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

let startButton = document.querySelector('#continue');

let answer = document.querySelector('#answer');

startButton.addEventListener('click', e => {
    let type = document.querySelector('#category').value;
    let number = getRandomInt(0, readLocalStorage(`LastOf${type}`)) + 1;

    if(type == '') {
        question.innerHTML = 'Выберите категорию!';
    }
    else {
        card.classList.remove('opened')
    
        answer.innerHTML = localStorage.getItem(`${type}_${number}_answer`);
        question.innerHTML = localStorage.getItem(`${type}_${number}_question`);
    }
});

let addCategory = document.querySelector('#add-category');

addCategory.addEventListener('click', e => {
    let newCategoryName = document.querySelector('#new-category-name').value;

    localStorage.setItem('categories', localStorage.getItem('categories') + `&${newCategoryName}`);
});

let category = document.querySelector('#category');

function setup() {
    if(!localStorage.getItem('categories')) {
        localStorage.setItem('categories', 'Основная');
    }
    
    let categories = localStorage.getItem('categories').split('&');
    console.log(categories);
    categories.forEach(Category => {
        category.innerHTML = category.innerHTML + `<option class="category__option" value="${Category}">${Category}</option>`;
    });
}

setup();