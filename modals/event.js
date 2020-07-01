const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema

const eventSchema = new mongoose.Schema({
    
    date :{
        required : true,
        type : Date
    },
    description : {
        type : String,
        required : true,
        maxlength : 2000,
    },
    capacity : {
        type :Number,
        required : true
    },
    photo : {
        data : Buffer,
        contentType : String
    },
    price : {
        type : Number,
        default : 0
    },
    category : {
        required : true,
        type :  ObjectId,
        ref : 'Category'
    }
},{
    timestamps : true
})


module.exports = mongoose.model("Event", eventSchema);