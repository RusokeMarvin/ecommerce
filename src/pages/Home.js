import { useState, useEffect } from "react";
import api from "../api";
import Post from "../components/Post";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import  "../styles/Home.css"

function Home() {
  const [posts, setPosts] = useState([]);
  const [shoes, setShoes] = useState([]);


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
      <Footer/>
    </div>
  );
}

export default Home;
