const mongoose = require('mongoose');
const _ = require("lodash");
const connectionStatus = (mongodb_conn_str) => {
    return new Promise((resolve, reject) => {
        const connectionObject = mongoose.connection;
        connectionObject.once('open', () => {
            console.log(`connected to mongodb on ${mongodb_conn_str}`);
            resolve(`connected to mongodb on ${mongodb_conn_str}`)
        })
        connectionObject.on('error', () => {
            console.error(`Error while connecting to mongo ${console.error.bind(console, 'connection error:')}`);
            reject(`Error while connecting to mongo ${console.error.bind(console, 'connection error:')}`)
        })
    })
}
const createConnection = async () => {
    const options = {
        reconnectTries: 5, // Tries to connect for a max 5 times before terminating
        reconnectInterval: 500, // Reconnect every 500ms if connection failures
        connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        useNewUrlParser: true // Allows connection URL to be passed as string
    };
    const ip = process.env.MONGODB_IP || 'localhost';
    const port = process.env.MONGODB_PORT || 27017;
    const database = process.env.MONGODB_DATABASE || 'myreact';
    // const user = process.env.USERNAME || 'admin';
    // const password = process.env.PASSWORD || 'admin';
    // const url = 'mongodb://' + user + ':' + password + '@' + ip + ':' + port + "/" + database + '?authSource=admin';
    // console.info('URL for connect MOngoDB ', url);
    var mongodb_conn_str = 'mongodb://localhost:27017/myreact';
    try {
        mongoose.connect(mongodb_conn_str, options);
        await connectionStatus(mongodb_conn_str)
    }
    catch (ex) {
        console.error(ex);
        throw ex;
    }
}
module.exports.createConnection = createConnection;