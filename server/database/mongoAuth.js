// ----------------------------------------------------------------------------
//                                API Autenticazione
// ----------------------------------------------------------------------------

// API - MongoDB
// Metodi che si interfacciano con le API di MongoDB
// I metodi sono suddivisi per:
// - Auth
// - Clienti
// - Prodotti
// - Funzionari
// - Manager

const config = require("./../config.js")
const { MongoClient } = require("mongodb");

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
                message: "Cliente",
            }
        } else if(await workers.findOne(query) != null) {
            await mongo.close();
            return {
                status: 1,
                message: "Funzionario"
            }
        } else if(await managers.findOne(query) != null) {
            await mongo.close();
            return {
                status: 2,
                message: "Manager"
            }
        } else {
            await mongo.close();
            return {
                status: -1,
                message: "Errore"
            }
        }
    } catch (error) {
        return {
            status: -1,
            message: "Errore generico.",
            obj: error
        };
    }
}