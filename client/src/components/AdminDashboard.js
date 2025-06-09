import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

function AdminDashboard({ user }) {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    axios
      .get(`http://localhost:5000/api/users?email=${encodeURIComponent(user.email)}&isAdmin=${user.isAdmin}`)
      .then(res => setUsers(res.data))
      .catch(() => alert("Unauthorized or error fetching users."));
  };

  useEffect(() => {
    fetchUsers();
  }, [user]);

  const handleDelete = (id) => {
  if (window.confirm("Are you sure you want to delete this user?")) {
    axios
      .delete(`http://localhost:5000/api/users/${id}`, {
        params: {
          email: user.email,
          isAdmin: user.isAdmin
        }
      })
      .then(() => {
        alert("User deleted");
        fetchUsers(); // Refresh list
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to delete user");
      });
  }
};


  return (
    <div className="dashboard-container">
      <h2>Admin: All Users</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {users.map(u => (
          <li className="user-item" key={u._id}>
            {u.name} | {u.email} | {u.address}
            <button
              className="delete-btn"
              onClick={() => handleDelete(u._id)}
              style={{ marginLeft: "10px", color: "white", backgroundColor: "red", border: "none", padding: "5px 10px", cursor: "pointer" }}
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
