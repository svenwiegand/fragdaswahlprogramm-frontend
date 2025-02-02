# fragdaswahlprogramm – Frontend
Das ist das Frontend zu [fragdaswahlprogramm](https://fragdaswahlprogramm.de) – einer KI-basierten Web-Site, die es Bürgern ermöglicht Fragen an die Programme der Parteien zur Bundestagswahl 2025 zu stellen. Das zugehörige Backend findest Du unter [hier](https://github.com/svenwiegand/fragdaswahlprogramm-backend).

## Disclaimer
Ich hatte schon länger geplant, dieses Projekt für die Bundestagswahl 2025 umzusetzen. Allerdings dachte ich, dass ich dafür bis September 2025 Zeit hätte. Kurz nach dem die Ampel-Regierung am 6. November 2024 dann aufgelöst wurde, habe ich mich an die Implementierung gemacht. Wirklich Zeit hatte ich dann erst in den Weihnachtsferien.

Da es sich hier um ein Freizeitprojekt handelt, hatte ich somit nur wenige Personentage zur Verfügung, um die Website rechtzeitig vor der vorgezogenen Bundestagswahl verfügbar zu machen. Dementsprechend gibt es diverse Kompromisse, die ich in einem normalen Projekt nicht eingehen würde:

- Keinerlei automatische Tests
- Diverse Setup-Schritte müssen manuell durchgeführt werden
- Auch das Hinzufügen weiterer Wahlprogramme erfolgt zu großen Teilen händisch

## Überblick
Das Frontend wird per Azure Static Web-Apps ausgeliefert.

## Umgebungsvariablen
Die Backend-URL wird über eine Umgebungsvariable `VITE_BACKEND_BASE_URL` definiert. Für die Entwicklung kann diese in `.env.development.local` gesetzt werden, für die Produktion muss sie zur Build-Zeit definiert sein (GitHub "Repository variables"). 

## Weitere Dokumentation
- [Hinzufügen einer neuen Partei](docs/add-party.md)