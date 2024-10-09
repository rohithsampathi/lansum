import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { mockUsers } from './utils/data';
import LoginView from './views/LoginView';
import DashboardView from './views/DashboardView';
import AddIssueView from './views/AddIssueView';
import ManageUsersView from './views/ManageUsersView';
import ManageCategoriesView from './views/ManageCategoriesView';
import ProfileView from './views/ProfileView';
import NotFoundView from './views/NotFoundView';

const App = () => {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    const foundUser = mockUsers.find(
      (u) => u.username === username && u.password === password
    );
    if (foundUser) {
      setUser(foundUser);
    } else {
      alert('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <Router>
      {user ? (
        <Routes>
          <Route
            path="/dashboard"
            element={<DashboardView user={user} logout={logout} />}
          />
          <Route path="/add-issue" element={<AddIssueView user={user} />} />
          <Route
            path="/manage-users"
            element={
              user.isAdmin ? (
                <ManageUsersView user={user} />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            }
          />
          <Route
            path="/manage-categories"
            element={
              user.isAdmin ? (
                <ManageCategoriesView user={user} />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            }
          />
          <Route
            path="/profile"
            element={<ProfileView user={user} setUser={setUser} />}
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<NotFoundView />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<LoginView login={login} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;