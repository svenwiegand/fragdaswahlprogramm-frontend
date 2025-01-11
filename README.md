# fragdaswahlprogramm Frontend
Frontend für [fragdaswahlprogramm](https://fragdaswahlprogramm.de) – eine Plattform zur Förderung politischer Bildung und Transparenz.

## Hinzufügen einer neuen Partei
1. Partei im Backend hinzufügen
2. Partei-Logo von Wikipedia in der Breite 320 herunterladen und unter `public/logos/<symbol>.png` ablegen
3. Partei unter `src/common/parties.ts` hinzufügen.
 
   Der `pageOffset` bezieht sich dabei *nicht* auf die optimierte Datei im Backend, sondern auf das verlinkte Originalwahlprogramm. Einfach eine Seite im Programm öffnen und dann die folgende Rechnung durchführen: _Seitenzahl unter der Miniatur in der Seitenleiste von Vorschau_ - _auf der Seite angezeigte Seitenzahl_. Stelle vorher sicher, dass die erste Seite in den Miniaturen in Vorschau mit 1 dargestellt wird.
4. Frontend deployen
5. Weiter im Backend

## Aktualisieren eines Wahlprogramms
1. Wahlprogramm im Backend aktualisieren
2. URL `url` und `draft` in `src/common/parties.ts` anpassen
3. Frontend deployen