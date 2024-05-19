const router = require('express').Router();
const userController = require('../controller/userController');
const { verifyAndAuthorization, verifyToken, verifyAdmin } = require('../middleware/verifyToken');



// get user
router.get('/:id', verifyAndAuthorization, userController.getUser);

//Update user
router.put('/:id', verifyAndAuthorization, userController.updateUser);

// delete user
router.delete('/:id', verifyAndAuthorization, userController.deleteUser);

router.get('/', verifyAdmin, userController.getAllUser);




module.exports = router