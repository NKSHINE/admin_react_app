import { useState } from "react";
import axios from "axios";

function UserDashboard({ user }) {
  const [name, setName] = useState(user.name);
  const [address, setAddress] = useState(user.address);

  const update = () => {
    axios.put("http://localhost:5000/api/update", {
      email: user.email,
      name,
      address,
    }).then(() => alert("Details updated"));
  };

  return (
    <div className="userdashboard-container">
      <h2>User Dashboard</h2>
      <input value={name} onChange={e => setName(e.target.value)} />
      <input value={address} onChange={e => setAddress(e.target.value)} />
      <button onClick={update}>Update</button>
    </div>
  );
}
export default UserDashboard;
