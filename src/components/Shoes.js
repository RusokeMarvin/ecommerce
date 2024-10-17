import React from "react";

function Shoe({ shoe, onDelete }) {

  return <div className="post-container">
  <img 
        src={shoe.email} 
        alt="Post Visual" 
        className="post-image"
        style={{ width: "200px", height: "200px", objectFit: "cover" }}
      />
    <p className="post-title">{shoe.title}</p>
    <p className="post-author">{shoe.author}</p>
  </div>;
}

export default Shoe