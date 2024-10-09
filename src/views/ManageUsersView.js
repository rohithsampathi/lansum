// src/views/ManageUsersView.js
import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { mockUsers, addUser, deleteUser } from '../utils/data';

const ManageUsersView = ({ user }) => {
  const [users, setUsers] = useState([...mockUsers]);
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    flatNumber: '',
    isAdmin: false,
  });

  const handleAddUser = (e) => {
    e.preventDefault();
    if (newUser.username && newUser.password && newUser.flatNumber) {
      addUser(newUser);
      setUsers([...mockUsers]);
      alert('User added successfully');
      setNewUser({
        username: '',
        password: '',
        flatNumber: '',
        isAdmin: false,
      });
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(userId);
      setUsers([...mockUsers]);
      alert('User deleted successfully');
    }
  };

  return (
    <div className="p-4">
      <Card className="w-full max-w-md mx-auto mt-10">
        <CardHeader>Manage Users</CardHeader>
        <CardContent>
          <form onSubmit={handleAddUser}>
            <Input
              name="username"
              placeholder="Username"
              value={newUser.username}
              onChange={(e) =>
                setNewUser({ ...newUser, username: e.target.value })
              }
              className="mb-4"
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              className="mb-4"
            />
            <Input
              name="flatNumber"
              placeholder="Flat Number"
              value={newUser.flatNumber}
              onChange={(e) =>
                setNewUser({ ...newUser, flatNumber: e.target.value })
              }
              className="mb-4"
            />
            <div className="mb-4">
              <input
                type="checkbox"
                name="isAdmin"
                checked={newUser.isAdmin}
                onChange={(e) =>
                  setNewUser({ ...newUser, isAdmin: e.target.checked })
                }
                id="isAdmin"
              />
              <label htmlFor="isAdmin" className="ml-2">
                Is Admin
              </label>
            </div>
            <Button type="submit" className="w-full">
              Add User
            </Button>
          </form>
          <h3 className="mt-6 mb-2 font-semibold">Existing Users</h3>
          <ul>
            {users.map((u) => (
              <li
                key={u.id}
                className="flex justify-between items-center mb-2"
              >
                {u.username} ({u.flatNumber})
                <Button
                  onClick={() => handleDeleteUser(u.id)}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageUsersView;
