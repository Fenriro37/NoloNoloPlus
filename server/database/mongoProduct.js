// ----------------------------------------------------------------------------
//                           MongoDB API - Prodotti
// ----------------------------------------------------------------------------

// Moduli
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
const config = require('./../config.js')

// productsFind
// ----------------------------------------------------------------------------
// Cerca nel DB un prodotto con un certo filtro e li ritorna in un certo
// ordine.
//
// Parametri: (filter, sortBy)
// - filter
//   È il valore che viene cercato come sottostringa negli attributi:
//   - title
//   - brand
// - sortBy
//   È un numero che ordina la ricerca in maniera crescente, se vale -1, o
//   decrescente se vale 1. L'ordine viene effettuato per il prezzo.
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
                {
                    projection: {
                        _id: 1,
                        title: 1,
                        brand: 1,
                        price: 1,
                        image: 1,
                        quality: 1
                    }
                }).sort({ price: sortBy });
        let x = await result.toArray();
        await mongo.close();
        return {
            status: 0,
            message: 'Ricerca effettuata con successo',
            obj: x
        }
    } catch(error) {
        await mongo.close();
        return {
            status: -1,
            message: 'Errore di productsFind.',
            error: error
        }
    }
}

// productsFindOne
// ----------------------------------------------------------------------------
// Cerca nel DB il prodotto con un certo id.
//
// Parametri: (id)
// - id
//   È l'id del prodotto da ricercare.
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
exports.productsFindOne = async function(id) {
    id = (/^\d+$/.test(id)) ? JSON.parse(id) : id;
    const mongo = new MongoClient(config.mongoUri, { useUnifiedTopology: true });
    try {
        await mongo.connect();
        const products = mongo.db(config.databaseName).collection(config.databaseProductCollectionName);
        const result = await products.findOne({ '_id': ObjectId(id) });
        await mongo.close();
        if(result !== null) {
            return {
                status: 0,
                message: 'Prodotto trovato con successo.',
                obj: result
            };
        } else {
            return {
                status: 1,
                message: 'Prodotto non trovato.',
                obj: result
            };
        }
    } catch(error) {
        await mongo.close();
        return {
            status: -1,
            message: 'Errore di productsFindOne.',
            error: error
        };
    }
}

// productsInsertOne
// ----------------------------------------------------------------------------
// Inserisce nel DB il prodotto passato per parametro.
//
// Parametri: (newProductData)
// - newProductData
//   È un oggetto JSON { attributo: valore } il quale viene inserito nel
//   database.
//
// Valore di ritorno: { status, message, obj, error }
// - status 
//   Indica se il programma è andato a buon fine; può essere:
//      -  0 -> OK 
//      - -1 -> Errore generico 
// - message
//   È un messaggio descrittivo.
// - obj
//   È l'oggetto inserito.
// - error
//   È il messaggio d'errore.
exports.productsInsertOne = async function(newProductData) {
    const mongo = new MongoClient(config.mongoUri, { useUnifiedTopology: true });
    try {
        await mongo.connect();
        const products = mongo.db(config.databaseName).collection(config.databaseProductCollectionName);
        let insertedProduct = {};
        await products.insertOne(newProductData, function() {
            insertedProduct = newProductData;
   
        });
        await mongo.close();
        return {
            status: 0,
            message: 'Prodotto creato correttamente.',
            obj: insertedProduct
        }
    } catch(error) {
        await mongo.close();
        return {
            status: -1,
            message: 'Errore di productsInsertOne.',
            error: error
        };
    }
}

// productsUpdateOne
// ----------------------------------------------------------------------------
// Aggirona il prodotto con un certo id con i valori passati per parametro.
//
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
//      - -1 -> Errore generico 
// - message
//   È un messaggio descrittivo.
// - obj
//   È l'oggetto che ritorna dalle API di mongodb.
// - error
//   È il messaggio d'errore.
exports.productsUpdateOne = async function(id, data) {
    console.log(data)
    const mongo = new MongoClient(config.mongoUri, { useUnifiedTopology: true });
    try {
        await mongo.connect();
        const products = mongo.db(config.databaseName).collection(config.databaseProductCollectionName);
        const filter = {'_id': ObjectId(id)};
        const updateDocument = {
            $set: data
        }
        const result = await products.updateOne(filter, updateDocument);
        await mongo.close();
        if(!result) {
            return {
                status: 1,
                message: "Errore nell'aggiornamento dei dati.",
                obj: result
            }    
        } else {
            return {
                status: 0,
                message: 'Modifica del prodotto ' + id + ' avvennuto con successo.',
                obj: result
            }
        }
    } catch(error) {
        await mongo.close();
        return {
            status: -1,
            message: 'Errore di productsUpdateOne.',
            error: error
        };
    }
}

// productsDeleteOne
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
//      -  1 -> Utente inesistente
//      - -1 -> Errore generico 
// - message
//   È un messaggio descrittivo.
// - obj
//   È l'oggetto che ritorna dalle API di mongodb.
// - error
//   È il messaggio d'errore.
exports.productsDeleteOne = async function(id) {
    const mongo = new MongoClient(config.mongoUri, { useUnifiedTopology: true });
    try {
        await mongo.connect();
        const products = mongo.db(config.databaseName).collection(config.databaseProductCollectionName);
        const filter = { _id: ObjectId(id) };
        const result = await products.deleteOne(filter);
        await mongo.close();
        if(result.deletedCount === 1) {
            return {
                status: 0,
                message: 'Il prodotto ' + id + ' è stato cancellato con successo.',
                obj: result
            }    
        } else {
            return {
                status: 1,
                message: 'Il prodotto ' + id + ' non è stato cancellato.',
                obj: result
            }
        }
    } catch(error) {
        await mongo.close();
        return {
            status: -1,
            message: 'Errore di productsDeleteOne.',
            error: error
        };
    }
}