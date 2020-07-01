const express = require('express');
const router = express.Router();
const { check} = require('express-validator')


const { signUp, signin, signOut, isSignin} = require('../controllers/auth')

router.post('/signup', [ 
    check('name', "must be at least 3 chars long'").isLength({ min : 3}),
    check('email', "check your email").isEmail(),
    check('password', "password should have 5 chars").isLength({ min : 5})

], signUp);
router.post('/signin', signin);
router.get('/signout', signOut);

// Test route
router.get('/test/test',  isSignin, ( req, res) =>{
    res.json(req.auth)
})


module.exports = router;