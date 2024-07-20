const User = require('../models/UserModel');

exports.getUser=async (req,res)=>{
    try{
        console.log(req.user.id);
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }
    catch(err){
        console.log(err);
    }
};

exports.updateUser = async (req,res)=>{
    try{
        const {email,name} = req.body;
        const user = await User.findById(req.user.id);
        if(name) user.name = name;
        if(email) user.email = email;

        await user.save();
        res.json(user);
    }
    catch(err){
        console.log(err);
        res.status(500).json("Internal Server error");
    }
};


