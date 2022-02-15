const User = require('../models/usersModel');

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.json(err);
    }
};

const getLimitUsers = async (req, res) => {
    const {page} = req.params;
    const LIMIT = 6;
    const startIndex = (Number(page) - 1) * LIMIT;

    try {
        const total = await User.countDocuments({});
        const users = await User.find().sort({_id: -1}).limit(LIMIT).skip(startIndex);
        res.json({data: users, totalPages: Math.ceil(total / LIMIT), curPage: Number(page)});
    } catch (err) {
        res.json(err);
    }
};

const addUsers = async (req, res) => {
    const addUser = req.body;
    const newUser = new User(addUser);
    try {
        await newUser.save();
        res.status(201).json(addUser);
    } catch (err) {
        res.json(err);
    }
};

const updateUsers = async (req, res) => {
    const {id} = req.params;
    const updateUser = req.body;

    // if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json('No user found with that id.');

    const updatedUser = await User.findOneAndUpdate( { id }, updateUser, { new: true });
    // const updatedUser = await User.findByIdAndUpdate( id, updateUser, { new: true });

    res.json(updatedUser);
}

const deleteUsers = async (req, res) => {
    const {id} = req.params;
    // const deleteUser = req.body;

    // if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json('No user found with that id.');

    const deletedUser = await User.findOneAndDelete({ id });
    // const deletedUser = await User.findByIdAndRemove(id);

    res.json(deletedUser);
}

module.exports = { getUsers, getLimitUsers, addUsers, updateUsers, deleteUsers };