# Progetto TecWeb 2020/2021
## Introduzione
I componenti del gruppo sono:
- Chu Han
- Maranzana Mattia
- Roversi Gianpaolo

Il progetto consiste nel realizzare un software gestionale per aziende di Noleggio.
È un full stack web application; le tecnologie utilizzate sono:
- Node.js
- Express.js
- MongoDB
- React
- Vue.js

Il sito è composto da 3 parti, i quali sono:
- front-office (realizzato in React)
- back-office (realizzato in JavaScript e jQuery)
- dashboard (realizzato in Vue.js)

## Implementazione
La directory è composta dalle sottocartelle:
- `backEnd` (server-side)
- `frontEnd` (client-side)
- `manager` (Vue CLI)
- `user` (Create React App)

- CamelNotation
- Commenti:
	- lingua italiana/inglese
	- lunghezza riga 80 caratteri (compreso)

Le API sono suddivise in due gruppi, il primo viene chiamato dal client mentre il secondo gruppo viene utilizzato per comunicare col database.  
API per il client.
```
- visitatore
	- registrazione POST /api/public/sign-up
	- login POST /api/public/login
	- vedere il catalogo GET /api/product/all

- utente
	- login POST /api/public/login
	- vedere il profilo GET /api/user
	- modifiche del profilo POST /api/user/
	- vedere il catalogo GET /api/product/all
	- vedere un prodotto GET /api/product/:id
	- noleggiare POST /api/reservation/:id
	- vedere i noleggi GET /api/reservation/all
	- vedere un noleggio GET /api/reservation/:id
	- modificare noleggio futuro POST /api/reservation/:id
	- cancellare un noleggio DELETE /api/reservation:id
	- richiedere la fattura GET /api/invoice/:id

- funzionario
	- login POST /api/public/login
	- vedere i clienti GET /api/user/all
	- vedere un cliente GET /api/user/:id
	- modificare un cliente POST /api/user/:id
	- cancellare un cliente DELETE /api/user/:id
	- vedere i prodotti GET /api/product/all
	- vedere un prodotto GET /api/product/:id
	- aggiungere un prodotto POST /api/product
	- cancellare un prodotto DELETE /api/product/:id
	- modificare un prodotto POST /api/product/:id
	- noleggiare POST /api/reservation/:id
	- vedere i noleggi GET /api/reservation/all
	- vedere un noleggio GET /api/reservation/:id
	- modificare un noleggio POST /api/reservation/:id
	- cancellare un noleggio DELETE /api/reservation:id
	- richiedere la fattura GET /api/invoice/:id

- manager (stesse funzionalità del funzionario)
	- statistiche sulle categorie dei prodotti GET /api/stat/:tag
```
Le API per MongoDB sono definite nella cartella `backEnd/database`.

### Strutture del DataBase
#### User
```js
_id: ObjectId
userName: string
userSurname: string
birthday: {
    year: int
    month: int
    day: int
}
sex: ('male', 'female', 'other')
phoneNumber: int
address: {
    addressStreet: string
    addressNumber: string
    addressCity: string
}
payment: {
    cardType: ('credit', 'debit', 'other')
    cardOwner: string
    cardCode: int
    cardExpireMonth: int
    cardExpireYear: int
    cardCVV: int
}
```
#### Worker
```js
{
    _id: ObjectId
    userName: string
    userSurname: string
    email: string
    password: string
}
```
#### Manager
```js
{
    _id: ObjectId
    userName: string
    userSurname: string
    email: string
    password: string
}

```
#### Product
```js
{
    _id: ObjectId
    title: string
    brand: string
    image: string
    description: string
    note: string
    tags: [string]
    quality: bool
    avaible: bool
    fixedPirce: double
    discount: {
        onSale: bool
        onSaleType: bool
        onSaleValue: double
    }
    price: double // giornaliero
    overDays: {
        onSale: bool
        onSaleType: bool
        onSaleValue: double
        days: int
    }
    bookings: [{
        productId: string,
        clientId: string,
        reservationId: string,
        startDate {
            year: int,
            month: int,
            day: int
        },
        endDate {
            year: int,
            month: int,
            day: int
        },
        total: double
    }]
}

```
#### Reservation
```js
{
    _id: ObjectId
    clientEmail: string
    clientName: string
    clientSurname: string
    productId: string
    productTitle: string
    productBrand: string
    productImage: string

    isTaken: bool
    isReturned: bool
    description: string
    note: string

    bookingDate: {
        year: int
        month: int
        day: int
    }
    startDate: {
        year: int
        month: int
        day: int
    }
    endDate: {
        year: int
        month: int
        day: int
    }

    variablePrice: double
    fixedPrice: double
    totalPrice: double

    fixedDiscount: {
        onSale: bool
        onSaleType: bool
        onSaleValue: double
    }
    variableDiscount: {
        onSale: bool
        onSaleType: bool
        onSaleValue: double
        days: int
    }
}
```

### Autenticazione
Il sever gestisce l'autenticazione tramite dei cookie secondo lo standard JSON Web Token.
Generalmente quando il client chiede una verifica del cookie, il server risponde con un intero che rappresenta il suo ruolo, che sono:
- 0 (utente autenticato)
- 1 (funzionario)
- 2 (manager)