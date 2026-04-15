# 20250413-preexam

Git: https://github.com/danibir/20260413-preexam
Backend: Node.js, Express
Frontend: EJS, CSS
Database: MongoDB
Drift: PM2, Nginx (reverse proxy), UFW
Versjonskontroll: Git + GitHub

## Om systemet

Dette er en norsk webapplikasjon der brukere(ansatte) kan anmelde avviksmeldinger til adminstratorativet uten å avsløre seg selv. Løsningen lagrer avviksmeldinger permanent, men spam og søppelpost kan bli merket og filtert. Administratorere kan håndtere avviksmeldinger og merke fremgang.

## Funksjonelle krav

- Brukere kan å registrere, logge inn, administere og slette egen konto
- - Registrering krever en nøkkel fra en administrator
- Administratorer kan legge til sign-up nøkler
- Brukere kan publisere avviksmeldinger(anmeldelser) annonymt 
- Administratorer kan lese og håndtere avviksmeldingene
- - Endre status på avviksmeldinger (ledig, under håndtering, løst)
- - Legge til relevante etiketter på avviksmeldinger (ulykke, brudd av rutine, spampost)
- - Skrive videre evnt notat på avviksmeldinger (?)
- - (Administratorer kan IKKE slette avviksmeldinger.)
- Avviksmeldinger skal bli sortert etter etiketter og status
- - Avviks meldinger er bare synlige for administratorer

## Driftplan

| Name          | Ip Address    | Role                      | DNS                       |
|---------------|---------------|---------------------------|---------------------------|
| preexam-dev   | 10.12.15.80   | Development server        | -                         |
| preexam-pub   | 10.12.15.81   | Production server         | preexam.borg.ikt-fag.no   |
| preexam-db    | 10.12.15.82   | Database server (main)    | -                         |
| preexam-db2   | 10.12.15.83   | Database server (reports) | -                         |

Løsningen består av tre maskiner. Koblinger er moderert via UFW regler.

## Risikoanalyse

| Risiko                                    | Sannsynlighet | Alvorlighet   | Risikonivå    | Tiltak                                         |
|-------------------------------------------|---------------|---------------|---------------|------------------------------------------------|
| Uautorisert tilgang til database          | Middels       | Middels       | Middels       | Segmentert nettverk                            |
| Svikt i brukerens anonymitet              | Middels       | Stor          | Stor          | Hashing av brukernavn, ekskludering av kilde   |
| Spam-kontoer i systemet                   | Stor          | Lav           | Lav           | Bruk av registreringsnøkler                    |
| Uautorisert oppretting av administratorer | Stor          | Middels       | Middels       | Tilgangskontroll og admin-autorisering         |
| Feilkonfigurerte brannmurregler           | Middels       | Middels       | Stor          | Regelmessig revisjon av UFW-regler             |
| Tap av data uten backup                   | Lav           | Middels       | Middels       | Regelmessige sikkerhetskopier                  |


## Tidsestimat

### Tidfrist:             48 timer

- Planlegging før prosjekt: 2 timer
- - #### Å etablere en tydelig forståelse av prosjektets mål, avgrense funksjonalitet, sikre felles forventninger og legge grunnlaget for en strukturert utviklingsprosess. Dette inkluderer kravavklaring, gjennomgang av vurderingskriterier og utforming av en enkel systemskisse og planleggingsdokumentasjon.
- - Gjennomgang av oppgavetekst og vurderings kriterier
- - Svært enkel webside utforming
- - Planleggingsdokument
- - - (Om system, Funksjonelle krav, Driftplan, Risiko analyse, Tidsestimat, Kommunikasjonsplan)

- Backend-utvikling: 16 timer
- - #### Å utvikle kjernesystemet som håndterer autentisering, autorisering, brukeradministrasjon og behandling av avviksmeldinger. Dette innebærer å etablere datamodeller, sikre trygg passordhåndtering, implementere nøkkelbasert registrering og bygge API‑ene som driver hele løsningen.
- - Grunnlegende bruker funksjoner (login, signup, osv)
- - Hashing av passord og non-admin brukere
- - Modelstruktur av brukere og anmeldelser
- - Autentisering og autorisering
- - Keygenering til nye brukere og administratorer

- Frontend-utvikling: 2 Timer
- - ### Å lage et enkelt, funksjonelt og brukervennlig grensesnitt som gjør det mulig for brukere og administratorer å samhandle med systemet. Dette inkluderer EJS‑maler, CSS‑stilark og gjenbrukbare partials for konsistent design.kt
- - Css for styling
- - Ejs template sider
- - Partials for felles ejs

- Drift, protocoler og brannmur: 3 timer
- - ### Å sette opp en sikker og stabil produksjonsplattform. Dette innebærer konfigurering av DNS, reverse proxy, brannmurregler og nødvendige driftsrutiner for å sikre at systemet er tilgjengelig, beskyttet og riktig eksponert.
- - Domain name system
- - Reverse proxy
- - Brannmur (ufw)

- Brukerstøtte: 3 timer
- - ### Å gjøre løsningen forståelig og tilgjengelig for brukere med ulik teknisk kompetanse. Dette inkluderer dokumentasjon, FAQ og forklaringer som reduserer behovet for direkte support og sikrer god brukeropplevelse.
- - Dokumentasjon
- - FAQ

### Total utviklingstid:  28 timer

## Kommunikasjonsplan

- Kunden får ukentlige statusoppdateringer med fremdrift, eventuelle utfordringer og plan for neste uke.
- Endringer i krav, funksjonalitet eller tidsplan avtales skriftlig før implementasjon.
- Kritiske feil meldes umiddelbart og håndteres etter avtalt prioritet.
- All kommunikasjon skjer via e‑post eller annen avtalt kanal.
- Dokumentasjon og tekniske beslutninger loggføres fortløpende slik at kunden har full innsikt i utviklingsprosessen.
- Ved behov gjennomføres korte avklaringsmøter (digitalt eller fysisk) for å sikre at prosjektet holder riktig retning.
- Kunden informeres når milepæler er nådd, og får mulighet til å gi tilbakemeldinger før neste fase starter.
- Supporthenvendelser behandles innenfor avtalte tidsvinduer og etter definerte responstider.

## FAQ
### Konto & Innlogging ###
*Hvordan oppretter jeg en konto?*
Du trenger en registreringsnøkkel fra en administrator bruker.

*Hvor får jeg tak i en registreringsnøkkel?*
En administrator bruker kan genere en for deg. De varer for 2 timer før de blir slettet av systemet.

*Hva gjør jeg hvis registreringsnøkkelen min ikke fungerer?*
Du har 5 forsøk før registreringsnøkkelen sletter seg selv. Hvis du mistenker at nøkkelen er slettet, kan du spørre om en ny nøkkel.

*Jeg har glemt passordet mitt — hva gjør jeg?*
Pga sikkerhetsgrunner kan vi ikke spore brukeren din. Hvis du glemmer passordet ditt, må du få en ny registreringsnøkkel og lage en ny bruker.

*Hvorfor må jeg logge inn for å sende avviksmeldinger hvis de er anonyme?*
Selvom avviksmeldingene er anonyme, trenger vi å autorisere avviksmeldinger - altså, vi må vite at du er faktisk ansatt.

### Avviksmeldinger ###
*Hvordan sender jeg inn en avviksmelding?*
Etter du har logget inn, kan du trykke på "Lag avviksmelding" knappen for å bli sent til en form du kan fylle ut og publisere.

*Er avviksmeldinger virkelig anonyme?*
Ingen kobling er lagt mellom brukeren og avviksmeldingen. Selv brukernavnet er hashet, så man kan ikke engang se hvem som kunne ha sendt ut en avviksmelding.

*Kan administratorer se hvem som sendte en melding?*
Nei.

*Kan jeg redigere eller slette en avviksmelding etter at den er sendt?*
Siden brukeren din ikke er tilknytter til avviksmeldingen og avviksmeldinger er bare synlig til administratorer, kan du IKKE redigere eller slette avviksmeldinger etter den er sendt.

*Hvilke typer avvik kan jeg rapportere?*
Avvikmeldingformen har ett rekke etiketter du kan basere det ifra.

*Hvorfor kan ikke administratorer slette avviksmeldinger?*
Administratorer kan ikke slette avviksmeldinger fordi de ikke skal få til å gjemme hendelser og avvik. Merk at administratorer kan gjemme avviksmeldinger som søppelpost.

### Etiketter ###
*Hva brukes etiketter til?*
Etiketter brukes til å filtrere avviksmeldinger og kalkulere hva typer avvik er vanligst/mest sjeldent.

*Kan jeg selv velge etiketter når jeg sender inn en melding?*
Ja.

### Administratorer ###
*Hva er forskjellen på en vanlig bruker og en administrator?*
En bruker kan bare lage avviksmeldinger. En administrator kan håndtere avviksmeldinger f.eks, etiketter eller status.

*Hvordan blir man administrator?*
En administrator bruker blir oppdannet ved bruk av admininstratorregistreringsnøkler istedet for vanlige registeringsnøkler. En vanlig bruker kan ikke bli en adminstrator.

*Kan administratorer opprette nye administratorer?*
Ja, men nøkkelen er merket med sin egen id, så man kan spore administrator oppdannelse.

*Kan administratorer se alle brukere?*
Nei. Alle vanlige brukere er helt gjemt fra både administratorer og det tekniske systemet.

*Kan administratorer endre eller slette brukerkontoer?*
Nei.

### Sikkerhet & Personvern ###
*Hvordan sikrer systemet anonymiteten min?*
Brukernavn blir hashet. Enten id eller brukernavn blir ikke lagret i avviksmeldinger.

*Hvilken informasjon lagres når jeg sender en avviksmelding?*
Tittel, innhold og etiketter.

*Logges IP‑adressen min?*
Nei.

*Hvordan lagres passordene mine?*
Hashet via argon2 med salt.

*Hvem har tilgang til databasen?*
Administratorer har noe tilgang til databasen.

### Tekniske spørsmål ###
*Hvor lagres dataene?*
To mongodb databaser: en designert for brukere og registrerings nøkler, en for rapporter.

*Hvorfor bruker systemet registreringsnøkler?*
Systemet bruker registreringsnøkler for å hindre spam-kontoer og uautoriserte brukere.

### Systemdrift (for mer tekniske brukere eller dokumentasjon) ###
*Hvordan oppdateres systemet?*
Projektet er oppdatert gjennom git repositoriet.

*Hvordan deployes nye versjoner?*
Nye versjoner blir pushet på produksjonsserveren.

*Hva gjør Nginx i løsningen?*
Nginx oppegår reverse proxy for å forbedre trafikk og hindre ondsinnede forespørsler.

*Hvordan håndteres brannmurregler?*
UFW. En senere versjon vil endre dette til OPNsense.

### Generelt ####
*Hvorfor finnes dette systemet?*
Dette systemet eksisterer for å la ansatte sende avviksmeldinger annonymt uten å bli sporet.

*Hvordan foreslår jeg nye funksjoner?*
Gi kontakt med ansvarlige utviklere (se git repository).

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