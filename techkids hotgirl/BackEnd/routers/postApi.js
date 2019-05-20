const express = require('express');
const PostApiRouter = express.Router();

const PostModel = require('../models/post');

// Get list Post
PostApiRouter.get('/',(req,res) => {
    PostModel.find({},(err,posts) => {
        if(err) res.json({ success: false, err })
        else res.json({ success: true,data: posts})
    })
})

// Create Post
PostApiRouter.post('/',(req,res) => {
    PostModel.create(req.body, (err, PostCreated) => {
        if(err) res.json({ success: false, err })
        else res.json({ success: true,data: PostCreated})
    })
})

// Update Post
PostApiRouter.put('/:id',(req,res) => {
    let { id } = req.params;
    PostModel.findById(id, (err,PostFound) => {
        if(err) res.json({ success: false, err })
        else if(!PostFound) res.json({ success: false, err: 'Not found'})
        else{
            for(let key in req.body){
                let value = req.body[key];
                if(value !== null){
                    PostFound[key] = value;
                }
            }

            PostFound.save((err,PostUpdated) => {
                if(err) res.json({ success: false, err })
                else res.json({ success: true, data: PostUpdated});
            });
            }
    })
})

// Delete Post
PostApiRouter.delete('/:id',(req,res) => {
    let { id } = req.params;

    PostModel.findByIdAndDelete(id, (err) => {
        if(err) res.json({ success: false, err })
        else res.json({ success: true});
    })
})

module.exports = PostApiRouter;