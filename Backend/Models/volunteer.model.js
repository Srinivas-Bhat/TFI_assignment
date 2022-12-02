const mongoose = require("mongoose");

const volunteerSchema = mongoose.Schema({
    fullname: String,
    email: String,
    location: String,
    phone: String,
    spokenLanguages: [String],
    availability: [String],
    classRoom: {type: String, default: ""}
});

const VolunteerModel = mongoose.model("volunteer", volunteerSchema);

module.exports = VolunteerModel;