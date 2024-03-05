const express = require('express')
const blogCRUD = require('../controllers/blogCRUD')
const authenticateUser = require('../middelwar/userAuth')

const myRouter = express.Router();

myRouter.post('/addblog', authenticateUser, blogCRUD.createBlog);
myRouter.get('/blogs', authenticateUser, blogCRUD.getAll );
myRouter.get('/blogposts/:id', authenticateUser, blogCRUD.getBlogById);
myRouter.patch('/update/:id', authenticateUser, blogCRUD.updatePost);
myRouter.delete('/blogposts/:id', authenticateUser, blogCRUD.deletePostById );

module.exports = myRouter ;