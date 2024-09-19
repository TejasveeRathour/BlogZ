const Post = require('../models/Post');
const fs = require('fs'); 


// create a Blog
const doCreatePost = async (req,res)=>
{ 
    // storing file with the extension in uploads
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path+'.'+ext;
    fs.renameSync(path, newPath);

    let data = req.data;
    const email = data.email;
    const userId = data.id;

    // Storing a post in database 
    const {title, summary,content} = req.body;
    const postDoc = await Post.create({
        title,
        summary,
        content,
        cover: newPath,
        authorId: userId,
    })
    res.json(postDoc);
}

module.exports = {doCreatePost};