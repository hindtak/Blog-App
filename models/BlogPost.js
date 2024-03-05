const mongoose = require('mongoose');
const blogPostSchema = new mongoose.Schema({
 title: String,
 content: String,
 tags: [String],
 creationDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('BlogPost', blogPostSchema);