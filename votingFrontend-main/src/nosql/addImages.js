const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const mongodb = require('mongodb');

// Replace the connection string with your own
const uri = "mongodb+srv://pradhanan:Pwd123@Cluster1/database?retryWrites=true&w=majority";
// Replace <database> with the name of your database
const dbName = 'database';

// Handle the file upload
router.post('/profile', upload.single('image'), function (req, res, next) {
    const file = req.file;
    const userId = req.body.userId;

    // Connect to MongoDB
    mongodb.MongoClient.connect(uri, function (err, client) {
        if (err) throw err;

        const db = client.db(dbName);
        const collection = db.collection('users');

        // Update the user's profile with the uploaded image
        collection.updateOne(
            { _id: new mongodb.ObjectId(userId) },
            { $set: { profileImage: file.filename } },
            function (err, result) {
                if (err) throw err;

                console.log(result);
                res.json({ success: true });
                client.close();
            }
        );
    });
});