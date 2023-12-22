const mongoose = require("mongoose");

const regSchema = mongoose.Schema({
    user: { type: String, required: true },
    pass: { type: String, required: true }
})

module.exports = mongoose.model('reg', regSchema)