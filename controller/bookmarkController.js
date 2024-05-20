const BookMark = require('../models/Bookmark');
const Job = require('../models/Job');

module.exports = {
    addBookmarks: async (req, res) => {
        const jobID = req.body.job;
        try{
            const getJob = await Job.findById(jobID);
            // Check if getJob is not null or undefined
            if (!getJob) {
                return res.status(404).json({ message: "job not found" });
            }
            const newBookMark = new BookMark({job: getJob, userId: req.user.id});
            const saveBookmark = await newBookMark.save();
            const { __v, createdAt, updatedAt, ...others } = saveBookmark._doc;

            res.status(200).json({...others});
        } catch (error) {
            res.status(500).json({message: error})
        }
    },
    removeBookmarks: async (req, res) => {

        try{
            const deleteBookmark = await BookMark.findByIdAndDelete(req.params.id);

            // Check if deleteJob is not null or undefined
            if (!deleteBookmark) {
                return res.status(404).json({ message: "Bookmark not found" });
            }

            const { __v, createdAt, updatedAt, ...others } = deleteBookmark._doc;

            res.status(200).json({message: "Bookmark has been deleted"});
        } catch (error) {
            res.status(500).json({message: error})
        }
    },
    getAllBookmarks: async (req, res) => {
        try{
            const getAllBookmarks = await BookMark.find({userId: req.user.id});
            // console.log(getAllJob);
            res.status(200).json({getAllBookmarks});
        } catch (error) {
            res.status(500).json({message: error})
        }
    },
}