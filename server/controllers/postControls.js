const Post = require('../models/postModel');

const getPosts = async (req, res) => {
    try {
        const post = await Post.find();
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json(err);
    }
};

const addPosts = async (req, res) => {
    const addPost = req.body;
    const newPost = new Post(addPost);

    try {
        await newPost.save();
        res.status(201).json(addPost);
    } catch (err) {
        res.status(409).json(err);
    }
};

const updatePosts = async (req, res) => {
    const {id: _id} = req.params;
    const updatePost = req.body;

    const updatedPost = await Post.findByIdAndUpdate(_id, updatePost, {new: true});

    res.json(updatedPost);
}

const deletePosts = async (req, res) => {
    const {id: _id} = req.params;

    const deletedPost = await Post.findByIdAndDelete(_id);

    res.json(deletedPost);
}

module.exports ={ getPosts, addPosts, updatePosts, deletePosts }