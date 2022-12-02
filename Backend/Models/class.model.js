const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
    classroomID: String,
    capacity: Number,
    requirement: Number,
    subjects: [String],
    languageRequirement: [String],
    location: String
}, {collection : "ClassRoom"});

const ClassModel = mongoose.model("classRoom", classSchema);

module.exports = ClassModel;
// {
//     "classroomID": "AHM01",
//     "capacity": 5,
//     "requirement": 2,
//     "subjects": ["Maths", "Science"],
//     "languageRequirement": ["Gujarati", "Hindi"],
//     "location": "Ahmedabad"
// },

// new Schema({ url: String, text: String, id: Number}, 
//     { collection : 'question' });   // collection name
// or model mapped:

// mongoose.model('Question', 
//         new Schema({ url: String, text: String, id: Number}), 
//         'question');     // collection name