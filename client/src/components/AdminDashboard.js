import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

function AdminDashboard({ user, setUser }) {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    axios
      .get(
        `http://localhost:5000/api/users?email=${encodeURIComponent(
          user.email
        )}&isAdmin=${user.isAdmin}`
      )
      .then((res) => setUsers(res.data))
      .catch(() => alert("Unauthorized or error fetching users."));
  };

  useEffect(() => {
    fetchUsers();
  }, [user]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`http://localhost:5000/api/users/${id}`, {
          params: { email: user.email, isAdmin: user.isAdmin },
        })
        .then(() => {
          alert("User deleted");
          fetchUsers(); // Refresh list
        })
        .catch(() => alert("Failed to delete user"));
    }
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
    <div className="dashboard-container">
      <h2>Admin: All Users</h2>
      <div className="logout-container">
         <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {users.map((u) => (
          <li className="user-item" key={u._id}>
            {u.name} | {u.email} | {u.address}
            <button
              className="delete-btn"
              onClick={() => handleDelete(u._id)}
              style={{
                marginLeft: "10px",
                color: "white",
                backgroundColor: "red",
                border: "none",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
