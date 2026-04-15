# 20250413-preexam

### Report system

## Om systemet

Dette er en norsk webapplikasjon der brukere(ansatte) kan anmelde avviksmeldinger til adminstratorativet uten å avsløre seg selv. Løsningen lagrer avviksmeldinger permanent, men spam og søppelpost kan bli merket og filtert. Administratorere kan håndtere avviksmeldinger og merke fremgang.

## Funksjonelle krav

- Brukere kan å registrere, logge inn, administere og slette egen konto
- - Registrering krever en nøkkel fra en administrator
- Administratorer kan legge til sign-up nøkkler
- Brukere kan publisere avviksmeldinger(anmeldelser) annonymt 
- Administratorer kan lese og håndtere avviksmeldingene
- - Endre status på avviksmeldinger (ledig, under håndtering, løst)
- - Legge til relevante etiketter på avviksmeldinger (ulykke, brudd av rutine, spampost)
- - Skrive videre evnt notat på avviksmeldinger (?)
- - (Administratorer kan IKKE slette avviksmeldinger.)
- Avviksmeldinger skal bli sortert etter etiketter og status
- - Avviks meldinger er bare synlige for administratorer

## Driftplan

| Name          | Ip Address    | Role                  | DNS                       |
|---------------|---------------|-----------------------|---------------------------|
| preexam-dev   | 10.12.15.80   | Development server    | -                         |
| preexam-pub   | 10.12.15.81   | Production server     | preexam.borg.ikt-fag.no   |
| preexam-db    | 10.12.15.82   | Database server       | -                         |

Løsningen består av tre maskiner. (...)


## Risikoanalyse

Mulige trusler:
- Uautorisert tilgang til database 
- - Middels sannsynlighet
- - Middels alvorlighet
- - Middels risiko
- Svikt i brukerens anonymitet
- - Middels sannsynlighet
- - Stor alvorlighet
- - Stor risiko 
- Spam kontoer i systemet
- - Stor sannsynlighet
- - Lav alvorlighet
- - Lav risiko
- Uautoritisert oppdanning av administratorer
- - Stor sannsynlighet
- - Middels alvorlighet
- - Middels risiko
- Feilkonfigurerte brannmurregler
- - Middels konsekvens
- - Middels konsekvens
- - Stor risiko
- Tap av data uten backup
- - Lav sannsynlighet
- - Middels konsekvens
- - Middels risiko

Tiltak:
- Segmentert nettverk
- Hashing av brukernavn og ekskludering av kilde fra input
- Bruk av "keys" til å lage brukere
- Tilgangskontroll og admin‑autorisering
- Regelmessige sikkerhetskopier

## Tidsestimat

### Tidfrist:             48 timer

- Planlegging før prosjekt: 2 timer
- - #### Avklare krav, avgrense funksjonalitet og sikre felles forståelse av prosjektets mål.
- - Gjennomgang av oppgavetekst og vurderings kriterier
- - Svært enkel webside utforming
- - Planleggingsdokument
- - - (Om system, Funksjonelle krav, Driftplan, Risiko analyse, Tidsestimat, Kommunikasjonsplan)

- Backend-utvikling: 16 timer
- - #### Hensikt
- - Grunnlegende bruker funksjoner (login, signup, osv)
- - Hashing av passord og non-admin brukere
- - Modelstruktur av brukere og anmeldelser
- - Autentisering og autorisering
- - Keygenering til nye brukere og administratorer
- - (...)

- Frontend-utvikling: ..
- - ### Hensikt

- Drift, protocoler og brannmur: 3 timer...
- - ### Hensikt
- - Domain name system
- - Reverse proxy
- - Brannmur (ufw) [x]

- Brukerstøtte: 2 timer
- - ### Hensikt
- - 

- Annet: ... 

### Total utviklingstid:  20 timer...

## Kommunikasjonsplan

- Kunden får ukentlige statusoppdateringer.  
- Endringer avtales skriftlig før implementasjon.  
- Feil og support håndteres innenfor avtalte tidsvinduer.  
- All kommunikasjon skjer via e‑post eller avtalt kanal.

## FAQ

**Spørsmål**
Svar

## Installasjon

```bash
#For å clone repo-et
git clone https://github.com/danibir/20260413-preexam
cd 20260413-preexam
npm i
```
```bash
#For å opdatere repoet
git fetch && git pull && npm i && pm2 restart
```
```bash
#For å starte programmet
nodemon app.js
```