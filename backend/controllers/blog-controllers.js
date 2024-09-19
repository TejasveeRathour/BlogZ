const Post = require("../models/Post");
const fs = require("fs");

// create a Blog
const doCreatePost = async (req, res) => {
  // storing file with the extension in uploads
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  let data = req.data;
  const email = data.email;
  const userId = data.id;

  // Storing a post in database
  const { title, summary, content } = req.body;
  const postDoc = await Post.create({
    title,
    summary,
    content,
    cover: newPath,
    authorId: userId,
  });
  res.json(postDoc);
};

// updating a blog
const doUpdatePost = async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }
  const { title, summary, content, id } = req.body;

  // Updating the Post
  const filter = { _id: id };
  const upd = {
    title,
    summary,
    content,
  };
  if (newPath) {
    upd.cover = newPath;
  }
  const postData = await Post.findOneAndUpdate(filter, upd, { new: true });
  res.json(postData);
};

// Accessing all the Blogs
const doAccessAllPosts = async (req, res) => {
  const perPage = 3;
  const page = req.query.page || 1;
  const lastItemTimestamp = req.query.lastItemTimestamp || Date.now();

  const allposts = await Post.find({
    createdAt: { $lt: lastItemTimestamp },
  })
    .populate("authorId")
    .sort({ createdAt: -1 })
    .skip(perPage * page - perPage)
    .limit(perPage);

  res.json(allposts);
};

module.exports = { doCreatePost, doUpdatePost, doAccessAllPosts };
