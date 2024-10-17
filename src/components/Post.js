import React from "react";

function Post({ post, onDelete }) {

  return <div className="post-container">
  <img 
        src={post.email} 
        alt="Post Visual" 
        className="post-image"
        style={{ width: "200px", height: "200px", objectFit: "cover" }}
      />
    <p className="post-title">{post.title}</p>
    <p className="post-author">{post.author}</p>
  </div>;
}

export default Post