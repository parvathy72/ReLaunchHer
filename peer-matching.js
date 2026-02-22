// Smart Peer Matching System for ReLaunchHer

const PeerMatchingSystem = {
  groups: [],
  weeklyPrompts: [
    "What small win did you achieve this week?",
    "What's one fear holding you back?",
    "What action will you take next week?",
    "Share a moment when you felt confident this week",
    "What skill are you most excited to rebuild?",
    "How are you practicing self-compassion during this journey?"
  ],

  init() {
    const stored = localStorage.getItem('peer_groups');
    if (stored) {
      this.groups = JSON.parse(stored);
    } else {
      this.groups = this.createSampleGroups();
      this.save();
    }
  },

  createSampleGroups() {
    return [
      {
        id: 'group_tech_1',
        name: 'Women Returning to Tech after 3-5 years',
        breakDuration: '3-5 years',
        industry: 'Tech',
        targetRole: 'Software Engineer',
        confidenceStage: 'medium',
        members: ['user_sample1', 'user_sample2', 'user_sample3'],
        memberNames: ['Priya', 'Anjali', 'Meera'],
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        sharedGoal: 'Support each other in returning to Tech roles',
        currentWeek: 2,
        posts: [
          {
            id: 'post_1',
            content: 'Just completed my first coding challenge in 4 years! Feeling nervous but proud.',
            userName: 'Priya',
            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            week: 2
          },
          {
            id: 'post_2',
            content: 'Started learning React. The ecosystem has changed so much! Anyone else feeling overwhelmed?',
            userName: 'Anjali',
            timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            week: 2
          }
        ],
        weeklyPrompt: this.weeklyPrompts[1]
      },
      {
        id: 'group_marketing_1',
        name: 'Women Returning to Marketing after 1-2 years',
        breakDuration: '1-2 years',
        industry: 'Marketing',
        targetRole: 'Marketing Manager',
        confidenceStage: 'high',
        members: ['user_sample4', 'user_sample5'],
        memberNames: ['Kavya', 'Riya'],
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        sharedGoal: 'Support each other in returning to Marketing roles',
        currentWeek: 1,
        posts: [
          {
            id: 'post_3',
            content: 'Updated my LinkedIn after 18 months. Got 3 connection requests already!',
            userName: 'Kavya',
            timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            week: 1
          }
        ],
        weeklyPrompt: this.weeklyPrompts[0]
      },
      {
        id: 'group_healthcare_1',
        name: 'Women Returning to Healthcare after 3-5 years',
        breakDuration: '3-5 years',
        industry: 'Healthcare',
        targetRole: 'Nurse',
        confidenceStage: 'medium',
        members: ['user_sample10', 'user_sample11'],
        memberNames: ['Lakshmi', 'Radha'],
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        sharedGoal: 'Support each other in returning to Healthcare roles',
        currentWeek: 1,
        posts: [
          {
            id: 'post_7',
            content: 'Completed my recertification course! Feeling ready to return to patient care.',
            userName: 'Lakshmi',
            timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            week: 1
          }
        ],
        weeklyPrompt: this.weeklyPrompts[0]
      },
      {
        id: 'group_tech_2',
        name: 'Women Returning to Tech after 1-2 years',
        breakDuration: '1-2 years',
        industry: 'Tech',
        targetRole: 'Product Manager',
        confidenceStage: 'medium',
        members: ['user_sample12'],
        memberNames: ['Aisha'],
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        sharedGoal: 'Support each other in returning to Tech roles',
        currentWeek: 1,
        posts: [],
        weeklyPrompt: this.weeklyPrompts[0]
      },
      {
        id: 'group_finance_2',
        name: 'Women Returning to Finance after 3-5 years',
        breakDuration: '3-5 years',
        industry: 'Finance',
        targetRole: 'Financial Analyst',
        confidenceStage: 'medium',
        members: ['user_sample13', 'user_sample14', 'user_sample15'],
        memberNames: ['Neha', 'Simran', 'Tanvi'],
        createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
        sharedGoal: 'Support each other in returning to Finance roles',
        currentWeek: 2,
        posts: [
          {
            id: 'post_8',
            content: 'Passed my CFA Level 1 exam! Taking it one step at a time.',
            userName: 'Neha',
            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            week: 2
          },
          {
            id: 'post_9',
            content: 'Networking with former colleagues has been so helpful. Don\'t be afraid to reach out!',
            userName: 'Simran',
            timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            week: 2
          }
        ],
        weeklyPrompt: this.weeklyPrompts[1]
      },
      {
        id: 'group_education_1',
        name: 'Women Returning to Education after 5+ years',
        breakDuration: '5+ years',
        industry: 'Education',
        targetRole: 'Teacher',
        confidenceStage: 'low',
        members: ['user_sample16', 'user_sample17'],
        memberNames: ['Priyanka', 'Swati'],
        createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
        sharedGoal: 'Support each other in returning to Education roles',
        currentWeek: 1,
        posts: [
          {
            id: 'post_10',
            content: 'Volunteering at my daughter\'s school to get back into the classroom environment.',
            userName: 'Priyanka',
            timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            week: 1
          }
        ],
        weeklyPrompt: this.weeklyPrompts[0]
      },
      {
        id: 'group_creative_1',
        name: 'Women Returning to Creative after 1-2 years',
        breakDuration: '1-2 years',
        industry: 'Creative',
        targetRole: 'Graphic Designer',
        confidenceStage: 'high',
        members: ['user_sample18', 'user_sample19', 'user_sample20'],
        memberNames: ['Isha', 'Maya', 'Zara'],
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        sharedGoal: 'Support each other in returning to Creative roles',
        currentWeek: 1,
        posts: [
          {
            id: 'post_11',
            content: 'Updated my portfolio with personal projects I did during my break. Feeling confident!',
            userName: 'Isha',
            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            week: 1
          },
          {
            id: 'post_12',
            content: 'Learning Figma and loving it! The design tools have evolved so much.',
            userName: 'Maya',
            timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            week: 1
          }
        ],
        weeklyPrompt: this.weeklyPrompts[0]
      },
      {
        id: 'group_healthcare_2',
        name: 'Women Returning to Healthcare after 1-2 years',
        breakDuration: '1-2 years',
        industry: 'Healthcare',
        targetRole: 'Doctor',
        confidenceStage: 'medium',
        members: ['user_sample21'],
        memberNames: ['Kavita'],
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        sharedGoal: 'Support each other in returning to Healthcare roles',
        currentWeek: 1,
        posts: [],
        weeklyPrompt: this.weeklyPrompts[0]
      },
      {
        id: 'group_product_1',
        name: 'Women Returning to Tech after 5+ years',
        breakDuration: '5+ years',
        industry: 'Tech',
        targetRole: 'Product Manager',
        confidenceStage: 'low',
        members: ['user_sample6', 'user_sample7', 'user_sample8', 'user_sample9'],
        memberNames: ['Sneha', 'Divya', 'Pooja', 'Nisha'],
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        sharedGoal: 'Support each other in returning to Tech roles',
        currentWeek: 3,
        posts: [
          {
            id: 'post_4',
            content: 'Attended my first product meetup yesterday. Everyone was so welcoming!',
            userName: 'Sneha',
            timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            week: 3
          },
          {
            id: 'post_5',
            content: 'Working on a case study for my portfolio. Would love feedback from the group!',
            userName: 'Divya',
            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            week: 3
          },
          {
            id: 'post_6',
            content: 'Had my first informational interview today. The imposter syndrome is real but I did it!',
            userName: 'Pooja',
            timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            week: 3
          }
        ],
        weeklyPrompt: this.weeklyPrompts[2]
      }
    ];
  },

  save() {
    localStorage.setItem('peer_groups', JSON.stringify(this.groups));
  },

  getUserProfile() {
    return {
      userId: localStorage.getItem('relaunchher_uid') || 'user_' + Date.now(),
      name: localStorage.getItem('relaunchher_user') || 'Anonymous',
      breakDuration: localStorage.getItem('user_breakDuration') || '',
      targetRole: localStorage.getItem('user_targetRole') || '',
      industry: localStorage.getItem('user_industry') || '',
      confidenceLevel: localStorage.getItem('user_confidenceLevel') || 'medium'
    };
  },

  normalizeBreakDuration(duration) {
    if (!duration) return 'unknown';
    if (duration.includes('1-2')) return '1-2 years';
    if (duration.includes('3-5')) return '3-5 years';
    if (duration.includes('6+') || duration.includes('5+')) return '5+ years';
    return duration;
  },

  generateGroupName(breakDuration, industry, targetRole) {
    const breakLabel = this.normalizeBreakDuration(breakDuration);
    return `Women Returning to ${industry || 'Career'} after ${breakLabel}`;
  },

  findMatchingGroup(userProfile) {
    const normalizedBreak = this.normalizeBreakDuration(userProfile.breakDuration);
    
    for (let group of this.groups) {
      if (group.members.length >= 6) continue;
      if (group.members.includes(userProfile.userId)) continue;
      
      const breakMatch = group.breakDuration === normalizedBreak;
      const industryMatch = group.industry.toLowerCase() === (userProfile.industry || '').toLowerCase();
      const roleMatch = group.targetRole.toLowerCase().includes((userProfile.targetRole || '').toLowerCase()) || 
                        (userProfile.targetRole || '').toLowerCase().includes(group.targetRole.toLowerCase());
      
      // Perfect match requires: Break Duration + Industry match (minimum)
      if (breakMatch && industryMatch) {
        return group;
      }
    }
    
    return null;
  },

  createNewGroup(userProfile) {
    const normalizedBreak = this.normalizeBreakDuration(userProfile.breakDuration);
    const groupId = 'group_' + Date.now();
    
    const newGroup = {
      id: groupId,
      name: this.generateGroupName(normalizedBreak, userProfile.industry, userProfile.targetRole),
      breakDuration: normalizedBreak,
      industry: userProfile.industry || 'General',
      targetRole: userProfile.targetRole || 'Various Roles',
      confidenceStage: userProfile.confidenceLevel,
      members: [userProfile.userId],
      memberNames: [userProfile.name],
      createdAt: new Date().toISOString(),
      sharedGoal: `Support each other in returning to ${userProfile.industry || 'career'} roles`,
      currentWeek: 1,
      posts: [],
      weeklyPrompt: this.weeklyPrompts[0]
    };
    
    this.groups.push(newGroup);
    this.save();
    return newGroup;
  },

  joinGroup(groupId, userProfile) {
    const group = this.groups.find(g => g.id === groupId);
    if (!group) return false;
    
    if (group.members.length >= 6) return false;
    if (group.members.includes(userProfile.userId)) return true;
    
    group.members.push(userProfile.userId);
    group.memberNames.push(userProfile.name);
    this.save();
    return true;
  },

  getUserGroup(userId) {
    return this.groups.find(g => g.members.includes(userId));
  },

  addPostToGroup(groupId, content, userName) {
    const group = this.groups.find(g => g.id === groupId);
    if (!group) return false;
    
    group.posts.push({
      id: 'post_' + Date.now(),
      content: content,
      userName: userName,
      timestamp: new Date().toISOString(),
      week: group.currentWeek
    });
    
    this.save();
    return true;
  },

  advanceWeek(groupId) {
    const group = this.groups.find(g => g.id === groupId);
    if (!group) return;
    
    group.currentWeek = (group.currentWeek % 6) + 1;
    group.weeklyPrompt = this.weeklyPrompts[group.currentWeek - 1];
    this.save();
  },

  getAISummary(groupId) {
    const group = this.groups.find(g => g.id === groupId);
    if (!group || group.posts.length === 0) {
      return "No activity yet. Start sharing to build momentum!";
    }
    
    const recentPosts = group.posts.slice(-5);
    const themes = ['confidence building', 'skill development', 'networking', 'work-life balance'];
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    
    return `This week, your group focused on ${randomTheme}. Common challenge: balancing preparation with self-care. Group action: Each member commits to one small step this week. You're making progress together! 💕`;
  },

  getAllGroups() {
    return this.groups.map(g => ({
      ...g,
      memberCount: g.members.length,
      hasSpace: g.members.length < 6
    }));
  }
};

window.PeerMatchingSystem = PeerMatchingSystem;
