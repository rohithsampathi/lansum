// src/views/ProfileView.js
import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { updateUserPassword } from '../utils/data';
import { useNavigate } from 'react-router-dom';

const ProfileView = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (
      passwords.newPassword === passwords.confirmPassword &&
      passwords.currentPassword === user.password
    ) {
      updateUserPassword(user.username, passwords.newPassword);
      setUser({ ...user, password: passwords.newPassword });
      alert('Password updated successfully');
      navigate('/dashboard');
    } else {
      alert('Password mismatch or incorrect current password');
    }
  };

  return (
    <div className="p-4">
      <Card className="w-full max-w-md mx-auto mt-10">
        <CardHeader>Profile</CardHeader>
        <CardContent>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Flat Number:</strong> {user.flatNumber}
          </p>
          <form onSubmit={handleChangePassword} className="mt-4">
            <Input
              name="currentPassword"
              type="password"
              placeholder="Current Password"
              value={passwords.currentPassword}
              onChange={(e) =>
                setPasswords({ ...passwords, currentPassword: e.target.value })
              }
              className="mb-4"
            />
            <Input
              name="newPassword"
              type="password"
              placeholder="New Password"
              value={passwords.newPassword}
              onChange={(e) =>
                setPasswords({ ...passwords, newPassword: e.target.value })
              }
              className="mb-4"
            />
            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirm New Password"
              value={passwords.confirmPassword}
              onChange={(e) =>
                setPasswords({ ...passwords, confirmPassword: e.target.value })
              }
              className="mb-4"
            />
            <Button type="submit" className="w-full">
              Change Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileView;
