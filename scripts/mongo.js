const config = require("./../config.js")
const { MongoClient } = require("mongodb");

exports.insertUser = async function(user) {
    const mongo = new MongoClient(config.mongoUri, { useUnifiedTopology: true });
    try {
        await mongo.connect();
        const users = mongo.db(config.databaseName).collection(config.databaseUserCollectionName)
        const result = await users.findOne({ email: user.email })
        if(result !== null) {
            // Utente già presente nel database
            await mongo.close();
            return {
                status: "400",
                message: "Utente esistente."
            };
        } else {
            // Utente non presente nel database
            await users.insertOne(user);
            await mongo.close();
            return {
                status: "200",
                message: "Utente creato correttamente."
            };    
        }
    } catch(err) {
        // Errore generico
        return {
            status: "400",
            message: "Errore generico. \n" + err
        };
    }
}

async function editUser(query) {
    const mongo = new MongoClient(config.mongoUri, { useUnifiedTopology: true });
    await mongo.connect();

    await mongo.close();
}

async function deleteUser() {
    const mongo = new MongoClient(config.mongoUri, { useUnifiedTopology: true });
    await mongo.connect();

    await mongo.close();
}

async function searchOneUser(query) {
    const mongo = new MongoClient(config.mongoUri, { useUnifiedTopology: true });
    await mongo.connect();
    try {
        await mongo.connect();
        const users = mongo.db(config.databaseName).collection(config.databaseUserCollectionName)
        const result = await users.findOne(query)
        await mongo.close();
        if(!result) {
            return {
                status: "400",
                message: "Utente/Email inesistente"
            }    
        } else {
            return {
                status: "200",
                message: result
            }    
        }
    } catch(err) {
        return {
            status: "400",
            message: "Errore generico. \n" + err
        };
    }
}

async function insertProduct() {
    const mongo = new MongoClient(config.mongoUri, { useUnifiedTopology: true });
    await mongo.connect();

    await mongo.close();
}

async function editProduct() {
    const mongo = new MongoClient(config.mongoUri, { useUnifiedTopology: true });
    await mongo.connect();

    await mongo.close();
}

async function deleteProduct() {
    const mongo = new MongoClient(config.mongoUri, { useUnifiedTopology: true });
    await mongo.connect();

    await mongo.close();
}

async function searchProduct() {
    const mongo = new MongoClient(config.mongoUri, { useUnifiedTopology: true });
    await mongo.connect();

    await mongo.close();
}

async function insertReservation() {
    const mongo = new MongoClient(config.mongoUri, { useUnifiedTopology: true });
    await mongo.connect(),

    await mongo.close();
}

async function editReservation() {
    const mongo = new MongoClient(config.mongoUri, { useUnifiedTopology: true });
    await mongo.connect();

    await mongo.close();
}

async function deleteReservation() {
    const mongo = new MongoClient(config.mongoUri, { useUnifiedTopology: true });
    await mongo.connect();

    await mongo.close();
}

async function searchReservation() {
    const mongo = new MongoClient(config.mongoUri, { useUnifiedTopology: true });
    await mongo.connect();

    await mongo.close();
}


exports.editUser = editUser;
exports.deleteUser = deleteUser;
exports.searchOneUser = searchOneUser;

exports.insertProduct = insertProduct;
exports.editProduct = editProduct;
exports.deleteProduct = deleteProduct;
exports.searchProduct = searchProduct;

exports.insertReservation = insertReservation;
exports.editReservation = editReservation;
exports.deleteReservation = deleteReservation;
exports.searchReservation = searchReservation;