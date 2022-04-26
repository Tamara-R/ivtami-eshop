const express = require('express');
const router = express.Router();

const { 
    newContact,
    getAllContacts,
    getContact,
    updateContact,
    deleteContact
} = require('../controllers/contactContoller');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/contact/create').post(newContact);
router.route('/contacts').get(isAuthenticatedUser, authorizeRoles('admin'), getAllContacts);
router.route('/contact/:id').get(isAuthenticatedUser, authorizeRoles('admin'), getContact);
router.route('/admin/contact/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateContact);
router.route('/admin/contact/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteContact);



module.exports = router;