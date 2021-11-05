const config = require("./../config.js")
const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");
var path = require('path');

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

exports.editProduct = async function (id, query) {
    const mongo = new MongoClient(config.mongoUri, { useUnifiedTopology: true });
    await mongo.connect();
    const products = mongo.db(config.databaseName).collection(config.databaseProductCollectionName);
    const filter = { _id: ObjectId(id) };
    const updateDocument = {
        $set: query
    }
    const result = await products.updateOne(filter, updateDocument);
    await mongo.close()
    if(!result) {
        return {
            status: "400",
            message: "Help"
        }    
    } else {
        return {
            status: "200",
            message: ":D"
        }    
    }

}

async function deleteProduct() {
    const mongo = new MongoClient(config.mongoUri, { useUnifiedTopology: true });
    await mongo.connect();

    await mongo.close();
}

exports.searchProduct = async function (req, res) {
    const mongo = new MongoClient(config.mongoUri, { useUnifiedTopology: true });
    await mongo.connect();
    const products = mongo.db(config.databaseName).collection(config.databaseProductCollectionName)
    const result = await products.findOne({"_id" : ObjectId(req.query.id)});
    await mongo.close();
    return res.status('200').send(result);
}

exports.searchOneProduct = async function(query) {
    const mongo = new MongoClient(config.mongoUri, { useUnifiedTopology: true });
    await mongo.connect();
    try {
        await mongo.connect();
        const products = mongo.db(config.databaseName).collection(config.databaseProductCollectionName)
        const result = await products.findOne(query)
        await mongo.close();
        if(!result) {
            return {
                status: "400",
                message: "Utente/Email dsaf"
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

async function insertReservation() {
    const mongo = new MongoClient(config.mongoUri, { useUnifiedTopology: true });
    await mongo.connect(),

    await mongo.close();
}

async function editReservation(query) {
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
exports.deleteProduct = deleteProduct;

exports.insertReservation = insertReservation;
exports.editReservation = editReservation;
exports.deleteReservation = deleteReservation;
exports.searchReservation = searchReservation;