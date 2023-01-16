const mongoose = require("mongoose");

const connection = mongoose.connect("mongodb+srv://vikasdongarwar:vikas101@cluster0.ngul0xp.mongodb.net/nemmasai?retryWrites=true&w=majority");

module.exports = { connection };
