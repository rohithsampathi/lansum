// src/views/AddIssueView.js
import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../components/Card';
import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button';
import { categoriesData, addIssue } from '../utils/data';
import { useNavigate } from 'react-router-dom';

const AddIssueView = ({ user }) => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState(categoriesData[0]);
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (subject && description) {
      addIssue(subject, category, description, user.username);
      alert('Issue raised successfully');
      navigate('/dashboard');
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="p-4">
      <Card className="w-full max-w-md mx-auto mt-10">
        <CardHeader>Raise Issue</CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Input
              name="subject"
              placeholder="Subject"
              maxLength={200}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="mb-4"
            />
            <Select
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mb-4"
            >
              {categoriesData.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Select>
            <textarea
              name="description"
              placeholder="Description"
              maxLength={1000}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button type="submit" className="w-full">
              Submit Issue
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddIssueView;
