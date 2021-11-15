// API - MongoDB
// Metodi che si interfacciano con le API di MongoDB
// I metodi sono suddivisi per:
// - Clienti
// - Prodotti
// - Funzionari
// - Manager

const config = require("./../config.js")
const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");
var path = require('path');

// ----------------------------------------------------------------------------
//                                 API Clienti
// ----------------------------------------------------------------------------

// usersFind
// ----------------------------------------------------------------------------
// Parametri: (filter, sortBy)
// - filter
//   È il valore che viene cercato come sottostringa negli attributi:
//   - userName
//   - userSurname
//   - email
// - sortBy
//   È l'oggetto JSON { attributo1: valore, attributo2: valore } che indica
//   l'ordine della ricerca. Entrambi gli attributi devono essere specificati e
//   può essere di due tipi:
//   - userName
//   - userSurname
//   Il primo attributo è più potente del secondo attributo: ordina col secondo
//   in caso di parità.
//   Indica l'ordine ed può essere:
//   - -1 se è decrescente
//   - 1 se è crescente
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
                sortBy
            );
        let x = await result.toArray();
        await mongo.close();
        return {
            status: 0,
            message: "Ricerca effettuata con successo",
            obj: x
        };
    } catch (error) {
        return {
            status: -1,
            message: "Errore generico.",
            obj: error
        };
    }
}

// usersFindOne
// ----------------------------------------------------------------------------
// Parametri: (query)
// - query
//   È un oggetto JSON { attributo: valore } e il suo attributo deve coincidere
//   con gli attributo nel DB; il valore dev'essere unico nel database.
//
// Valore di ritorno: { status, message, obj, error }
// - status 
//   Indica se il programma è andato a buon fine; può essere:
//      -  0 -> OK 
//      -  1 -> Utente inesistente
//      - -1 -> Altro 
// - message
//   È un messaggio descrittivo.
// - obj
//   È l'oggetto che ritorna dalle API di mongodb
// - error
//   È il messaggio d'errore 
exports.usersFindOne = async function(query) {
    const mongo = new MongoClient(config.mongoUri, { useUnifiedTopology: true });
    try {
        await mongo.connect();
        const users = mongo.db(config.databaseName).collection(config.databaseUserCollectionName);
        const result = await users.findOne(query);
        if(result !== null) {
            await mongo.close();
            return {
                status: 0,
                message: "Utente trovato con successo.",
                obj: result
            };
        } else {
            await mongo.close();
            return {
                status: 1,
                message: "Utente non trovato.",
                obj: result
            };
        }
    } catch(error) {
        return {
            status: -1,
            message: "Errore generico.",
            obj: error
        };
    }
}

// usersInsertOne
// ----------------------------------------------------------------------------
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
//      - -1 -> Altro 
// - message
//   È un messaggio descrittivo.
// - error
//   È il messaggio d'errore 
exports.userInsertOne = async function(user) {
    const mongo = new MongoClient(config.mongoUri, { useUnifiedTopology: true });
    try {
        await mongo.connect();
        const users = mongo.db(config.databaseName).collection(config.databaseUserCollectionName)
        const result = await users.findOne(user.email)
        if(result !== null) {
            await mongo.close();
            return {
                status: 1,
                message: "Utente esistente."
            };
        } else {
            await users.insertOne(user);
            await mongo.close();
            return {
                status: 0,
                message: "Utente creato correttamente."
            };
        }
    } catch(error) {
        return {
            status: -1,
            message: "Errore generico.",
            error: error
        };
    }
}

// usersUpdateOne
// ----------------------------------------------------------------------------
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
//      - -1 -> Altro 
// - message
//   È un messaggio descrittivo.
// - obj
//   È l'oggetto che ritorna dalle API di mongodb
// - error
//   È il messaggio d'errore 
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
        await mongo.close()
        if(!result) {
            return {
                status: "1",
                message: "Errore nell'aggiornamento dei dati.",
                obj: result
            }    
        } else {
            return {
                status: "0",
                message: "Modifica dell'utente " + id + " avvennuto con successo.",
                obj: result
            }
        }
    } catch(error) {
        return {
            status: -1,
            message: "Errore generico.",
            error: error
        };
    }
}

// usersDeleteOne
// ----------------------------------------------------------------------------
// Parametri: (id)
// - id
//   È l'identificativo dell'oggetto da rimuovere dal database.
//
// Valore di ritorno: { status, message, obj, error }
// - status 
//   Indica se il programma è andato a buon fine; può essere:
//      -  0 -> OK 
//      -  1 -> Utente inesistente
//      - -1 -> Altro 
// - message
//   È un messaggio descrittivo.
// - obj
//   È l'oggetto che ritorna dalle API di mongodb
// - error
//   È il messaggio d'errore 
exports.usersDeleteOne = async function(id) {
    const mongo = new MongoClient(config.mongoUri, { useUnifiedTopology: true });
    try {
        await mongo.connect();
        const users = mongo.db(config.databaseName).collection(config.databaseUserCollectionName);
        const filter = { _id: ObjectId(id) };
        const result = await users.deleteOne(filter);
        await mongo.close()
        if(result.deletedCount === 1) {
            return {
                status: "0",
                message: "L'utente " + id + " è stato cancellato con successo.",
                obj: result
            }    
        } else {
            return {
                status: "1",
                message: "Errore durante la cancellazione dell'utente.",
                obj: result
            }
        }
    } catch(error) {
        return {
            status: -1,
            message: "Errore generico.",
            error: error
        };
    }
}