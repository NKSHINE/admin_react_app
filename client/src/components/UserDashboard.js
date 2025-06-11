import { useState } from "react";
import axios from "axios";

function UserDashboard({ user, setUser }) {
  const [name, setName] = useState(user.name);
  const [address, setAddress] = useState(user.address);
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");

  const update = () => {
    axios.put("http://localhost:5000/api/update", {
      email: user.email,
      name,
      address,
    })
    .then(() => {
      setMessage("Details updated successfully!");
      setMessageColor("green");
    })
    .catch(() => {
      setMessage("Failed to update details.");
      setMessageColor("red");
    });
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/logout", {});
      setUser(null);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="userdashboard-container">
      <h2>Welcome {user.name}</h2>
      {message && <p style={{ color: messageColor }}>{message}</p>}

      <div>
        <label>
          Name:
          <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Address:
          <input
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
      </div>

      <button onClick={update}>Update</button>

      <div className="logout-container">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserDashboard;
