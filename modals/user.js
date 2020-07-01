const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true,
        maxlength : 64
    },
    email : {
        type : String,
        require : true,
        unique : true
    },
    password : {
        type : String,
        require : true,
    },
    role : {
        type : Number,
        default : 0

    }
},
{
    timestamps : true
}
)


userSchema.pre('save', async function(password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.matchPassword = async function(enteredpassword){
    return await bcrypt.compare(enteredpassword, this.password);
};


module.exports = mongoose.model("User", userSchema);