const mongoose = require('mongoose')

const labSchema = new mongoose.Schema({
    macAddress : String,
    pcNumber : Number,
    labNumber : Number,
    status : {
        mouce : Date,
        keyboard : Date,
        openedTab : [String] || null
    },
    timeOfBoot : Date,
    openTimeAllowed : Date || null,
    active: Boolean
})

module.exports = mongoose.model('PcsData', labSchema);