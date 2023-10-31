const MongoClient = require('mongodb').MongoClient;

// Replace the connection string with your own
const uri = "mongodb+srv://pradhanan:Pwd123@Cluster1/database?retryWrites=true&w=majority";

const dbName = 'database';

// Connect to MongoDB
MongoClient.connect(uri, function (err, client) {
    if (err) throw err;

    const db = client.db(dbName);

    // Create a users collection
    db.createCollection('users', function (err, collection) {
        if (err) throw err;
        console.log('Created collection: users');
    });

    // Close the client connection
    client.close();
});