const config = {
    mongoUri: "mongodb+srv://admin:admin@cluster0.rtvit.mongodb.net/NoloNoloPlus?writeConcern=majority",
    // mongoUri: "mongodb://site202131:iboh2Ish@mongo_site202131?writeConcern=majority",
    databaseName: "NoloNoloPlus",
    databaseUserCollectionName: "users",
    databaseWorkerCollectionName: "workers",
    databaseManagerCollectionName: "managers",
    databaseProductCollectionName: "products",
    databaseReservationCollectionName: "reservations",
    JSONWebTokenKey: "password-chiave-segretesissima-321kjh4b1asdtrkò13kjl41jklnlaqew4ljer12",
    serverPort: "8081",
    // serverPort: "8000",
    origin: "http://localhost:8081",
    origin: "*",
}

module.exports = config