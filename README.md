Progetto TecWeb 2020/2021

CamelNotation

Lingua per i commenti: Italiano

API, divisi per soggetti:
- visitatore
    - registrazione                 POST    /api/public/sign-up/
    - login                         POST    /api/public/login/
    - vedere il catalogo            GET     /api/products
        - filtri
    - cercare un prodotto           GET     /api/product?id=...

- utente
    - vedere il profilo             GET     /api/user
    - modifiche del profilo         POST    /api/user/update?acs=1
    - noleggiare                    POST    /api/reservation?acs=1
    - vedere i noleggi              GET     /api/reservations?acs=1
    - vedere un noleggio            GET     /api/reservation?id=...&&acs=1
    - richiedere la fattura         GET     /api/invoice?id=...
    - modificare noleggio futuro    POST    /api/reservation?id=...&&acs=1

- funzionario
    - vedere i clienti              GET     /api/users
    - vedere un cliente             GET     /api/user?id=...
    - modificare un cliente         POST    /api/user/update?id=...&&acs=2
    - cancellare un cliente         DELETE  /api/user?id=...
    
    - vedere i prodotti             GET     /api/products
    - vedere un prodotto            GET     /api/product?id=...
    - aggiungere un prodotto        POST    /api/product
    - cancellare un prodotto        DELETE  /api/product?id=...
    - modificare un prodotto        POST    /api/product/update?scenario=...
        - dati                              scenario=1
        - disponibilità                     scenario=2
        - aggiunta prenotazione             scenario=3 (è meglio fare una query al DB?)
        - rimozione prenotazione            scenario=4 (è meglio fare una query al DB?)

    - vedere i noleggi              GET     /api/reservations
    - vedere un noleggio            GET     /api/reservation?id=...
    - modificare un noleggio        POST    /api/reservation?id=...&&acs=2
        - dati                              scenario=1
        - chiusura                          scenario=2
    - cancellare un noleggio        DELETE  /api/reservation?id=...

- manager
    - stat sui clienti              GET     /api/stat/user?id=...
    - sugli oggetti                 GET     /api/stat/product?id=...
    - sui dipendenti                GET     /api/stat/worker?id=...
    - sulle categorie               GET     /api/stat/category?name=...
    - sui noleggi                   GET     /api/stat/reservation?id=...

Client invia una richiesta HTTP con:
- Metodo
- URL
- Headers:
    - "Content-type": "application/json",
    - "Access-Control-Allow-Origin": "*",
    - "dataType":'jsonp'
- Parametri:
    - variabili in base all'URL
- Body
    - variabili in base all'URL

API per Mongo: https://docs.mongodb.com/drivers/node/current/
API di Mongo per il server:
- visitatore
    - registrazione
        - controllare se esiste l'email                         - clienti.findOne
        - aggiungere un cliente                                 - clienti.insertOne
    - login (controllare l'email)                               - clienti.findOne
    - vedere il catalogo                                        - prodotti.find
        - filtrare ($text)
        - ordinare (sort)
    - cercare un prodotto                                       - prodotti.findOne

- utente
    - vedere il profilo                                         - clienti.findOne
    - modifiche del profilo                                     - clienti.updateOne
    - noleggiare                                                - noleggi.insertOne
    - vedere i noleggi                                          - noleggi.find
        - ordinare (sort)
        - filtrare ($text)
    - vedere un noleggio                                        - noleggi.findOne
    - richiedere la fattura (cerca un noleggio)                 - noleggi.findOne
    - modificare un noleggio futuro
        - cercare un noleggio                                   - noleggi.findOne
        - modifica                                              - noleggi.updateOne

- funzionario
    - vedere i clienti                                          - clienti.find
        - ordinare (sort)
        - filtrare ($text)
    - vedere un cliente                                         - clienti.findOne
    - modificare un cliente                                     - clienti.updateOne
    - cancellare un cliente                                     - clienti.deleteOne    
    - vedere i prodotti                                         - prodotti.find
        - ordinare (sort)
        - filtrare ($text)
    - vedere un prodotto                                        - prodotti.findOne
    - aggiungere un prodotto                                    - prodotti.insertOne
    - cancellare un prodotto                                    - prodotti.deleteOne
    - modificare un prodotto                                    - prodotti.inserOne
        - dati
        - disponibilità
        - aggiunta prenotazione
        - rimozione prenotazione
    - vedere i noleggi                                          - noleggi.find
        - ordinare (sort)
        - filtrare ($text)
    - vedere un noleggio                                        - noleggi.findOne
    - modificare un noleggio                                    - noleggi.updateOne
    - cancellare un noleggio                                    - noleggi.deleteOne

- manager
    - stat sui clienti
    - sugli oggetti
    - sui dipendenti
    - sulle categorie
    - sui noleggi

    Si fanno find su tutto il DB