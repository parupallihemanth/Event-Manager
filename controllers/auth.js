const User = require('../modals/user');
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt');
const { validationResult } = require('express-validator')

exports.signUp = async(req, res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array()[0].msg });
      }
    
    try{
        const data = await User.create(req.body)
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

// Sign in a user 
exports.signin = async(req, res) =>{
    const { email, password } = req.body;
    try{
    const user = await User.findOne({email});

    if(!user) {
        res.status(400).json({
            err : "User not registered"
        })
    }
    
    const isMatch = await user.matchPassword(password);

    if(!isMatch){
        return  res.status(401).json({
                    err : "login failed"
                })
    }

    // return  res.status(401).json({
    //     msg : "Login successfull"
    // })

    // sending a token

    const token = jwt.sign({ _id : user._id}, 'INWK')
    // console.log(token)
    
    res.cookie('token', token, {expire: 360000 + Date.now()})

    // const  { _id, name } = user;
    return res.status(200).json({ token, user})
    
    }

    catch (err) {
        console.log(err);
    }

}

// Sign in a user 
exports.signOut = (req, res) =>{
    res.clearCookie("token")
    return res.json({
        msg : "user signout"
    });
};

// signin
exports.isSignin = expressJwt({
    secret : 'INWK',
    userProperty : "auth"
})


exports.isAuthenticated = ( req, res, next ) =>{
    console.log(req.profile,req.auth)
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!checker){
        return res.status(400).json({
            error : "ACCESS DENIED!"
        })
    }

    next();

}


exports.isAdmin = ( req, res, next) =>{
    if(req.profile.role === 0){
        return res.status(400).json({
            error : " You are not admin, ACCESS DENIED"
        })
    }
    next()
}




