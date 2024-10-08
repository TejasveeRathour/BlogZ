import React, { useContext, useEffect, useState } from 'react';
import { formatISO9075 } from "date-fns";
import { Link, useNavigate} from 'react-router-dom';
import { UserContext } from '../context/usercontext';
const myImage = require('../Images/like.png');

const Post = (props) => 
{
  const navigate = useNavigate();
  const {userInfo, setUserInfo} = useContext(UserContext);   
  const [buttontxt,setbuttontext] = useState('saved'); 
  const [liketxt,setliketext] = useState('');
  const [likes,setlikes] = useState(props.likes);
  
  useEffect(()=>
  {
    if(userInfo == null) 
    {
        setUserInfo(null);
        navigate("/login");
    }
    // checking for a post is saved or not
    if(props.savedPost.includes(userInfo.id))
    {
        setbuttontext("saved");
    }
    else
    {
        setbuttontext("want to save");
    }

    // setting Likes Count of a post
    if(props.likeduser.includes(userInfo.id))
    {
        setliketext("Liked");
    }
    else
    {
      setliketext("Like");
    }
  },[]);


  const savePost = async(event)=>
  {
    if(buttontxt === "want to save")
    {
        setbuttontext("saved");
    }
    else
    {
        setbuttontext("want to save");
    }
    await fetch(`http://127.0.0.1:5000/api/v1/blog/savePost`, {
      method: 'PUT',
      body: JSON.stringify({postId: props._id, userId: userInfo.id}),
      headers:{'Content-Type':'application/json',
                'token': localStorage.getItem('token')},
    });
  }

  const likefn = async(event)=>
  {
    if(liketxt === "Like")
    {
      setlikes(likes+1);
      setliketext("Liked");
    }
    else
    {
      setlikes(likes-1);
      setliketext("Like");
    }
    await fetch(`http://127.0.0.1:5000/api/v1/blog/likepost`, {
      method: 'PUT',
      body: JSON.stringify({postId: props._id, userId: userInfo.id}),
      headers:{'Content-Type':'application/json',
                'token': localStorage.getItem('token')},
    }); 
  }

  return (
    <>
      <div className="post">
        <div className="image">
          <Link to={`/post/${props._id}`}>
            <img src={'http://localhost:5000/' + props.cover} alt="error" height="200px" width="350" />
          </Link>

        </div>
        <div className="texts">
          <Link to={`/post/${props._id}`}>
            <h2>{props.title}</h2>  
          </Link>
          <p className="info">
            <Link to={`/${props.authorId._id}`}>
              <a className="author" href="/">{props.authorId.name}</a>
            </Link>
            <time>{formatISO9075(new Date(props.createdAt))}</time>
          </p>
          <p className="summary">{props.summary}</p>
          <div className="button-sec">
          <button onClick={likefn} className='b2 button-icon'><img src={myImage}  alt="error"/>{liketxt} {likes}</button>
          <Link className='b2' to={`/post/${props._id}`}><button>View Post</button></Link>
          <button className='b1' onClick={savePost}>{buttontxt}</button>
          </div>
          
        </div>
      </div>
    </>
  )
};

export default Post;

