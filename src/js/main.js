import { PasswordGenerator } from './generatepassword';

// ###########################################
// ###########################################
// Global Variables

let currentPassword = [];
let clipboardState = false;

const controlsContainer = document.querySelector('#controls');
const passwordContainer = document.querySelector('#password');
const lengthContainer = document.querySelector('#length-value');

// ###########################################
// ###########################################
// Utility Func

const getRandomCharacter = (length) => {
    return Math.random().toString(16).substr(2, 1);
}

const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

// ###########################################
// ###########################################
// The Real Stuff

const animatePassword = () => {
    passwordContainer.innerHTML = '';

    const passwordElements = document.createElement('div');
    passwordElements.setAttribute('class', 'characters');
    currentPassword.forEach((character, index) => {
        const characterElement = document.createElement('div');
        characterElement.setAttribute('class', 'character');
        characterElement.setAttribute('id', `character-${index}`);
        characterElement.setAttribute('data-character', character);
        passwordElements.appendChild(characterElement);
    });
    passwordContainer.appendChild(passwordElements);

    const copyed = document.createElement('div');
    copyed.innerHTML = 'Kopieren';
    copyed.setAttribute('id', 'copyed');
    copyed.setAttribute('class', 'copyed');
    passwordContainer.appendChild(copyed);

    const characterContainers = document.querySelectorAll('.character');
    characterContainers.forEach(character => {
        animateCharacter(character)
    });
}

const animateCharacter = (element) => {
    setTimeout(() => {
        element.classList.add('show');
        setTimeout(() => {
            element.classList.add('animate');
            const maxTicker = getRandomNumber(5, 15);
            let ticker = 0;
            const letterAnimation = setInterval(() => {
                element.innerHTML = getRandomCharacter(10);
                if (ticker === maxTicker) {
                    element.classList.remove('animate');
                    element.classList.add('done');
                    element.innerHTML = element.dataset.character;
                    clearInterval(letterAnimation);
                }
                ticker++;
            }, 50);
        }, getRandomNumber(0, 150));
    }, getRandomNumber(0, 150));
}

const copyToClipBoard = () => {
    navigator.clipboard.writeText(currentPassword.join('')).then(() => {
        console.log('Async: Copying to clipboard was successful!');
        const cta = document.querySelector('#copyed');
        cta.classList.add('copyed-done');
        cta.innerHTML = 'Passwort kopiert';
        setTimeout(() => {
            cta.classList.remove('copyed-done');
        }, 500);
    });
}

const setCurrentPassword = (controls) => {
    const passwordGenerator = new PasswordGenerator();
    currentPassword = passwordGenerator.getPassword(controls);
    animatePassword();
}

const getFormValues = ($event) => {
    let controlValues = {};
    Object.keys($event.currentTarget.elements).forEach(key => {
        let element = $event.currentTarget.elements[key];
        if (element.type === 'checkbox') {
            controlValues[element.name] = element.checked;
        }
        if (element.type === 'range') {
            controlValues[element.name] = +element.value;
            lengthContainer.innerHTML = +element.value;
        }
    });
    return controlValues;
}

// ###########################################
// ###########################################
// Startup

setCurrentPassword({
    length: 45,
    specialCharacters: true,
    numbers: true,
    letters: true
});

// ###########################################
// ###########################################
// EVENTS

passwordContainer.addEventListener('click', copyToClipBoard);

controlsContainer.addEventListener('submit', ($event) => {
    $event.preventDefault();
    setCurrentPassword(getFormValues($event));
});

controlsContainer.addEventListener('change', ($event) => {
    $event.preventDefault();
    console.log(getFormValues($event));
    setCurrentPassword(getFormValues($event));
});



























































