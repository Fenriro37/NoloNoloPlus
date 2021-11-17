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

const config = require('./../config.js')
const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
                status: -1,
                message: 'Errore'
            }
        }
    } catch (error) {
        return {
            status: -1,
            message: 'Errore generico.',
            obj: error
        };
    }
}

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
                await mongo.close();
                return {
                    status: 0,
                    obj: token
                }
            } else {
                await mongo.close();
                return {
                    status: 1,
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
                await mongo.close();
                return {
                    status: 0,
                    obj: token
                }           
            } else {
                await mongo.close();
                return {
                    status: 1,
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
                await mongo.close();
                return {
                    status: 0,
                    obj: token
                }
            } else {
                await mongo.close();
                return {
                    status: 1,
                    message: 'Password manager errata.'
                }
            }
        } else {
            return {
                status: 2,
                message: 'Email non trovata.'
            }
        }
    } catch(error) {
        await mongo.close();
        return {
            status: -1,
            message: 'Errore generico. ' + error
        };
    }
}