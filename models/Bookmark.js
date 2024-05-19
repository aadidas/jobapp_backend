const mongoose = require('mongoose');

const BookMarkSchema = new mongoose.Schema(
    {
        job: {type: String, required: true},
        userId: {type: String, required: true},
        title: {type: String, required: true},
        ImageUrl: {type: String, required: true},
        company: {type: String, required: true},
        location: {type: String, required: true},
    }, {timestamps: true}
)

module.exports = mongoose.model('BookMark', BookMarkSchema); 