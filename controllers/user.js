const User = require('../modals/user');


exports.getUser = async(req, res,  next, id) => {
    try {
        console.log('data')
        const data = await User.findById(id);
        
        if(!data) {
            return res.status(400).json({
                err : "data not found"
            })
        
    }

    req.profile = data;
    
    next();
}

catch (err) {
    console.log(err)
}

}

exports.getAllUser = async(req, res) =>{
    try{
      
        const data = await User.find();
        if(!data) {
            return res.status(400).json({
                err : "data not found"
            })
        }

        return res.status(200).json({ data})
}
catch (err) {
    console.log(err)
}
}

exports.getAUser = (req,res) =>{
    
    req.profile.password = undefined
    return  res.json(req.profile)
}
 








// Signout
exports.signOut = (req, res) =>{
    res.clearCookie("token")
    res.json({
        msg : "user signout"
    });
};



// isauthorized






exports.updateeAUser = async(req, res) =>{
    try{
        
        const data = await User.findByIdAndUpdate(
            {_id : req.profile._id},
            {$set : req.body},
            {new : true, useFindAndModify : false}
        )
        if(!data) {
            return res.status(400).json({
                err : "data not found"
            })
        }

        return res.status(200).json({ data})

    } catch (err) {
        console.log(err)
    }

}

exports.deleteAUser = async(req, res) =>{
    try{
        const data = await User.findByIdAndDelete(req.params.id)
        if(!data) {
            return res.status(400).json({
                err : "data not found"
            })
        }

        return res.status(200).json({ data})

    } catch (err) {
        console.log(err)
    }

}