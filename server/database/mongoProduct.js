// ----------------------------------------------------------------------------
//                                API Prodotti
// ----------------------------------------------------------------------------

// API - MongoDB
// Metodi che si interfacciano con le API di MongoDB
// I metodi sono suddivisi per:
// - Clienti
// - Prodotti
// - Funzionari
// - Manager

const config = require('./../config.js')
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');

// productsFind
// ----------------------------------------------------------------------------
// Parametri: (filter, sortBy)
// - filter
//   È il valore che viene cercato come sottostringa negli attributi:
//   - title
//   - brand
// - sortBy
//   È l'oggetto JSON { price: valore } che indica l'ordine della ricerca
//   rispetto al prezzo. L'ordine ed può essere:
//   - -1 se è decrescente
//   - 1 se è crescente
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
exports.productsFind = async function(filter, sortBy) {
    const mongo = new MongoClient(config.mongoUri, { useUnifiedTopology: true });
    try {
        await mongo.connect();
        const products = mongo.db(config.databaseName).collection(config.databaseProductCollectionName);
        const array = filter.split(' ');
        const re = new RegExp(`\\b${filter}\\b`, 'gi');
        const result = await products.find({
                $or: [
                    { title: re },
                    { brand: re },
                    { tags: { $all: array } }
                ]},
                sortBy
            );
        let x = await result.toArray();
        await mongo.close();
        return {
            status: 0,
            message: 'Ricerca effettuata con successo',
            obj: x
        };
    } catch (error) {
        return {
            status: -1,
            message: 'Errore generico.',
            obj: error
        };
    }
}

// productsFindOne
// ----------------------------------------------------------------------------
// Parametri: (id)
// - id
//   È l'id dell'oggetto ricercato.
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
exports.productsFindOne = async function(id) {
    id = (/^\d+$/.test(id)) ? JSON.parse(id) : id;
    const mongo = new MongoClient(config.mongoUri, { useUnifiedTopology: true });
    try {
        await mongo.connect();
        const products = mongo.db(config.databaseName).collection(config.databaseProductCollectionName);
        const result = await products.findOne({ '_id': ObjectId(id) });
        if(result !== null) {
            await mongo.close();
            return {
                status: 0,
                message: 'Prodotto trovato con successo.',
                obj: result
            };
        } else {
            await mongo.close();
            return {
                status: 1,
                message: 'Prodotto non trovato.',
                obj: result
            };
        }
    } catch(error) {
        return {
            status: -1,
            message: 'Errore generico.',
            obj: error
        };
    }
}

// productsInsertOne
// ----------------------------------------------------------------------------
// Parametri: (newProductData)
// - newProductData
//   È un oggetto JSON { attributo: valore } il quale viene inserito nel
//   database.
//
// Valore di ritorno: { status, message, error }
// - status 
//   Indica se il programma è andato a buon fine; può essere:
//      -  0 -> OK 
//      - -1 -> Altro 
// - message
//   È un messaggio descrittivo.
// - error
//   È il messaggio d'errore 
exports.productsInsertOne = async function(newProductData) {
    const mongo = new MongoClient(config.mongoUri, { useUnifiedTopology: true });
    try {
        await mongo.connect();
        const products = mongo.db(config.databaseName).collection(config.databaseProductCollectionName)
        await products.insertOne(newProductData);
        await mongo.close();
        return {
            status: 0,
            message: 'Prodotto creato correttamente.'
        }
    } catch(error) {
        return {
            status: -1,
            message: 'Errore generico.',
            error: error
        };
    }
}

// productsUpdateOne
// ----------------------------------------------------------------------------
// Parametri: (id, data)
// - id
//   È l'identificativo dell'oggetto.
// - data
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
exports.productsUpdateOne = async function(id, data) {
    const mongo = new MongoClient(config.mongoUri, { useUnifiedTopology: true });
    try {
        await mongo.connect();
        const products = mongo.db(config.databaseName).collection(config.databaseProductCollectionName);
        const filter = { _id: ObjectId(id) };
        const updateDocument = {
            $set: data
        }
        const result = await products.updateOne(filter, updateDocument);
        await mongo.close()
        if(!result) {
            return {
                status: '1',
                message: "Errore nell'aggiornamento dei dati.",
                obj: result
            }    
        } else {
            return {
                status: '0',
                message: 'Modifica del prodotto ' + id + ' avvennuto con successo.',
                obj: result
            }
        }
    } catch(error) {
        return {
            status: -1,
            message: 'Errore generico.',
            error: error
        };
    }
}

// productsDeleteOne
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
exports.productsDeleteOne = async function(id) {
    const mongo = new MongoClient(config.mongoUri, { useUnifiedTopology: true });
    try {
        await mongo.connect();
        const products = mongo.db(config.databaseName).collection(config.databaseProductCollectionName);
        const filter = { _id: ObjectId(id) };
        const result = await products.deleteOne(filter);
        await mongo.close()
        if(result.deletedCount === 1) {
            return {
                status: 0,
                message: 'Il prodotto ' + id + ' è stato cancellato con successo.',
                obj: result
            }    
        } else {
            return {
                status: 1,
                message: 'Errore durante la cancellazione del prodotto.',
                obj: result
            }
        }
    } catch(error) {
        return {
            status: -1,
            message: 'Errore generico.',
            error: error
        };
    }
}
