// ----------------------------------------------------------------------------
//                            MongoDB API - Clienti
// ----------------------------------------------------------------------------

// Moduli
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
const config = require('./../config.js')

// usersFind
// ----------------------------------------------------------------------------
// Cerca nel DB un utente con un certo filtro e li ritorna in un certo ordine.
//
// Parametri: (filter, sortBy)
// - filter
//   È il valore che viene cercato come sottostringa negli attributi:
//   - userName
//   - userSurname
//   - email
// - sortBy
//   È un numero che ordina la ricerca in maniera crescente, se vale -1, o
//   decrescente, se vale 1. L'ordine viene effettuato per cognome e nome.
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
exports.usersFind = async function(filter, sortBy) {
    const mongo = new MongoClient(config.mongoUri, { useUnifiedTopology: true });
    try {
        await mongo.connect();
        const users = mongo.db(config.databaseName).collection(config.databaseUserCollectionName);
        const re = new RegExp(`\\b${filter}\\b`, 'gi');
        const result = await users.find({
                $or: [
                    { userName: re },
                    { userSurname: re },
                    { email: re }
                ]},
                {
                    projection: {
                        _id: 1,
                        name: 1,
                        surname: 1,
                        email: 1,
                        phoneNumber: 1
                    }
                }).sort({ userSurname: sortBy, userName: sortBy });
        let x = await result.toArray();
        await mongo.close();
        return {
            status: 0,
            message: 'Ricerca effettuata con successo.',
            obj: x
        };
    } catch (error) {
        await mongo.close();
        return {
            status: -1,
            message: 'Errore di usersFind.',
            error: error
        };
    }
}

// usersFindOne
// ----------------------------------------------------------------------------
// Cerca nel DB l'utente con un certo id.
//
// Parametri: (id)
// - id
//   È un oggetto JSON { attributo: valore } dove attributo può essere:
//   - email
//   - _id
//
// Valore di ritorno: { status, message, obj, error }
// - status 
//   Indica se il programma è andato a buon fine; può essere:
//      -  0 -> OK 
//      -  1 -> Utente inesistente
//      - -1 -> Errore generico 
// - message
//   È un messaggio descrittivo.
// - obj
//   È l'oggetto che ritorna dalle API di mongodb.
// - error
//   È il messaggio d'errore.
exports.usersFindOne = async function(query) {
    const mongo = new MongoClient(config.mongoUri, { useUnifiedTopology: true });
    try {
        await mongo.connect();
        const users = mongo.db(config.databaseName).collection(config.databaseUserCollectionName);
        const result = await users.findOne(query);
        await mongo.close();
        if(result !== null) {
            return {
                status: 0,
                message: 'Utente trovato con successo.',
                obj: result
            };
        } else {
            return {
                status: 1,
                message: 'Utente non trovato.',
                obj: result
            };
        }
    } catch(error) {
        await mongo.close();
        return {
            status: -1,
            message: 'Errore di usersFindOne.',
            error: error
        };
    }
}

// usersInsertOne
// ----------------------------------------------------------------------------
// Inserisce nel DB l'utente passato per parametro.
//
// Parametri: (user)
// - user
//   È un oggetto JSON { attributo: valore } il quale viene inserito nel
//   database.
//
// Valore di ritorno: { status, message, error }
// - status 
//   Indica se il programma è andato a buon fine; può essere:
//      -  0 -> OK 
//      -  1 -> Utente esistente
//      - -1 -> Errore generico 
// - message
//   È un messaggio descrittivo.
// - error
//   È il messaggio d'errore.
exports.usersInsertOne = async function(user) {
    const mongo = new MongoClient(config.mongoUri, { useUnifiedTopology: true });
    try {
        await mongo.connect();
        const users = mongo.db(config.databaseName).collection(config.databaseUserCollectionName);
        const result = await users.findOne({ 'email': user.email });
        if(result !== null) {
            await mongo.close();
            return {
                status: 1,
                message: 'Utente esistente.'
            };
        } else {
            await users.insertOne(user);
            await mongo.close();
            return {
                status: 0,
                message: 'Utente creato correttamente.'
            };
        }
    } catch(error) {
        await mongo.close();
        return {
            status: -1,
            message: 'Errore di usersInsertOne.',
            error: error
        };
    }
}

// usersUpdateOne
// ----------------------------------------------------------------------------
// Aggirona l'utente con un certo id con i valori passati per parametro.
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
exports.usersUpdateOne = async function(id, query) {
    const mongo = new MongoClient(config.mongoUri, { useUnifiedTopology: true });
    try {
        await mongo.connect();
        const users = mongo.db(config.databaseName).collection(config.databaseUserCollectionName);
        const filter = { _id: ObjectId(id) };
        const updateDocument = {
            $set: query
        }
        const result = await users.updateOne(filter, updateDocument);
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
                message: "Modifica dell'utente " + id + ' avvennuto con successo.',
                obj: result
            }
        }
    } catch(error) {
        await mongo.close();
        return {
            status: -1,
            message: 'Errore di usersUpdateOne.',
            error: error
        };
    }
}

// usersDeleteOne
// ----------------------------------------------------------------------------
// Cancella l'utente con id passato per parametro.
//
// Parametri: (id)
// - id
//   È l'identificativo dell'oggetto da rimuovere dal database.
//
// Valore di ritorno: { status, message, obj, error }
// - status 
//   Indica se il programma è andato a buon fine; può essere:
//      -  0 -> OK 
//      -  1 -> Utente inesistente
//      - -1 -> Errore generico 
// - message
//   È un messaggio descrittivo.
// - obj
//   È l'oggetto che ritorna dalle API di mongodb.
// - error
//   È il messaggio d'errore.
exports.usersDeleteOne = async function(id) {
    const mongo = new MongoClient(config.mongoUri, { useUnifiedTopology: true });
    try {
        await mongo.connect();
        const users = mongo.db(config.databaseName).collection(config.databaseUserCollectionName);
        const filter = { _id: ObjectId(id) };
        const result = await users.deleteOne(filter);
        await mongo.close();
        if(result.deletedCount === 1) {
            return {
                status: '0',
                message: "L'utente " + id + ' è stato cancellato con successo.',
                obj: result
            }    
        } else {
            return {
                status: '1',
                message: "L'utente " + id + ' non è stato cancellato.',
                obj: result
            }
        }
    } catch(error) {
        await mongo.close();
        return {
            status: -1,
            message: 'Errore di usersDeleteOne.',
            error: error
        };
    }
}