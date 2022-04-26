const express = require('express');
const router = express.Router();


const { 
    newCategory,
    getAllCategories,
    getCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/categoryContorller');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/category/create').post(isAuthenticatedUser, authorizeRoles('admin'), newCategory);
router.route('/categories').get(getAllCategories);
router.route('/category/:id').get(isAuthenticatedUser, authorizeRoles('admin'), getCategory);
router.route('/admin/category/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateCategory);
router.route('/admin/category/:id').delete(isAuthenticatedUser,authorizeRoles('admin'), deleteCategory);



module.exports = router;