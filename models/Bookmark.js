const mongoose = require('mongoose');

const BookMarkSchema = new mongoose.Schema(
    {
        job: {type: mongoose.Schema.Types.ObjectId,red: "Job" , required: true},
        userId: {type: String, required: true},
    }, {timestamps: true}
)

module.exports = mongoose.model('BookMark', BookMarkSchema); 