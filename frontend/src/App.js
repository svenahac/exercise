import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./components/sidebar";
import UserCard from "./components/userCard";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  async function getUsers() {
    try {
      const response = await axios.get(
        "https://dummyjson.com/users?limit=20&select=id,firstName,lastName,age,gender,email,phone"
      );
      setUsers(response.data.users);
      setSelectedUser(response.data.users[0]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  // Update the selected user with new data and remove the previous one from the sidebar
  const handleUserUpdate = (updatedUser) => {
    setSelectedUser(updatedUser);
    setUsers(
      (prevUsers) =>
        prevUsers
          .filter((user) => user.id !== updatedUser.id) // Remove previous user
          .concat(updatedUser) // Add updated user back
    );
  };

  // If users is empty, display nothing
  if (loading) return <div></div>;

  return (
    <div className="flex h-screen w-full">
      <div className="fixed left-0 top-0 h-full">
        <Sidebar
          users={users}
          selectedUser={selectedUser}
          onUserClick={setSelectedUser}
        />
      </div>
      <div className="flex-grow flex justify-center items-center ml-64">
        {selectedUser && (
          <UserCard user={selectedUser} onUserUpdate={handleUserUpdate} />
        )}
      </div>
    </div>
  );
}

export default App;
