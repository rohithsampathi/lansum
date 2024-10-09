// src/views/LoginView.js
import React from 'react';
import { Card, CardHeader, CardContent } from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';

const LoginView = ({ login }) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
    <h1 className="text-4xl font-bold text-white mb-8">CommUnity Hub</h1>
    <Card className="w-full max-w-md">
      <CardHeader>Login</CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            login(e.target.username.value, e.target.password.value);
          }}
        >
          <Input name="username" placeholder="Username" className="mb-4" />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            className="mb-4"
          />
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  </div>
);

export default LoginView;
