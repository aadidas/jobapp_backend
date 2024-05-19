const User = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

module.exports = {
    createUser: async (req, res) => {
        const newUser =  User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET),
        }) 

        try{
            const saveUser = await newUser.save();
            res.status(201).json(saveUser);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email });

            if (!user) {
                return res.status(401).json({ message: "Wrong login details" });
            }

            // Decrypt the stored password
            let decryptedBytes;
            try {
                decryptedBytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET);
            } catch (decryptError) {
                return res.status(500).json({ message: "Error decrypting password", error: decryptError.toString() });
            }

            // Check if decryption produced valid bytes
            const decryptedPassword = decryptedBytes.toString(CryptoJS.enc.Utf8);

            if (!decryptedPassword) {
                return res.status(401).json({ message: "Wrong login details" });
            }

            if (decryptedPassword !== req.body.password) {
                return res.status(401).json({ message: "Wrong login details" });
            }
            
            
            const {password, __v, createdAt, updatedAt, ...others} = user._doc;

            const userToken = jwt.sign({
                id: user._id,
                isAdmin: user.isAdmin,
                isAgents: user.isAgents
            }, process.env.JWT_SEC, {expiresIn: "21d"});

            res.status(200).json({...others, userToken});

        } catch (error) {
            res.status(500).json({ message: "Error logging in user", error: error.toString() });
        }
    },
}