const BlogPost = require('../models/BlogPost')
const express = require('express')

const createBlog = (req, res) => {
    const { title, content, tags } = req.body;
    const blogPost = new BlogPost({ title, content, tags, }); //passing author id
    blogPost.save()
    .then(savedBlogPost => res.json(savedBlogPost))
    .catch(err => res.status(400).json(err));
};
// res.JSON.parse(blogPost)
// JSON.parse(scatterSeries)
const getAll = (req, res) => {
    BlogPost.find() // Fetch all blog posts without any filtering
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json(err));
};

const getBlogById = (req, res) => {
    BlogPost.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(400).json(err));
};

const updatePost = (req, res) =>{
   let id = req.params.id
   const updates = {
    title: req.body.title,
    content: req.body.content,
    tags: req.body.tags
  };
  BlogPost.findByIdAndUpdate(id, updates, { new: true })
  .then(result => {
      res.json(result);
  })
  .catch(err => {
      res.status(500).send("An error occurred");
  });
};

const deletePostById = (req, res) => {
    // BlogPost.findByIdAndRemove(req.params.id)
    // .then(() => res.json({ message: 'Post deleted' }))
    // .catch(err => res.status(400).json(err)); 
    const postId = req.params.id;

    BlogPost.findByIdAndDelete({_id:postId})
        .then(deletedPost => {
            if (!deletedPost) {
                // If no post was found with the given ID
                  res.status(404).json({ message: "Post not found" });
            }else
            // Respond with a success message or deleted post data
              res.status(200).json({ message: "Post deleted successfully", deletedPost });
        })
        .catch(err => {
            // If an error occurred during the deletion process
            console.error(err);
            res.status(500).json({ message: "Internal Server Error" });
        });
};
// created and export it 
module.exports = {createBlog, getAll, getBlogById, updatePost, deletePostById }