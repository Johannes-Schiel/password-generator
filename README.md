# Passwort Generator Tutorial

[![Build](https://github.com/Johannes-Schiel/password-generator/actions/workflows/node.yml/badge.svg?branch=master)](https://github.com/Johannes-Schiel/password-generator/actions/workflows/node.yml)

In diesem Repository liegt der Code aus dem gemeinsamen YouTube Tutorial von [The Morpheus Tutorials](https://www.youtube.com/user/TheMorpheus407) und [Unleashed Design](https://www.youtube.com/c/UnleashedDesign).

Live: [Live Demo](https://johannes-schiel.github.io/password-generator/)

Tutorial für die Generierung eines sicheren Passworts mit JavaScript: zum [Tutorial](https://www.youtube.com/watch?v=OXW1lu-bLk8).

Tutorial für die Entwicklung eines coolen, animierten Front-Ends: zum [Tutorial](https://youtu.be/kO68Gn-kuFY)

## Get started
### Plain

`git clone https://github.com/Johannes-Schiel/password-generator.git` für das Clonen des Projekts auf deinen Desktop.

`cd /password-generator` geht in das Projekt.

`npm i` ist der Befehl, damit alle NPM packages und abhängigkeiten Installiert werden die in diesem Projekt genutzt werden.

`npm run dev` ist der Befehl, der für das Starten der Umgebung erforderlich ist, alles auf einmal baut und auf Änderungen wartet. Hierbei wird ein Liveserver inkl. Browser-Refresh gestartet. Wenn du wissen willst wie das alles Funktioniert findest du [hier](https://github.com/Johannes-Schiel/ud-basic-webdev-setup) eine erklärung.

`npm run build` ist der Build-Befehl, hierbei wird alles gebaut und im `dist/` Verzeichnis hinterlegt. Es wird nicht auf Änderungen an Dateien gewartet.

### Docker
Docker installieren: [Docker](https://docs.docker.com/get-docker/)

`docker run -p 3000:3000 ghcr.io/johannes-schiel/password-generator:master`
### Docker Compose
`git clone https://github.com/Johannes-Schiel/password-generator.git` für das Clonen des Projekts auf deinen Desktop.

`cd /password-generator` geht in das Projekt.

Docker container starten mit: `docker-compose up -d`

