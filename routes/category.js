const express = require('express');
const router = express.Router();

const { getCategory,getAllCategories, getACategory, createACategory, updateACategory, deleteACategory} = require('../controllers/category');
const { isSignin, isAuthenticated, isAdmin} = require('../controllers/auth')
const { getUser } = require('../controllers/user')

router.param('categoryId', getCategory)
router.param('userId', getUser)


router.get('/', getAllCategories);
router.post('/:userId', isSignin, isAuthenticated, isAdmin, createACategory);

router.get('/:categoryId', getACategory);
router.put('/:userId/:categoryId', isSignin, isAuthenticated, isAdmin, updateACategory);
router.delete('/:userId/:categoryId', isSignin, isAuthenticated, isAdmin, deleteACategory);



module.exports = router;