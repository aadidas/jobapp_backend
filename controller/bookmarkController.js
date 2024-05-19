const BookMark = require('../models/Bookmark');

module.exports = {
    addBookmarks: async (req, res) => {
        const newBookmark = new BookMark(req.body);

        try{
            const saveBookmark = await newBookmark.save();
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
            const getAllBookmarks = await BookMark.find({userId: req.params.userId});
            // console.log(getAllJob);
            res.status(200).json({getAllBookmarks});
        } catch (error) {
            res.status(500).json({message: error})
        }
    },
}