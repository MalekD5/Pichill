import PostModel from '../models/postMessages.js';

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostModel.find({});
        console.log(postMessages);
        
        res.status(200).json(postMessages);
    } catch (err) {
        res.status(404).json({ message: err.message});
    }
}

export const createPost = async (req, res) => {
    const body = req.body;
    console.log(body);
    const newPost = new PostModel(body);
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}
