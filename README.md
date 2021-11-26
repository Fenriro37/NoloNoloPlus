Progetto TecWeb 2020/2021

CamelNotation

Commenti
- lingua italiana
- lunghezza riga 80 caratteri (compreso)

API, divisi per soggetti: https://docs.google.com/spreadsheets/d/1dEVxP9BbVEQvrEBZx4rU8eIZVVpmbJnehbhby7xwTsQ/edit#gid=0
```
- visitatore
    - registrazione                 POST    /api/public/sign-up/
    - login                         POST    /api/public/login/
    - vedere il catalogo            GET     /api/products
        - filtri

- utente
    - vedere il profilo             GET     /api/user
    - modifiche del profilo         POST    /api/user/update
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
```

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
```
- visitatore
    - registrazione
        - controllare se esiste l'email                         - clienti.findOne (controllare l'email)
        - aggiungere un cliente                                 - clienti.insertOne
    - login                                                     - clienti.findOne (controllare l'email)
        - se è un cliente
        - se è un dipendente
    - vedere il catalogo                                        - prodotti.find
        - filtrare ($text)
        - ordinare (sort)

- utente
    - vedere il profilo                                         - clienti.findOne (controllare l'email o l'id)
    - modifiche del profilo                                     - clienti.updateOne
    - noleggiare                                                - noleggi.insertOne
    - vedere i noleggi                                          - noleggi.find
        - ordinare (sort)
        - filtrare ($text)
    - vedere un noleggio                                        - noleggi.findOne (by id)
    - richiedere la fattura (cerca un noleggio)                 - noleggi.findOne (by id)
    - modificare un noleggio futuro
        - cercare un noleggio                                   - noleggi.findOne (by id)
        - modifica                                              - noleggi.updateOne

- funzionario
    - vedere i clienti                                          - clienti.find
        - ordinare (sort)
        - filtrare ($text)
    - vedere un cliente                                         - clienti.findOne (controllare l'email o l'id)
    - modificare un cliente                                     - clienti.updateOne
    - cancellare un cliente                                     - clienti.deleteOne    
    - vedere i prodotti                                         - prodotti.find
        - ordinare (sort)
        - filtrare ($text)
    - vedere un prodotto                                        - prodotti.findOne (controllare l'email o l'id)
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
    - vedere un noleggio                                        - noleggi.findOne (by id)
    - modificare un noleggio                                    - noleggi.updateOne
    - cancellare un noleggio                                    - noleggi.deleteOne

- manager
    - stat sui clienti
    - sugli oggetti
    - sui dipendenti
    - sulle categorie
    - sui noleggi
```

**NB:** `sort` è un JSON del tipo: `{ attribututeToSort: value }` dove `value` vale:
- `1` se è crescente
- `-1` se è decrescente