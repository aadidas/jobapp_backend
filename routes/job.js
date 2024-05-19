const router = require('express').Router();
const jobController = require('../controller/jobController');
const { verifyAndAuthorization, verifyToken, verifyAdmin } = require('../middleware/verifyToken');



// post job
router.post('/create', verifyAdmin, jobController.createJob);

//Update job
router.put('/:id', verifyAdmin, jobController.updateJob);

// delete job
router.delete('/:id', verifyAdmin, jobController.deleteJob);

//get single job
router.get(':id', jobController.getJob);

//get all jobs
router.get('/', jobController.getAllJobs)

//search jobs
router.get('/search/:key', jobController.searchJobs)



module.exports = router