import { useState } from "react";
import axios from "axios";

function UserDashboard({ user,setUser }) {
  const [name, setName] = useState(user.name);
  const [address, setAddress] = useState(user.address);
  

  const update = () => {
    axios.put("http://localhost:5000/api/update", {
      email: user.email,
      name,
      address,
    }).then(() => alert("Details updated"));
  };
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/logout", {}, );
      setUser(null);
    } catch (err) {
      
      
      alert(err);
    }
  };

  return (
    <div className="userdashboard-container">
      <h2>Welcome {user.name}</h2>
      
      <input value={name} onChange={e => setName(e.target.value)} />
      <input value={address} onChange={e => setAddress(e.target.value)} />
      <button onClick={update}>Update</button>
      <div className="logout-container">
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
export default UserDashboard;
