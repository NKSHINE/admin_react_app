import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";


function AdminDashboard({ user }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/users?email=${encodeURIComponent(user.email)}&isAdmin=${user.isAdmin}`)
      .then(res => setUsers(res.data))
      .catch(() => alert("Unauthorized or error fetching users."));
  }, [user]);

  return (
    <div className="dashboard-container">
      <h2>Admin: All Users</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {users.map(u => (
          <li className="user-item" key={u._id}>
            {u.name} | {u.email} | {u.address}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
