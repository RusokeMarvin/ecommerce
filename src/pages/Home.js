import { useState, useEffect } from "react";
import api from "../api";
import Post from "../components/Post";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import "../styles/Home.css";

function Home() {
  const [shoes, setShoes] = useState([]);
  const [phones, setPhones] = useState([]);
  const [clothes, setClothes] = useState([]);

  // Fetch shoes posts on component mount
  useEffect(() => {
    fetchShoesPosts();
    fetchPhonesPosts();
    fetchClothesPosts();
  }, []); // Empty dependency ensures this runs only once on mount

  const fetchShoesPosts = () => {
    api
      .get("/posts/shoes/")
      .then((res) => setShoes(res.data))
      .catch((err) => alert("Failed to load shoes posts: " + err));
  };

  const fetchClothesPosts = () => {
    api
      .get("/posts/clothes/")
      .then((res) => setClothes(res.data))
      .catch((err) => alert("Failed to load shoes posts: " + err));
  };

  const fetchPhonesPosts = () => {
    api
      .get("/posts/tech/")
      .then((res) => setPhones(res.data))
      .catch((err) => alert("Failed to load phone posts: " + err));
  };

  return (
    <div className="home">
      <Header />
      
      {/* Shoes Section */}
      <h1>Top Shoe Brands | Best Prices</h1>
      <div className="post-grid">
        {shoes.map((shoe) => (
          <Post post={shoe} key={shoe.id} />
        ))}
      </div>

      {/* Phones Section */}
      <h1>Top Phones | Best Prices</h1>
      <div className="post-grid">
        {phones.map((phone) => (
          <Post post={phone} key={phone.id} />
        ))}
      </div>

      {/* Outfits Section */}
      <h1>Top Outfits | Best Prices</h1>
      <div className="post-grid">
        {clothes.map((cloth) => (
          <Post post={cloth} key={cloth.id} />
        ))}</div>

      <Footer />
    </div>
  );
}

export default Home;
