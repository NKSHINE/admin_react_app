import { useEffect, useState, useCallback } from "react";
import UserDashboard from "./UserDashboard";
import axios from "axios";
import "../App.css";



function AdminDashboard({ user, setUser }) {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [updatingUser, setUpdatingUser] = useState(null);
  const fetchUsers = useCallback(() => {
    axios
      .get(
        `http://localhost:5000/api/users?email=${encodeURIComponent(
          user.email
        )}&isAdmin=${user.isAdmin}`
      )
      .then((res) => setUsers(res.data))
      .catch(() => alert("Unauthorized or error fetching users."));
  }, [user.email, user.isAdmin]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (updatingUser) {
    return <UserDashboard user={updatingUser} setUser={setUser} />;
  }



  const handleDelete = (id) => {
   
      axios
        .delete(`http://localhost:5000/api/users/${id}`, {
          params: { email: user.email, isAdmin: user.isAdmin },
        })
        .then(() => {
          
          fetchUsers();
        })
        .catch(() => alert("Failed to delete user"));
    
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/logout");
      setUser(null);
    } catch (err) {
      alert(err);
    }
  };

  const filteredUsers = users.filter((u) =>
    [u.name, u.email, u.address].some((field) =>
      field.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="dashboard-container">
      <div className="top-bar">
        <h2>Welcome {user.name}</h2>
        <div className="logout-container">
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <input type="text" placeholder="Search by name, email or address" className="search-bar" value={search} onChange={(e) => setSearch(e.target.value)}/>

      <div className="card-container">
        {filteredUsers.map((u) => (
          <div className="user-card" key={u._id}>
            <p><strong>Name:</strong> {u.name}</p>
            <p><strong>Email:</strong> {u.email}</p>
            <p><strong>Address:</strong> {u.address}</p>
            <button className="delete-btn" onClick={() => handleDelete(u._id)}> Delete </button>
            <button className="delete-btn" onClick={() => setUpdatingUser(u)}> Update</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
