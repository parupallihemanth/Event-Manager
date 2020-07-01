const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true,
        maxlength : 128
    }
},{
    timestamps : true
})


module.exports = mongoose.model('Category', categorySchema);