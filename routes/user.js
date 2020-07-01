const express = require('express');
const router = express.Router();

const { getUser,getAllUser, getAUser, updateeAUser, deleteAUser, signOut, isSignin} = require('../controllers/user');



router.param('userId', getUser)

router.get('/', getAllUser);
// router.post('/', createAUser);
// router.post('/signin', signin);
router.get('/signout', signOut)

router.get('/:userId', getAUser);
router.put('/:userId', updateeAUser);
router.delete('/:userId', deleteAUser);




module.exports = router;