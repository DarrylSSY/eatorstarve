const mongoose = require('mongoose');

module.exports.connect = function() {
    mongoose.connect("mongodb+srv://eatorstarve:eatorstarve123@cluster0.lty0upl.mongodb.net/?retryWrites=true&w=majority");
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error"));
    db.once("open", function(){
        console.log("Connection Succeeded");
    });
    return db;
}
