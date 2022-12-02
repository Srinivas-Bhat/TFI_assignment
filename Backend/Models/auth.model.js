const mongoose = require("mongoose");

const authSchema = mongoose.Schema({
    name: String,
    email: String,
    role: {type: String, enum : ["Admin", "Volunteer"], default: "Volunteer"},
    password: String,
});

const AuthModel = mongoose.model("user", authSchema);

module.exports = AuthModel;