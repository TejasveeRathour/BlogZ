const Comment = require('../models/Comments');
const Notification = require('../models/Notification');

// adding comment
const doAddComment = async (req,res)=>{
    const {id} = req.params;
    const {comment, username, userId, authorId} = req.body;

    // new comment
    const newcomment = await Comment.create({
        content: comment,
        username,
        userId,
        postId: id
    })
    
    // sending notification
    const notification = await Notification.create({
        notification_type: 'comment',
        message: comment,
        userId,
        postId: id,
        authorId,
    })
    res.json(newcomment);
}

module.exports = {doAddComment};