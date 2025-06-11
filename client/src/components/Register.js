import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

function Register() {
  const [form, setForm] = useState({ name: "", address: "", email: "", password: "" });
  
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
      const res = await axios.post("http://localhost:5000/api/register", form);
      setUser(res.data); // ✅ Set user to trigger redirection
      setMessage("Registered successfully!");
      setMessageColor("green");
      

    } catch (error) {
      setMessage("Registration failed. Please try again.");
      setMessageColor("red");
    }
  };

  if (user?.isAdmin) return <AdminDashboard user={user} setUser={setUser} />;
  else if (user) return <UserDashboard user={user}  setUser={setUser} />;

  return (
    <div className="register-container">
      <h2>Register</h2>
      {message && <p style={{ color: messageColor }}>{message}</p>}
      <form onSubmit={handleSubmit} className="register-form">
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="address" placeholder="Address" onChange={handleChange} required />
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
      <p>Already registered? <Link to="/">Login</Link></p>
    </div>
  );
}

export default Register;
