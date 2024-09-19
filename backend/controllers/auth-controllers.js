const User = require('../models/User');
const bcrypt  = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs'); 
const { Console } = require('console');

const doRegister = async (req,res)=>
{
    // checking for file extension
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path+'.'+ext;
    fs.renameSync(path, newPath);
 
    const {name,password, email} = req.body;
 
    // checking user already exist
    let user = await User.findOne({email:req.body.email});
    if(user)
    {
        return res.status(400).json({'msg':"username already exist"});
    }

     // encrypting the password
    const salt = await bcrypt.genSalt(10);
    const securePass = await bcrypt.hash(password,salt);

    // creating user
    user = await User.create(
    {
          name,
          password: securePass,
          email,
          photo: newPath,
    })
    
    res.json({"msg":"Registration Successful", "details":req.body});
}

const doLogin = async (req,res)=>
{
    const {email,password} = req.body;
    console.log(req.body);
    // checking user existence
    let user = await User.findOne({email:req.body.email});
    console.log(user);
    if(!user)
    {
        // console.log(req.body);
        return res.status(400).json({'msg':"user with this email doesnot exist"});
    }

    // decrypting the password
    const passwordCompare = await bcrypt.compare(password,user.password);
    if(!passwordCompare)
    {
        return res.status(400).json({'msg':"Wrong password"});
    }
    //creating token
    const authtoken = jwt.sign({email,id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
    
    res.json({"message":"Login Successful", "details":req.body,"token": authtoken, "id": user._id, "user":user});
}

module.exports = {doRegister,doLogin};