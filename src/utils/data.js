// Mock Users
export let mockUsers = [
    {
      id: 1,
      username: 'resident1',
      password: 'pass1',
      isAdmin: false,
      flatNumber: 'A101',
    },
    {
      id: 2,
      username: 'admin',
      password: 'adminpass',
      isAdmin: true,
      flatNumber: 'ADMIN',
    },
  ];
  
  // Mock Categories
  export let categoriesData = [
    'Maintenance',
    'Security',
    'Cleanliness',
    'Parking',
  ];
  
  // Mock Issues
  export let issuesData = [
    {
      id: 1,
      subject: 'Broken elevator',
      category: 'Maintenance',
      description: 'The elevator in block A is broken since yesterday.',
      createdBy: 'resident1',
      upvotes: 5,
      upvotedBy: ['resident2', 'resident3'],
      createdOn: '2024-10-08',
      status: 'Open',
    },
    {
      id: 2,
      subject: 'Unauthorized parking',
      category: 'Parking',
      description: 'Someone is parking in my designated spot.',
      createdBy: 'resident1',
      upvotes: 3,
      upvotedBy: ['resident4'],
      createdOn: '2024-10-09',
      status: 'In Progress',
    },
  ];
  
  // Add a new issue
  export const addIssue = (subject, category, description, createdBy) => {
    const newIssue = {
      id: issuesData.length + 1,
      subject,
      category,
      description,
      createdBy,
      upvotes: 0,
      upvotedBy: [],
      createdOn: new Date().toISOString().split('T')[0],
      status: 'Open',
    };
    issuesData.push(newIssue);
  };
  
  // Upvote an issue
  export const upvoteIssue = (issueId, username) => {
    const issue = issuesData.find((i) => i.id === issueId);
    if (issue && !issue.upvotedBy.includes(username) && issue.status !== 'Closed') {
      issue.upvotes += 1;
      issue.upvotedBy.push(username);
    }
  };
  
  // Close an issue
  export const closeIssue = (issueId) => {
    const issue = issuesData.find((i) => i.id === issueId);
    if (issue) {
      issue.status = 'Closed';
    }
  };
  
  // Change issue status
  export const changeIssueStatus = (issueId, status) => {
    const issue = issuesData.find((i) => i.id === issueId);
    if (issue) {
      issue.status = status;
    }
  };
  
  // Add a new category
  export const addCategory = (category) => {
    if (!categoriesData.includes(category)) {
      categoriesData.push(category);
    }
  };
  
  // Delete a category
  export const deleteCategory = (category) => {
    categoriesData = categoriesData.filter((c) => c !== category);
  };
  
  // Add a new user
  export const addUser = (newUser) => {
    newUser.id = mockUsers.length + 1;
    mockUsers.push(newUser);
  };
  
  // Delete a user
  export const deleteUser = (userId) => {
    mockUsers = mockUsers.filter((u) => u.id !== userId);
  };
  
  // Update user password
  export const updateUserPassword = (username, newPassword) => {
    const user = mockUsers.find((u) => u.username === username);
    if (user) {
      user.password = newPassword;
    }
  };
  
  // Get issue counts for charts
  export const getIssueCounts = () => {
    const counts = { Open: 0, 'In Progress': 0, 'On Hold': 0, Closed: 0 };
    issuesData.forEach((issue) => counts[issue.status]++);
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  };
  
  export const getCategoryCounts = () => {
    const counts = {};
    issuesData.forEach((issue) => {
      counts[issue.category] = (counts[issue.category] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  };