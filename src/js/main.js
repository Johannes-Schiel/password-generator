/**
 * Import der SCSS Style Files mithilfe von
 * Vite einem Builder.
 */
import './../sass/main.sass';

import { PasswordGenerator } from './generatepassword';

// ###########################################
// ###########################################
// Global Variables

/**
 * Das aktuelle Passwort als Array von Strings (Charakters)
 */
let currentPassword = [];
/**
 * Status ob der Text des Clipboards grade animiert wird
 */
let clipboardState = false;
/**
 * HTML Element des Control Formulars
 */
const controlsContainer = document.querySelector('#controls');
/**
 * HTML Element für die Box in dem Später das Passwort angezeigt
 * werden soll. Dieses kann Theoretisch geändert werden.
 */
const passwordContainer = document.querySelector('#password');
/**
 * HTML Element für die kleine Anzeige unter dem Range Slider für das
 * anzeigen wie viele Charakter das Passwort umfassen sollte.
 */
const lengthContainer = document.querySelector('#length-value');
/**
 * Klasse die von Morpheus in seinem Video erstellt wurde, mit deren
 * Hilfe hier ein Passwort  generiert werden kann.
 */
const passwordGenerator = new PasswordGenerator();

// ###########################################
// ###########################################
// Utility Func

/**
 * Funktion zum zufälligen Erzeugen eines Buchstabens oder einer Zahl
 * @returns {string}
 */
const getRandomCharacter = () => {
	return Math.random().toString(16).substr(2, 1);
};

/**
 * Funktion zum erzeugen einer "zufälligen" Zahl mithilfe der Standart
 * JavaScript Funktion. Dabei wird die Zahl mithilfe von Math.floor()
 * auf eine Stelle gerundet.
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
const getRandomNumber = (min, max) => {
	return Math.floor(Math.random() * (max - min) + min);
};

// ###########################################
// ###########################################
// The Real Stuff

/**
 * Funktion zum animieren des Passworts bzw. zum erzeugen aller HTML
 * Element die, die einzelnen Buchstaben/Zahlen/Zeichen darstellen. Dabei
 * wird nach dem Initialen erzeugen der Elemente einfach eine weitere Funktion
 * gestartet die, die "Animation" der verschieden Zeichen steuert.
 */
const animatePassword = () => {
	// Clear des aktuellen Passwort Containers
	// TODO: hier könnte man ggf. noch eine "Fade-Out" Animation einfügen
	passwordContainer.innerHTML = '';
	// Erstellen des Parent Div Elements das alle Buchstaben umfasst.
	const passwordElements = document.createElement('div');
	passwordElements.setAttribute('class', 'characters');
	// Geht durch jeden Buchstaben des aktuellen Passwortes das durch
	// Morpheus Klasse erzeugt wurde um jeden in ein eigenes Element zu verpacken.
	currentPassword.forEach((character, index) => {
		// Erzeugt einen Div Container für jedes Zeichen/Zahl/Buchstaben
		// des Passwortes
		const characterElement = document.createElement('div');
		characterElement.setAttribute('class', 'character');
		characterElement.setAttribute('id', `character-${index}`);
		// Mithilfe dieses Zeile bzw. des Data Attributes, merken wir uns
		// was der wirkliche Wert dieses Zeichen später sein sollte.
		characterElement.setAttribute('data-character', character);
		passwordElements.appendChild(characterElement);
	});
	passwordContainer.appendChild(passwordElements);
	// Erstellt einen CTA für das Kopieren des Passworts in die
	// Zwischenablage des Nutzers
	const copyed = document.createElement('div');
	copyed.innerHTML = 'Kopieren';
	copyed.setAttribute('id', 'copyed');
	copyed.setAttribute('class', 'copyed');
	passwordContainer.appendChild(copyed);
	// Startet die Animation für jedes einzelne Passwort Element
	const characterContainers = document.querySelectorAll('.character');
	characterContainers.forEach((character) => {
		animateCharacter(character); // <- der Spannendene Part!
	});
};

/**
 * Funktion zum animieren eines Zeichen/Buchstabens/Zahl des
 * Passwortes mithilfe von SASS & JavaScript.
 * @param {HTMLElement} element Element das animiert werden soll.
 */
const animateCharacter = (element) => {
	// wartet auf das abschließen der Animation in SASS
	setTimeout(() => {
		// Fügt eine CSS Klasse hinzu mit der eine weitere
		// Animation getriggert wird die durch CSS ausgeführt wird.
		element.classList.add('show');
		// erstellt einen TimeOut per Zufall sodas jede
		// Animation jedes Zeichen etwas unterschiedlich abläuft.
		setTimeout(() => {
			// Startet die Animation der durchlaufenden Zahlen/Buchstaben
			element.classList.add('animate');
			// Setzt die maximale Anzahl als Durchläufe
			const maxTicker = getRandomNumber(5, 15);
			// Der aktuellen Stand der Durchläufe
			let ticker = 0;
			// durchläuft so lange den Interval bis die maximale
			// Anzahl der Durchläufe die oben definiert wurde ereigt wurde.
			const letterAnimation = setInterval(() => {
				// setzt eine Zufällige Ziffer in das HTML Element
				element.innerHTML = getRandomCharacter(10);
				// Kontrolliert ob das Ende der Animation erreicht wurde
				if (ticker === maxTicker) {
					// Stopt die Animation
					element.classList.remove('animate');
					// setzt den "Fertig" State in CSS
					element.classList.add('done');
					// setzt den korrekten Wert aus Morpheus Passwort wieder ein
					element.innerHTML = element.dataset.character;
					// löscht den Interval
					clearInterval(letterAnimation);
				}
				// zählt den Ticker einen hoch
				ticker++;
			}, 50);
		}, getRandomNumber(0, 150));
	}, getRandomNumber(0, 150));
};

/**
 * Funktion zum kopieren des Passwortes in das Clipboard (Zwischenablage) des
 * Nutzers macht, so die weitere Nutzung einfacher.
 */
const copyToClipBoard = () => {
	if (!clipboardState) {
		clipboardState = true;
		// Fügt das Passwort zu einem String zusammen und fügt es dem Clipboard hinzu
		navigator.clipboard.writeText(currentPassword.join('')).then(() => {
			// Sucht den CTA wo der Text geändert werden soll.
			const cta = document.querySelector('#copyed');
			// startet eine Animation in CSS
			cta.classList.add('copyed-done');
			// Ändert den Text
			cta.innerHTML = 'Passwort kopiert';
			setTimeout(() => {
				// entfernt die CSS Klasse der Animation, so kann man
				// bei erneutem Klick die Animation nochmal starten.
				cta.classList.remove('copyed-done');
				// setzt den Status wieder zurück
				clipboardState = false;
			}, 500);
		});
	}
};

/**
 * Funktion zum Abfragen eines Passwortes von Morpheus Klasse sowie dem zuweisen
 * des aktuellen aktiven Passwortes in diesem Script {currentPassword}
 * @param {JSON} controls JSON Objekt aller Formularwerte bzw. Einstellungen die, Morpheus Klasse erwartet
 */
const setCurrentPassword = (controls) => {
	// setzt das aktuelle Passwort mithilfe von Morpheus Klasse
	currentPassword = passwordGenerator.getPassword(controls);
	// startet die Animation
	animatePassword();
};

/**
 * Funktion zum erzeugen eines JSON Objektes mit allen Values eines Formulars
 * dieses Funktion erwartet ein Submit oder ein Change Event
 * @param {Event} $event Event das durch das Formular getriggert wurde.
 * @returns {JSON}
 */
const getFormValues = ($event) => {
	// setzt das JSON Objekt
	let controlValues = {};
	// geht innerhalb des Event Targets durch jedes Element (Inputfield)
	Object.keys($event.currentTarget.elements).forEach((key) => {
		// mithilfe des Keys wird jedes Input Feld angesprochen
		let element = $event.currentTarget.elements[key];
		// Sofern es eine Checkbox is, ist das Value "checked/not checked"
		if (element.type === 'checkbox') {
			controlValues[element.name] = element.checked;
		}
		// Sofern es ein Range Slider ist, muss das value noch zu einer Zahl
		// konvertiert werden und anschließend in die Anzeige geladen werden
		// so weiß der Nutzer auch was er grade ausgewählt hat.
		if (element.type === 'range') {
			controlValues[element.name] = +element.value;
			lengthContainer.innerHTML = +element.value;
		}
	});
	return controlValues;
};

// ###########################################
// ###########################################
// Startup

// Startet am Beginn einmal das generieren des Passworts
// mit den Default Einstellungen.
setCurrentPassword({
	length: 45,
	specialCharacters: true,
	numbers: true,
	letters: true,
	lockedSpecialCharacters: false,
});

// ###########################################
// ###########################################
// EVENTS

// Event wenn man das Passwort bzw. in den Passwort Container klicked
// damit dieses in das Clipboard copiert werden kann.
passwordContainer.addEventListener('click', copyToClipBoard);

// Event für das Abschicken des Control Formulars mithilfe des Buttons
controlsContainer.addEventListener('submit', ($event) => {
	// Verhindert das neu laden der Seite
	$event.preventDefault();
	// Generiert aus dem Formular alle Values & setzt
	// ein neu generiertes Passwort
	setCurrentPassword(getFormValues($event));
});

controlsContainer.addEventListener('change', ($event) => {
	// Verhindert das neu laden der Seite
	$event.preventDefault();
	// Generiert aus dem Formular alle Values & setzt
	// ein neu generiertes Passwort
	setCurrentPassword(getFormValues($event));
});

// Dieser Bereich ist nicht teil des Videos und wurde nachträglich ergänzt
controlsContainer.addEventListener('input', ($event) => {
	// Verhindert das neu laden der Seite
	$event.preventDefault();
	// Lädt bei jeder Änderung den Wert in die Anzeige
	getFormValues($event);
});
