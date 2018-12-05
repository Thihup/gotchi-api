const MongoClient = require('mongodb').MongoClient;
const url = process.env.DB_URL || 'mongodb://localhost/gotchi';

MongoClient.connect(url)
.then(conn => global.conn = conn.db())
.catch(err => console.log(err));


function addUser(user, callback) {
    global.conn.collection("users").insertOne(user).then(callback).catch(callback);
}

function findUser(user, callback) {
    global.conn.collection("users").findOne({
        username: user.username
    }, callback);
}

module.exports = {
    addUser,
    findUser
};