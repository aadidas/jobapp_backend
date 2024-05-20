const router = require('express').Router();
const bookmarksController = require('../controller/bookmarkController');
const { verifyAndAuthorization, verifyToken, verifyAdmin } = require('../middleware/verifyToken');



// create bookmarks
router.post('/add', verifyToken, bookmarksController.addBookmarks);

//remove bookmarks
router.delete('/:id', bookmarksController.removeBookmarks);

//get all bookmarks
router.get('/', verifyToken, bookmarksController.getAllBookmarks)




module.exports = router