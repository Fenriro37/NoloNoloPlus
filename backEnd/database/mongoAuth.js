// ----------------------------------------------------------------------------
//                           MongoDB API - Autenticazione
// ----------------------------------------------------------------------------

// Moduli
const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('./../config');

// auth
// ----------------------------------------------------------------------------
// Cerca nel database l'utente passato per parametro e ritorna il suo livello
// di accessibilità.
//
// Parametri: (query)
// - query
//   È un oggetto JSON di tipo { attributo: valore } dove l'attributo è _id e
//   e il valore è un ObjectId
//
// Valore di ritorno: { status, message, error }
// - status 
//   Indica se il programma è andato a buon fine e il livello d'accessibilità
//   del cliente, che può essere:
//      - -2 -> Utente inesistente
//      - -1 -> Errore generico
//      -  0 -> Cliente
//      -  1 -> Funzionario
//      -  2 -> Manager
// - message
//   È un messaggio descrittivo.
// - error
//   È l'errore. 
exports.auth = async function(query) {
    const mongo = new MongoClient(config.mongoUri, { useUnifiedTopology: true });
    try {
        await mongo.connect();
        const users = mongo.db(config.databaseName).collection(config.databaseUserCollectionName);
        const workers = mongo.db(config.databaseName).collection(config.databaseWorkerCollectionName);
        const managers = mongo.db(config.databaseName).collection(config.databaseManagerCollectionName);
        if(await users.findOne(query) != null) {
            await mongo.close();
            return {
                status: 0,
                message: 'Cliente',
            }
        } else if(await workers.findOne(query) != null) {
            await mongo.close();
            return {
                status: 1,
                message: 'Funzionario'
            }
        } else if(await managers.findOne(query) != null) {
            await mongo.close();
            return {
                status: 2,
                message: 'Manager'
            }
        } else {
            await mongo.close();
            return {
                status: -2,
                message: 'Utente inesistente'
            }
        }
    } catch (error) {
        await mongo.close();
        return {
            status: -1,
            message: 'Errore di auth.',
            obj: error
        }
    }
}

// login
// ----------------------------------------------------------------------------
// Cerca nel database l'utente, sottoforma di email, passato per parametro e
// controlla se la password combacia con la password inviata per parametro.
//
// Parametri: (queryEmail, plainTextPassword)
// - queryEmail
//   È l'email da cercare nel database
// - plainTextPassord
//   È la password da confrontare con quella nel database
//
// Valore di ritorno: { status, message, error }
// - status 
//   Indica se il programma è andato a buon fine e il livello d'accessibilità
//   del cliente, che può essere:
//      - -3 -> Errore dell'email
//      - -2 -> Errore della password
//      - -1 -> Errore generico
//      -  0 -> OK (cliente)
//      -  1 -> OK (funzionario)
//      -  2 -> OK (manager)
// - message
//   È un messaggio descrittivo.
// - error
//   È l'errore. 
exports.login = async function(queryEmail, plainTextPassword) {
    const mongo = new MongoClient(config.mongoUri, { useUnifiedTopology: true });
    try {
        await mongo.connect();
        const users = mongo.db(config.databaseName).collection(config.databaseUserCollectionName);
        const workers = mongo.db(config.databaseName).collection(config.databaseWorkerCollectionName);
        const managers = mongo.db(config.databaseName).collection(config.databaseManagerCollectionName);

        const resultUser = await users.findOne({ email: queryEmail });
        const resultWorker = await workers.findOne({ email: queryEmail });
        const resultManager = await managers.findOne({ email: queryEmail });
        
        await mongo.close();

        if(resultUser != null) {
            if(await bcrypt.compare(plainTextPassword, resultUser.password) === true) {
                // È un cliente
                const token = jwt.sign(
                    {
                        id: resultUser._id,
                        email: resultUser.email
                    },
                    config.JSONWebTokenKey
                );
                return {
                    status: 0,
                    message: 'Login del cliente avvenuto con successo.',
                    obj: {
                        token: token,
                        userType: 1
                    }
                }
            } else {
                return {
                    status: -2,
                    message: 'Password cliente errata.'
                }
            }
        } else if(resultWorker != null) {
            if(plainTextPassword == resultWorker.password) {
                const token = jwt.sign(
                    {
                        id: resultWorker._id,
                        email: resultWorker.email
                    },
                    config.JSONWebTokenKey
                );
                return {
                    status: 1,
                    message: 'Login del funzionaro avvenuto con successo.',
                    obj: {
                        token: token,
                        userType: 2
                    }
                }           
            } else {
                return {
                    status: -2,
                    message: 'Password funzionario errata.'
                }
            }
        } else if(resultManager != null) {
            if(plainTextPassword == resultManager.password) {
                const token = jwt.sign(
                    {
                        id: resultManager._id,
                        email: resultManager.email
                    },
                    config.JSONWebTokenKey
                );
                return {
                    status: 2,
                    message: 'Login del manager avvenuto con successo.',
                    obj: {
                        token: token,
                        userType: 3
                    }
                }
            } else {
                return {
                    status: -2,
                    message: 'Password manager errata.'
                }
            }
        } else {
            return {
                status: -3,
                message: 'Email non trovata.'
            }
        }
    } catch(error) {
        await mongo.close();
        return {
            status: -1,
            message: 'Errore di login.',
            error: error
        };
    }
}