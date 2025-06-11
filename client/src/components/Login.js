import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";



function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setMessage("Please enter a valid email address.");
      setMessageColor("red");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/login", form,{ withCredentials: true });
      setUser(res.data.user);
    } catch (error) {
      setMessage("Please check your credentials");
      setMessageColor("red");
    }
  };


  if (user?.isAdmin) return <AdminDashboard user={user} setUser={setUser} />;
  else if (user) return <UserDashboard user={user}  setUser={setUser} />;

  return (
    <div className="login-container">
      <h2>Login</h2>
      {message && <p style={{ color: messageColor }}>{message}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
}

export default Login;
