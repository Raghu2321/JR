// ========================================
// JOB READY — Mock Data Store
// ========================================

export const store = {
  // Current user role
  currentRole: null, // 'student' | 'company' | 'college'

  // ---- Student Data ----
  currentStudent: {
    id: 1,
    name: 'Arjun Mehta',
    initials: 'AM',
    title: 'Full Stack Developer',
    college: 'IIT Delhi',
    email: 'arjun@example.com',
    xp: 2450,
    level: 12,
    xpToNext: 550,
    xpForLevel: 3000,
    streak: 7,
    rank: 3,
    skills: [
      { name: 'JavaScript', level: 85, verified: true, xp: 620 },
      { name: 'React', level: 72, verified: true, xp: 480 },
      { name: 'Python', level: 68, verified: true, xp: 410 },
      { name: 'Node.js', level: 60, verified: false, xp: 340 },
      { name: 'SQL', level: 55, verified: true, xp: 280 },
      { name: 'TypeScript', level: 45, verified: false, xp: 200 },
    ],
    completedChallenges: 47,
    interviewsCompleted: 12,
    projectCount: 5,
    appliedJobs: [2, 5],
    savedJobs: [1, 4],
  },

  // ---- All Students (for leaderboard / recruiter view) ----
  students: [
    { id: 1, name: 'Arjun Mehta', initials: 'AM', xp: 2450, level: 12, college: 'IIT Delhi', title: 'Full Stack Developer', skills: ['JavaScript', 'React', 'Python', 'SQL'], verified: 4, avatar: '#4F46E5' },
    { id: 2, name: 'Priya Sharma', initials: 'PS', xp: 3120, level: 15, college: 'IIT Bombay', title: 'ML Engineer', skills: ['Python', 'TensorFlow', 'SQL', 'R'], verified: 4, avatar: '#7C3AED' },
    { id: 3, name: 'Rahul Kumar', initials: 'RK', xp: 2890, level: 14, college: 'BITS Pilani', title: 'Backend Developer', skills: ['Java', 'Spring Boot', 'AWS', 'Docker'], verified: 3, avatar: '#2563EB' },
    { id: 4, name: 'Sneha Patel', initials: 'SP', xp: 2200, level: 11, college: 'NIT Trichy', title: 'Frontend Developer', skills: ['React', 'CSS', 'TypeScript', 'Figma'], verified: 3, avatar: '#EC4899' },
    { id: 5, name: 'Vikram Singh', initials: 'VS', xp: 1950, level: 10, college: 'IIIT Hyderabad', title: 'Data Analyst', skills: ['Python', 'SQL', 'Tableau', 'Excel'], verified: 2, avatar: '#10B981' },
    { id: 6, name: 'Ananya Roy', initials: 'AR', xp: 1780, level: 9, college: 'IIT Madras', title: 'DevOps Engineer', skills: ['Docker', 'Kubernetes', 'AWS', 'Linux'], verified: 3, avatar: '#F59E0B' },
    { id: 7, name: 'Karthik Nair', initials: 'KN', xp: 1650, level: 8, college: 'VIT Vellore', title: 'Mobile Developer', skills: ['React Native', 'Flutter', 'Firebase'], verified: 2, avatar: '#EF4444' },
    { id: 8, name: 'Divya Iyer', initials: 'DI', xp: 1420, level: 7, college: 'SRM Chennai', title: 'UI/UX Designer', skills: ['Figma', 'CSS', 'JavaScript', 'Sketch'], verified: 2, avatar: '#8B5CF6' },
  ],

  // ---- Companies ----
  companies: [
    { id: 1, name: 'Google', initials: 'G', color: '#4285F4', industry: 'Tech' },
    { id: 2, name: 'Microsoft', initials: 'M', color: '#00A4EF', industry: 'Tech' },
    { id: 3, name: 'Amazon', initials: 'A', color: '#FF9900', industry: 'E-commerce' },
    { id: 4, name: 'Flipkart', initials: 'F', color: '#2874F0', industry: 'E-commerce' },
    { id: 5, name: 'Razorpay', initials: 'R', color: '#3395FF', industry: 'Fintech' },
    { id: 6, name: 'Zomato', initials: 'Z', color: '#E23744', industry: 'FoodTech' },
  ],

  currentCompany: {
    id: 1,
    name: 'Google',
    initials: 'G',
    color: '#4285F4',
    pipeline: { applied: 45, screened: 28, shortlisted: 12, hired: 4 }
  },

  // ---- Jobs ----
  jobs: [
    { id: 1, title: 'Frontend Developer', company: 'Google', companyId: 1, color: '#4285F4', initials: 'G', location: 'Bangalore', type: 'Full-time', salary: '₹18-25 LPA', xpRequired: 2000, skills: ['React', 'TypeScript', 'CSS'], posted: '2 days ago', applicants: 34, description: 'Build beautiful user interfaces for Google products.' },
    { id: 2, title: 'ML Engineer', company: 'Microsoft', companyId: 2, color: '#00A4EF', initials: 'M', location: 'Hyderabad', type: 'Full-time', salary: '₹22-30 LPA', xpRequired: 2500, skills: ['Python', 'TensorFlow', 'SQL'], posted: '1 day ago', applicants: 28, description: 'Develop ML models for Azure AI services.' },
    { id: 3, title: 'Backend Developer', company: 'Amazon', companyId: 3, color: '#FF9900', initials: 'A', location: 'Remote', type: 'Full-time', salary: '₹20-28 LPA', xpRequired: 2200, skills: ['Java', 'AWS', 'Docker'], posted: '3 days ago', applicants: 41, description: 'Build scalable microservices for Amazon.' },
    { id: 4, title: 'Full Stack Intern', company: 'Flipkart', companyId: 4, color: '#2874F0', initials: 'F', location: 'Bangalore', type: 'Internship', salary: '₹50K/month', xpRequired: 1000, skills: ['React', 'Node.js', 'MongoDB'], posted: '5 days ago', applicants: 67, description: 'Work on Flipkart\'s e-commerce platform.' },
    { id: 5, title: 'Data Analyst', company: 'Razorpay', companyId: 5, color: '#3395FF', initials: 'R', location: 'Bangalore', type: 'Full-time', salary: '₹12-18 LPA', xpRequired: 1500, skills: ['Python', 'SQL', 'Tableau'], posted: '1 week ago', applicants: 23, description: 'Analyze payment data and derive insights.' },
    { id: 6, title: 'React Native Developer', company: 'Zomato', companyId: 6, color: '#E23744', initials: 'Z', location: 'Gurgaon', type: 'Full-time', salary: '₹15-22 LPA', xpRequired: 1800, skills: ['React Native', 'JavaScript', 'Firebase'], posted: '4 days ago', applicants: 19, description: 'Build Zomato\'s mobile food delivery experience.' },
    { id: 7, title: 'DevOps Engineer', company: 'Google', companyId: 1, color: '#4285F4', initials: 'G', location: 'Hyderabad', type: 'Full-time', salary: '₹20-28 LPA', xpRequired: 2500, skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'], posted: '6 days ago', applicants: 15, description: 'Manage cloud infrastructure at scale.' },
    { id: 8, title: 'UI/UX Designer', company: 'Flipkart', companyId: 4, color: '#2874F0', initials: 'F', location: 'Bangalore', type: 'Full-time', salary: '₹14-20 LPA', xpRequired: 1600, skills: ['Figma', 'CSS', 'User Research'], posted: '2 days ago', applicants: 31, description: 'Design intuitive shopping experiences.' },
    { id: 9, title: 'Python Developer', company: 'Amazon', companyId: 3, color: '#FF9900', initials: 'A', location: 'Chennai', type: 'Full-time', salary: '₹16-24 LPA', xpRequired: 1800, skills: ['Python', 'Django', 'PostgreSQL'], posted: '3 days ago', applicants: 26, description: 'Build internal tools and automation.' },
    { id: 10, title: 'Cloud Engineer Intern', company: 'Microsoft', companyId: 2, color: '#00A4EF', initials: 'M', location: 'Remote', type: 'Internship', salary: '₹40K/month', xpRequired: 800, skills: ['Azure', 'Python', 'Linux'], posted: '1 day ago', applicants: 52, description: 'Learn and contribute to Azure cloud platform.' },
    { id: 11, title: 'Frontend Intern', company: 'Razorpay', companyId: 5, color: '#3395FF', initials: 'R', location: 'Bangalore', type: 'Internship', salary: '₹35K/month', xpRequired: 600, skills: ['React', 'CSS', 'JavaScript'], posted: '2 days ago', applicants: 38, description: 'Build payment dashboard interfaces.' },
    { id: 12, title: 'SDE-1', company: 'Google', companyId: 1, color: '#4285F4', initials: 'G', location: 'Bangalore', type: 'Full-time', salary: '₹25-35 LPA', xpRequired: 3000, skills: ['C++', 'Algorithms', 'System Design'], posted: '1 day ago', applicants: 89, description: 'Solve complex engineering problems at scale.' },
  ],

  // ---- Challenges ----
  challenges: [
    { id: 1, title: 'Two Sum Problem', category: 'Coding', difficulty: 'Easy', xp: 50, description: 'Find two numbers that add up to a target.', time: '20 min', completed: false },
    { id: 2, title: 'Build a REST API', category: 'Coding', difficulty: 'Medium', xp: 120, description: 'Create a CRUD API with Node.js and Express.', time: '45 min', completed: true },
    { id: 3, title: 'Dashboard UI Design', category: 'Design', difficulty: 'Medium', xp: 100, description: 'Design a SaaS analytics dashboard in Figma.', time: '60 min', completed: false },
    { id: 4, title: 'SQL Query Challenge', category: 'Data', difficulty: 'Easy', xp: 40, description: 'Write complex SQL queries for data analysis.', time: '15 min', completed: true },
    { id: 5, title: 'Binary Search Tree', category: 'Coding', difficulty: 'Hard', xp: 200, description: 'Implement BST with insert, delete, and search.', time: '30 min', completed: false },
    { id: 6, title: 'Public Speaking Task', category: 'Communication', difficulty: 'Easy', xp: 60, description: 'Record a 2-minute pitch about your project.', time: '10 min', completed: false },
    { id: 7, title: 'React Todo App', category: 'Coding', difficulty: 'Easy', xp: 80, description: 'Build a functional todo app with React hooks.', time: '30 min', completed: true },
    { id: 8, title: 'Data Visualization', category: 'Data', difficulty: 'Medium', xp: 110, description: 'Create interactive charts with D3.js.', time: '40 min', completed: false },
    { id: 9, title: 'System Design: URL Shortener', category: 'Coding', difficulty: 'Hard', xp: 250, description: 'Design a scalable URL shortening service.', time: '60 min', completed: false },
    { id: 10, title: 'Landing Page Build', category: 'Design', difficulty: 'Easy', xp: 70, description: 'Build a responsive landing page from a mockup.', time: '45 min', completed: false },
  ],

  // ---- College Analytics ----
  collegeData: {
    name: 'IIT Delhi',
    totalStudents: 450,
    placedStudents: 387,
    placementRate: 86,
    avgPackage: '₹18.5 LPA',
    highestPackage: '₹65 LPA',
    departments: [
      { name: 'Computer Science', students: 120, placed: 115, avgXP: 2800, avgPackage: 24.5 },
      { name: 'Electronics', students: 90, placed: 78, avgXP: 2100, avgPackage: 16.2 },
      { name: 'Mechanical', students: 85, placed: 68, avgXP: 1800, avgPackage: 12.8 },
      { name: 'Civil', students: 70, placed: 55, avgXP: 1600, avgPackage: 10.5 },
      { name: 'Chemical', students: 45, placed: 38, avgXP: 1700, avgPackage: 11.2 },
      { name: 'Electrical', students: 40, placed: 33, avgXP: 1950, avgPackage: 14.0 },
    ],
    monthlyPlacements: [12, 18, 24, 35, 45, 58, 72, 85, 95, 102, 108, 115],
    skillGaps: [
      { skill: 'Cloud Computing', current: 35, required: 75 },
      { skill: 'Machine Learning', current: 45, required: 80 },
      { skill: 'DevOps', current: 25, required: 65 },
      { skill: 'Data Structures', current: 72, required: 85 },
      { skill: 'Communication', current: 40, required: 70 },
      { skill: 'System Design', current: 30, required: 70 },
    ],
    topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Flipkart', 'Razorpay'],
  },

  // ---- Community Posts ----
  posts: [
    { id: 1, author: 'Priya Sharma', initials: 'PS', avatar: '#7C3AED', title: 'ML Engineer at IIT Bombay', content: 'Just cracked my Google interview! 🎉 Big thanks to the JOB READY practice arena — the mock interviews were incredibly helpful. Here are my top 3 tips for anyone preparing...', likes: 124, comments: 23, time: '2 hours ago', tags: ['Interview Tips', 'Google'] },
    { id: 2, author: 'Rahul Kumar', initials: 'RK', avatar: '#2563EB', title: 'Backend Dev at BITS Pilani', content: 'Has anyone used Kubernetes in production? Looking for best practices on container orchestration for microservices. Currently working on a project that needs to scale to 10K requests/sec.', likes: 45, comments: 18, time: '5 hours ago', tags: ['DevOps', 'Kubernetes'] },
    { id: 3, author: 'Sneha Patel', initials: 'SP', avatar: '#EC4899', title: 'Frontend Dev at NIT Trichy', content: 'Just published my portfolio website built with React and Three.js! 🚀 Includes all my verified projects and XP badges. Would love feedback from the community.', likes: 89, comments: 12, time: '1 day ago', tags: ['Portfolio', 'React'] },
    { id: 4, author: 'Vikram Singh', initials: 'VS', avatar: '#10B981', title: 'Data Analyst at IIIT Hyderabad', content: 'Pro tip: The SQL challenge series on Practice Arena boosted my query skills dramatically. Went from Level 3 to Level 8 in just two weeks. Highly recommend starting with the intermediate challenges.', likes: 67, comments: 8, time: '2 days ago', tags: ['SQL', 'Tips'] },
  ],

  // ---- Methods ----

  // Calculate AI match score between student and job
  calculateMatchScore(student, job) {
    const studentSkills = student.skills || [];
    const jobSkills = job.skills || [];

    // Skill match (40%)
    const matchedSkills = jobSkills.filter(s => studentSkills.includes(s));
    const skillScore = jobSkills.length > 0 ? (matchedSkills.length / jobSkills.length) * 100 : 0;

    // XP match (30%)
    const xpScore = Math.min((student.xp / job.xpRequired) * 100, 100);

    // Level bonus (20%)
    const levelScore = Math.min((student.level / 15) * 100, 100);

    // Randomized "culture fit" (10%)
    const cultureScore = 60 + Math.random() * 40;

    const total = Math.round(skillScore * 0.4 + xpScore * 0.3 + levelScore * 0.2 + cultureScore * 0.1);
    return Math.min(total, 99);
  },

  // Earn XP
  earnXP(amount) {
    this.currentStudent.xp += amount;
    if (this.currentStudent.xp >= this.currentStudent.xpForLevel) {
      this.currentStudent.level += 1;
      this.currentStudent.xp = this.currentStudent.xp - this.currentStudent.xpForLevel;
      this.currentStudent.xpForLevel = Math.round(this.currentStudent.xpForLevel * 1.15);
    }
    this.currentStudent.xpToNext = this.currentStudent.xpForLevel - this.currentStudent.xp;
    // Update leaderboard
    const s = this.students.find(s => s.id === this.currentStudent.id);
    if (s) { s.xp = this.currentStudent.xp; s.level = this.currentStudent.level; }
  },

  // Complete challenge
  completeChallenge(challengeId) {
    const challenge = this.challenges.find(c => c.id === challengeId);
    if (challenge && !challenge.completed) {
      challenge.completed = true;
      this.earnXP(challenge.xp);
      this.currentStudent.completedChallenges += 1;
      return challenge;
    }
    return null;
  },

  // Get sorted leaderboard
  getLeaderboard() {
    return [...this.students].sort((a, b) => b.xp - a.xp);
  },

  // Shortlist candidates
  shortlistedCandidates: [1, 2],

  toggleShortlist(studentId) {
    const idx = this.shortlistedCandidates.indexOf(studentId);
    if (idx > -1) {
      this.shortlistedCandidates.splice(idx, 1);
      return false;
    } else {
      this.shortlistedCandidates.push(studentId);
      return true;
    }
  },

  isShortlisted(studentId) {
    return this.shortlistedCandidates.includes(studentId);
  }
};
