// ----------------------------------------------------------------------------
//                          MongoDB API - Prenotazione
// ----------------------------------------------------------------------------

// Moduli
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
const config = require('./../config.js')

// reservationsFind
// ----------------------------------------------------------------------------
// Cerca nel DB una prenotazione con un certo filtro e li ritorna in un certo
// ordine.
//
// Parametri: (token, filter, sortBy)
// - token
//   È un token che serve per controllare il tipo di ricerca da effettuare.
// - filter
//   È il valore che viene cercato come sottostringa negli attributi:
//   - clientEmail
//   - clientName
//   - clientSurname
//   - productId
//   - productTitle
//   - productBrand
// - sortBy
//   È un numero che ordina la ricerca in maniera crescente, se vale -1, o
//   decrescente se vale 1. L'ordine viene effettuato per data di prenotazione.
//
// Valore di ritorno: { status, message, obj, error }
// - status 
//   Indica se il programma è andato a buon fine; può essere:
//      -  0 -> OK 
//      - -1 -> Altro 
// - message
//   È un messaggio descrittivo.
// - obj
//   È l'oggetto che ritorna dalle API di mongodb
// - error
//   È il messaggio d'errore 
exports.reservationsFind = async function(token, filter, sortBy) {
    const mongo = new MongoClient(config.mongoUri, { useUnifiedTopology: true });
    try {
        await mongo.connect();
        const reservations = mongo.db(config.databaseName).collection(config.databaseReservationCollectionName);
        const re = new RegExp(`\\b${filter}\\b`, 'gi');
        let result;
        if(token.status == 0) {
            result = await reservations.find({
                $and: [
                    { clientEmail: token.email },
                    $or [
                        { productId: re },
                        { productTitle: re },
                        { productBrand: re }
                    ]
                ]}).sort({ 'bookingDate.year': sortBy, 'bookingDate.month': sortBy, 'bookingDate.day': sortBy});
        } else {
            result = await reservations.find({
                $or: [
                    { clientName: re },
                    { clientSurname: re },
                    { clientEmail: re },
                    { productId: re },
                    { productTitle: re },
                    { productBrand: re }
                ]}).sort({ 'bookingDate.year': sortBy, 'bookingDate.month': sortBy, 'bookingDate.day': sortBy});
        }
        const x = await result.toArray();
        await mongo.close();
        return {
            status: 0,
            message: 'Ricerca effettuata con successo',
            obj: x
        };
    } catch (error) {
        await mongo.close();
        return {
            status: -1,
            message: 'Errore di reservationsFind.',
            obj: error
        };
    }
}

// reservationsFindOne
// ----------------------------------------------------------------------------
// Cerca nel DB la prenotazione con un certo id.
//
// Parametri: (id)
// - id
//   È l'id della prenotazione da ricercare.
//
// Valore di ritorno: { status, message, obj, error }
// - status 
//   Indica se il programma è andato a buon fine; può essere:
//      -  0 -> OK 
//      - -1 -> Errore generico 
// - message
//   È un messaggio descrittivo.
// - obj
//   È l'oggetto che ritorna dalle API di mongodb.
// - error
//   È il messaggio d'errore.
exports.reservationsFindOne = async function(id) {
    const mongo = new MongoClient(config.mongoUri, { useUnifiedTopology: true });
    try {
        await mongo.connect();
        const reservations = mongo.db(config.databaseName).collection(config.databaseReservationCollectionName);
        const result = await reservations.findOne({ '_id': ObjectId(id) });
        await mongo.close();
        if(result !== null) {
            return {
                status: 0,
                message: 'Prenotazione trovata con successo.',
                obj: result
            };
        } else {
            return {
                status: 1,
                message: 'Prenotazione non trovata.',
                obj: result
            };
        }
    } catch(error) {
        await mongo.close();
        return {
            status: -1,
            message: 'Errore di reservationsFindOne.',
            obj: error
        };
    }
}

// reservationsInsertOne
// ----------------------------------------------------------------------------
// Inserisce nel DB la prenotazione passata per parametro.
//
// Parametri: (newReservation)
// - newReservation
//   È un oggetto JSON { attributo: valore } il quale viene inserito nel
//   database.
//
// Valore di ritorno: { status, message, error }
// - status 
//   Indica se il programma è andato a buon fine; può essere:
//      -  0 -> OK 
//      - -1 -> Errore generico 
// - message
//   È un messaggio descrittivo.
// - error
//   È il messaggio d'errore.
exports.reservationsInsertOne = async function(newReservation) {
    const mongo = new MongoClient(config.mongoUri, { useUnifiedTopology: true });
    try {
        await mongo.connect();
        const reservations = mongo.db(config.databaseName).collection(config.databaseReservationCollectionName)
        await reservations.insertOne(newReservation);
        await mongo.close();
        return {
            status: 0,
            message: 'Prenotazione creata correttamente.'
        };
    } catch(error) {
        await mongo.close();
        return {
            status: -1,
            message: 'Errore di reservationsInsertOne.',
            error: error
        };
    }
}

// reservationsUpdateOne
// ----------------------------------------------------------------------------
// Aggirona il prodotto con un certo id con i valori passati per parametro.
//
// Parametri: (id, query)
// - id
//   È l'identificativo dell'oggetto.
// - query
//   È un oggetto JSON { attributo: valore } e i suoi attributi sono i campi da
//   aggiornare. Gli attributi coincidono con quelli del database.
//
// Valore di ritorno: { status, message, obj, error }
// - status 
//   Indica se il programma è andato a buon fine; può essere:
//      -  0 -> OK 
//      -  1 -> Errore durante l'aggiornamento dei dati
//      - -1 -> Errore generico 
// - message
//   È un messaggio descrittivo.
// - obj
//   È l'oggetto che ritorna dalle API di mongodb.
// - error
//   È il messaggio d'errore.
exports.reservationsUpdateOne = async function(id, query) {
    const mongo = new MongoClient(config.mongoUri, { useUnifiedTopology: true });
    try {
        await mongo.connect();
        const reservations = mongo.db(config.databaseName).collection(config.databaseReservationCollectionName);
        const filter = { _id: ObjectId(id) };
        const updateDocument = {
            $set: query
        }
        const result = await reservations.updateOne(filter, updateDocument);
        await mongo.close();
        if(!result) {
            return {
                status: '1',
                message: "Errore nell'aggiornamento dei dati.",
                obj: result
            }    
        } else {
            return {
                status: '0',
                message: 'Modifica della prenotazione ' + id + ' avvennuto con successo.',
                obj: result
            }
        }
    } catch(error) {
        await mongo.close();
        return {
            status: -1,
            message: 'Errore di reservationsUpdateOne.',
            error: error
        };
    }
}

// reservationsDeleteOne
// ----------------------------------------------------------------------------
// Cancella il prodotto con id passato per parametro.
//
// Parametri: (id)
// - id
//   È l'identificativo dell'oggetto da rimuovere dal database.
//
// Valore di ritorno: { status, message, obj, error }
// - status 
//   Indica se il programma è andato a buon fine; può essere:
//      -  0 -> OK 
//      -  1 -> Prenotazione inesistente
//      - -1 -> Errore generico 
// - message
//   È un messaggio descrittivo.
// - obj
//   È l'oggetto che ritorna dalle API di mongodb.
// - error
//   È il messaggio d'errore.
exports.reservationsDeleteOne = async function(id) {
    const mongo = new MongoClient(config.mongoUri, { useUnifiedTopology: true });
    try {
        await mongo.connect();
        const reservations = mongo.db(config.databaseName).collection(config.databaseReservationCollectionName);
        const filter = { _id: ObjectId(id) };
        const result = await reservations.deleteOne(filter);
        await mongo.close();
        if(result.deletedCount === 1) {
            return {
                status: '0',
                message: 'La prenotazione ' + id + ' è stata cancellata con successo.',
                obj: result
            }    
        } else {
            return {
                status: '1',
                message: 'La prenotazione ' + id + ' non è stato cancellato.',
                obj: result
            }
        }
    } catch(error) {
        await mongo.close();
        return {
            status: -1,
            message: 'Errore di reservationsDeleteOne.',
            error: error
        };
    }
}