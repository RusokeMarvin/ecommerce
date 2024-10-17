import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";
import { useRive, Layout, Fit, Alignment } from "@rive-app/react-canvas";

function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Register";

  const { rive, RiveComponent } = useRive({
    src: "/animation.riv",
    stateMachines: "Login Machine",
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });

  const [isChecking, setIsChecking] = useState(null);
  const [isHandsUp, setIsHandsUp] = useState(null);
  const [trigSuccess, setTrigSuccess] = useState(null);
  const [trigFail, setTrigFail] = useState(null);

  // Initialize state machine inputs when Rive is ready
  useEffect(() => {
    if (rive) {
      const inputs = rive.stateMachineInputs("Login Machine");
      setIsChecking(inputs.find((input) => input.name === "isChecking"));
      setIsHandsUp(inputs.find((input) => input.name === "isHandsUp"));
      setTrigSuccess(inputs.find((input) => input.name === "trigSuccess"));
      setTrigFail(inputs.find((input) => input.name === "trigFail"));
    }
  }, [rive]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post(route, { username, password });

      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);

        if (trigSuccess) trigSuccess.fire(); // Success animation
        setTimeout(() => navigate("/"), 1000); // Navigate after animation
      } else {
        navigate("/login");
      }
    } catch (error) {
      alert(error);
      if (trigFail) trigFail.fire(); // Failure animation
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-containers">
      <div className="riv">
        <RiveComponent />
      </div>

      <form onSubmit={handleSubmit} className="form-container">
        <h1>{name}</h1>

        <input
          className="form-input"
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            if (isHandsUp) isHandsUp.value = false;
            if (isChecking) isChecking.value = true;
          }}
          placeholder="Username"
          required
        />
        <br />

        <input
          className="form-input"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (isChecking) isChecking.value = false;
            if (isHandsUp) isHandsUp.value = true;
          }}
          placeholder="Password"
          required
        />
        <br />

        <button className="form-button" type="submit" disabled={loading}>
          {loading ? "Loading..." : name}
        </button>

        {/* Conditional Link Below the Button */}
        <div className="form-link">
          {method === "login" ? (
            <Link to="/register" className="linking">
              <li>You don't have an account? <span>Register</span></li>
            </Link>
          ) : (
            <Link to="/login" className="linking">
              <li>You already have an account? <span>Login</span></li>
            </Link>
          )}
        </div>
      </form>
    </div>
  );
}

export default Form;
