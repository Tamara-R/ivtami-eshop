const express = require('express');
const router = express.Router();


const { 
    newBrand,
    getAllBrands,
    getBrand,
    updateBrand,
    deleteBrand
} = require('../controllers/brandController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/brand/create').post(isAuthenticatedUser, authorizeRoles('admin'), newBrand);
router.route('/brands').get(getAllBrands);
router.route('/brand/:id').get(isAuthenticatedUser, authorizeRoles('admin'), getBrand);
router.route('/admin/brand/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateBrand);
router.route('/admin/brand/:id').delete(isAuthenticatedUser,authorizeRoles('admin'), deleteBrand);



module.exports = router;