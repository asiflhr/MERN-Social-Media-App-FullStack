import PostModel from "../Models/postModal";
import mongoose from "mongoose";
import UserModal from "../Models/userModal";

// create new Post  
export const createPost = async (req, res) => {
    const newPost = new PostModel(req.body);

    try {
        await newPost.save();;
        res.status(200).json("Post created successfully");
    }catch(err){
        res.status(500).json(`Error creating post: ${err}`);
    }
}

// Get a post 
export const getPost = async (req, res) => {
    const postId = req.params.id;
    try {
        const post = await PostModel.findById(postId);
        res.status(200).json(post);
    }catch(err){
        res.status(500).json(`Error getting post: ${err}`);
    }
}

// Update a post 
export const updastePost = async(req, res) => {
    const postId = req.params.id;
    const {userId} = req.body;

    try {
        const post = await PostModel.findById(postId);
        if(post.userId === userId){
            await post.updasteOne({$set: req.body});
            res.status(200).json("Post updated successfully");
        }else{
            res.status(401).json("Unauthorized");
        }
    }catch(err){
        res.status(500).json(`Error updating post: ${err}`);
    }
}

