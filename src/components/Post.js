import React from "react";

function Post({ post }) {
  return (
    <div className="post-container">
      <div className="cost-badge">{"-"+post.cost}</div> {/* Cost in top-right corner */}
      <img
        src={post.email} // Used as image source (as per your code)
        alt="Post Visual"
        className="post-image"
        style={{ width: "200px", height: "200px", objectFit: "cover" }}
      />
      <p className="post-title">{post.title}</p>
      <p className="post-author">{post.author}</p>
    </div>
  );
}

export default Post;
