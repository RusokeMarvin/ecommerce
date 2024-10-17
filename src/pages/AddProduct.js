import { useState, useEffect } from "react";
import api from "../api";
import Post from "../components/Post";
import Shoe from "../components/Shoes";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import  "../styles/Home.css"

function AddProduct() {
  const [posts, setPosts] = useState([]);
  const [shoes, setShoes] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    getPosts();
    getShoes();
  });

  const getPosts = () => {
    api
      .get("/posts/")
      .then((res) => res.data)
      .then((data) => {
        setPosts(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const getShoes = () => {
    api
      .get("/shoes/")
      .then((res) => res.data)
      .then((data) => {
        setShoes(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deletePost = (id) => {
    api
      .delete(`/posts/details/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Post deleted!");
        else alert("Failed to delete post.");
        getPosts();
      })
      .catch((error) => alert(error));
  };

  const createPost = (e) => {
    e.preventDefault();
    api
      .post("/posts/", { title,author,email })
      .then((res) => {
        if (res.status === 201) alert("Note created!");
        else alert("Failed to make post");
        getPosts();
      })
      .catch((error) => alert(error));
  };

  return (
    <div className="home">
    <Header/>
      <h1>Top Phones | Best Prices</h1>
      <div className="post-grid">
      {posts.map((post) => <Post post={post} onDelete={deletePost} key={post.id}/>)}
      </div>
      <h1>Top Shoe Brands | Best Prices</h1>
      <div className="post-grid">
      {shoes.map((shoe) => <Post post={shoe} onDelete={deletePost} key={shoe.id}/>)}
      </div>
      <form onSubmit={createPost}>
        <label htmlFor="title">Title</label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <br />
        <label>Author</label>
        <br />
        <input
          type="text"
          id="author"
          name="author"
          required
          onChange={(e) => setAuthor(e.target.value)}
          value={author}
        />
        <br />
        <label>Email</label>
        <br />
        <input
          type="email"
          id="email"
          name="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <br />
        <input type="submit" value="Submit"/>
      </form>
      <Footer/>
    </div>
  );
}

export default AddProduct;
