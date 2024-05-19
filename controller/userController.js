const User = require('../models/User');
const CryptoJS = require('crypto-js');

module.exports = {
    updateUser: async (req, res) => {
        // Encrypt the password if it is present in the request body
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET).toString();
        }
        
        try {
            // Find the user by ID and update their information
            const updateUser = await User.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );

            // Check if updateUser is not null or undefined
            if (!updateUser) {
                return res.status(404).json({ message: "User not found" });
            }

            // Destructure the necessary fields, excluding sensitive data
            const { password, __v, createdAt, updatedAt, ...others } = updateUser._doc;

            // Send the response with the updated user data, excluding sensitive fields
            res.status(200).json({ ...others });
        } catch (error) {
            console.error("Error updating user:", error);
            res.status(500).json(error);
        }
    },


    deleteUser: async (req, res) => {
        try{

            const deleteUser = await User.findByIdAndDelete(
                req.params.id
            )

            console.log('delete user', deleteUser);

            // Destructure the necessary fields, excluding sensitive data
            const { password, __v, createdAt, updatedAt, ...others } = deleteUser._doc;

            res.status(200).json({message: `${deleteUser.username} was deleted`});

        } catch (error) {
            res.status(500).json({message: "Error in deleting user"})
        }
    },

    getUser: async (req, res) => {

        try{
            const getUser = await User.findById(req.params.id);

            console.log('get user', getUser);

            // Destructure the necessary fields, excluding sensitive data
            const { password, __v, createdAt, updatedAt, ...others } = getUser._doc;

            res.status(200).json({...others});

        } catch (error) {
            res.status(500).json({message: error})
        }

    },

    getAllUser: async (req, res) => {

        try{
            const allUser = await User.find();

            console.log('get user', allUser);

            res.status(200).json({allUser});

        } catch (error) {
            res.status(500).json({message: error})
        }

    },
};
