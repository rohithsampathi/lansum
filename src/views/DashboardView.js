import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardHeader, CardContent } from '../components/Card';
import Button from '../components/Button';
import Table from '../components/Table';
import Modal from '../components/Modal';
import Select from '../components/Select';
import {
  getIssueCounts,
  getCategoryCounts,
  issuesData,
  upvoteIssue,
  closeIssue,
  changeIssueStatus,
} from '../utils/data';
import { calculateIssueAge, exportToCSV } from '../utils/helpers';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from 'recharts';

const COLORS = ['#4CAF50', '#2196F3', '#FFC107', '#FF5722', '#9C27B0', '#795548'];
const STATUS_COLORS = {
  'Open': '#4CAF50',
  'In Progress': '#2196F3',
  'On Hold': '#FFC107',
  'Closed': '#FF5722'
};

const DashboardView = ({ user, logout }) => {
  const navigate = useNavigate();
  const [issues, setIssues] = useState(issuesData);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [startDate, setStartDate] = useState(new Date(new Date().setMonth(new Date().getMonth() - 1)));
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    // Filter issues based on date range
    const filteredIssues = issuesData.filter(issue => {
      const issueDate = new Date(issue.createdOn);
      return issueDate >= startDate && issueDate <= endDate;
    });
    setIssues(filteredIssues);
  }, [startDate, endDate]);

  const handleUpvote = (issueId) => {
    upvoteIssue(issueId, user.username);
    setIssues([...issuesData]);
  };

  const handleCloseIssue = (issueId) => {
    if (window.confirm('Are you sure you want to close this issue?')) {
      closeIssue(issueId);
      setIssues([...issuesData]);
    }
  };

  const handleStatusChange = (issueId, status) => {
    changeIssueStatus(issueId, status);
    setIssues([...issuesData]);
  };

  const openIssueModal = (issue) => {
    setSelectedIssue(issue);
    setModalOpen(true);
  };

  const handleExport = () => {
    const data = issues.map(issue => ({
      Subject: issue.subject,
      Category: issue.category,
      CreatedBy: issue.createdBy,
      Upvotes: issue.upvotes,
      CreatedOn: issue.createdOn,
      Status: issue.status,
    }));
    exportToCSV(data, 'issues_export.csv');
  };

  const getIssueCountsByStatus = () => {
    const statusCounts = {
      'Open': Array(12).fill(0),
      'In Progress': Array(12).fill(0),
      'On Hold': Array(12).fill(0),
      'Closed': Array(12).fill(0)
    };

    issues.forEach(issue => {
      const date = new Date(issue.createdOn);
      const monthIndex = date.getMonth();
      statusCounts[issue.status][monthIndex]++;
    });

    return Array(12).fill().map((_, index) => ({
      name: new Date(0, index).toLocaleString('default', { month: 'short' }),
      'Open': statusCounts['Open'][index],
      'In Progress': statusCounts['In Progress'][index],
      'On Hold': statusCounts['On Hold'][index],
      'Closed': statusCounts['Closed'][index]
    }));
  };

  const getIssueStatusCounts = () => {
    const counts = {
      'Open': 0,
      'In Progress': 0,
      'On Hold': 0,
      'Closed': 0
    };
    issues.forEach(issue => counts[issue.status]++);
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header user={user} logout={logout} />
      <main className="flex-grow p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                className="p-2 border rounded"
              />
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                className="p-2 border rounded"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>Issues by Category</CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={getCategoryCounts()}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {getCategoryCounts().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>Issues Over Time</CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={getIssueCountsByStatus()}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {Object.keys(STATUS_COLORS).map((status) => (
                      <Bar key={status} dataKey={status} stackId="a" fill={STATUS_COLORS[status]} />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          <Card className="mb-8">
            <CardHeader>Issues by Status</CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={getIssueStatusCounts()}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">EdenPulse</h2>
              <Button onClick={handleExport} className="bg-green-500 hover:bg-green-600">
                Export to Excel
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Subject</th>
                      <th className="px-4 py-2">Category</th>
                      <th className="px-4 py-2">Created By</th>
                      <th className="px-4 py-2">Upvotes</th>
                      <th className="px-4 py-2">Age (Days)</th>
                      <th className="px-4 py-2">Status</th>
                      <th className="px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {issues.map((issue) => (
                      <tr key={issue.id} className="hover:bg-gray-50">
                        <td className="px-4 py-2">
                          <button
                            onClick={() => openIssueModal(issue)}
                            className="text-blue-600 hover:underline"
                          >
                            {issue.subject}
                          </button>
                        </td>
                        <td className="px-4 py-2">{issue.category}</td>
                        <td className="px-4 py-2">{issue.createdBy}</td>
                        <td className="px-4 py-2">{issue.upvotes}</td>
                        <td className="px-4 py-2">{calculateIssueAge(issue.createdOn)}</td>
                        <td className="px-4 py-2">
                          {user.isAdmin ? (
                            <Select
                              value={issue.status}
                              onChange={(e) => handleStatusChange(issue.id, e.target.value)}
                              className="w-full"
                            >
                              <option value="Open">Open</option>
                              <option value="In Progress">In Progress</option>
                              <option value="On Hold">On Hold</option>
                              <option value="Closed">Closed</option>
                            </Select>
                          ) : (
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              issue.status === 'Open' ? 'bg-green-100 text-green-800' :
                              issue.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                              issue.status === 'On Hold' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {issue.status}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-2">
                          {!user.isAdmin && issue.status !== 'Closed' && !issue.upvotedBy.includes(user.username) && (
                            <Button onClick={() => handleUpvote(issue.id)} className="mr-2 bg-blue-500 hover:bg-blue-600">
                              Upvote
                            </Button>
                          )}
                          {(user.isAdmin || user.username === issue.createdBy) && issue.status !== 'Closed' && (
                            <Button onClick={() => handleCloseIssue(issue.id)} className="bg-red-500 hover:bg-red-600">Close</Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </CardContent>
          </Card>
          {!user.isAdmin && (
            <Button onClick={() => navigate('/add-issue')} className="mt-6 bg-green-500 hover:bg-green-600">
              Raise New Issue
            </Button>
          )}
          {user.isAdmin && (
            <div className="mt-6 flex flex-wrap gap-4">
              <Button onClick={() => navigate('/manage-users')} className="bg-blue-500 hover:bg-blue-600">
                Manage Users
              </Button>
              <Button onClick={() => navigate('/manage-categories')} className="bg-purple-500 hover:bg-purple-600">
                Manage Categories
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Issue Details"
      >
        {selectedIssue && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{selectedIssue.subject}</h3>
            <p className="text-gray-600">{selectedIssue.description}</p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Created by: {selectedIssue.createdBy}</span>
              <span>Created on: {selectedIssue.createdOn}</span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DashboardView;