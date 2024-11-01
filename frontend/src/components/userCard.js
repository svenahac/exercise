import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UserCard({ user, onUserUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    age: user.age,
    gender: user.gender,
  });

  // Reset formData when the selected user changes
  useEffect(() => {
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      age: user.age,
      gender: user.gender,
    });
  }, [user]);

  // Toggle edit mode
  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission to update user data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://dummyjson.com/users/${user.id}`,
        formData
      );
      onUserUpdate(response.data); // Update parent component with new user data
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="bg-syyclopsBlue text-white shadow-lg rounded-lg p-8 w-[40rem]">
      <div className="flex items-center">
        <img
          src={`https://dummyimage.com/100x100/DC5A27/fff&text=${user.firstName[0].toUpperCase()}`}
          alt={user.firstName}
          className="rounded-full w-24 h-24"
        />
        <div className="ml-6">
          {isEditing ? (
            <div className="flex flex-row">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="p-2 rounded text-lg text-black font-semibold w-32 mr-2"
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="p-2 rounded text-lg text-black font-semibold w-32"
              />
            </div>
          ) : (
            <h2 className="text-2xl text-syyclopsOrange font-semibold">
              {user.firstName} {user.lastName}
            </h2>
          )}
          {isEditing ? (
            <div className="flex flex-col">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="text-black p-2 rounded text-lg mt-2 w-80 mr-2"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="text-black p-2 rounded text-lg mt-2 w-60"
              />
            </div>
          ) : (
            <>
              <p className="text-lg">{user.email}</p>
              <p className="text-lg">{user.phone}</p>
            </>
          )}
        </div>
      </div>
      <div className="mt-6">
        {isEditing ? (
          <>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="text-black p-2 rounded text-lg w-20 mr-2"
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="text-black p-2 rounded text-lg mt-2"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </>
        ) : (
          <>
            <p className="text-lg">Age: {user.age}</p>
            <p className="text-lg">Gender: {user.gender}</p>
          </>
        )}
      </div>
      <div className="mt-4">
        {isEditing ? (
          <div>
            <button
              onClick={handleSubmit}
              className="bg-syyclopsOrange text-blue font-bold px-4 py-2 rounded mr-2"
            >
              Save
            </button>
            <button
              onClick={toggleEdit}
              className="bg-gray-400 text-blue font-bold px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={toggleEdit}
            className="bg-syyclopsOrange text-blue font-bold px-4 py-2 rounded"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}
