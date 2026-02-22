// AI Mentorship System for ReLaunch
// Modular, clean, and feminine-themed

const MentorshipSystem = {
  // User mentorship data
  userData: {
    prevRole: '',
    breakDuration: '',
    targetRole: '',
    skills: [],
    confidenceLevel: 0,
    mentorType: '',
    currentWeek: 1,
    completedTasks: [],
    careerReadiness: 0,
    confidenceIndex: 0,
    dailyTask: null,
    lastTaskDate: null
  },

  // Mentor types with characteristics
  mentorTypes: {
    'Confidence Rebuilder': {
      icon: '💪',
      focus: 'Building self-belief and overcoming imposter syndrome',
      greeting: 'I\'m here to help you rediscover your strength! 💕'
    },
    'Skill Strategist': {
      icon: '🎯',
      focus: 'Identifying skill gaps and creating learning paths',
      greeting: 'Let\'s map out your skill journey together! ✨'
    },
    'Career Transition Coach': {
      icon: '🚀',
      focus: 'Navigating career pivots and new opportunities',
      greeting: 'Ready to launch into your new career? Let\'s go! 🌸'
    },
    'Leadership Comeback Mentor': {
      icon: '👑',
      focus: 'Reclaiming leadership roles with confidence',
      greeting: 'Your leadership journey continues here! 💖'
    }
  },

  // 6-Week Journey Structure
  weeklyProgram: {
    1: {
      title: 'Career Identity Rebuild',
      tasks: [
        'Write your career story: What makes you unique?',
        'List 5 strengths you gained during your break',
        'Define your ideal work environment',
        'Complete: Who am I now? reflection exercise'
      ],
      unlocked: true
    },
    2: {
      title: 'Resume Reframing',
      tasks: [
        'Reframe your career break positively',
        'Update your LinkedIn headline',
        'Write 3 achievement statements',
        'Get AI feedback on your resume summary'
      ],
      unlocked: false
    },
    3: {
      title: 'Skill Refresh Roadmap',
      tasks: [
        'Identify 3 must-have skills for target role',
        'Find 2 free courses to upskill',
        'Complete one micro-learning module',
        'Practice new skill for 30 minutes'
      ],
      unlocked: false
    },
    4: {
      title: 'Mock Interview Practice',
      tasks: [
        'Practice 5 behavioral questions',
        'Record yourself answering one question',
        'Prepare your "Tell me about yourself" pitch',
        'Get AI feedback on interview answers'
      ],
      unlocked: false
    },
    5: {
      title: 'Job Application Strategy',
      tasks: [
        'Research 5 returnship-friendly companies',
        'Customize resume for target role',
        'Write a compelling cover letter',
        'Apply to 2 positions'
      ],
      unlocked: false
    },
    6: {
      title: 'Confidence + Negotiation',
      tasks: [
        'Research salary ranges for your role',
        'Practice salary negotiation phrases',
        'Prepare your value proposition',
        'Celebrate your comeback journey! 🎉'
      ],
      unlocked: false
    }
  },

  // Daily micro-actions pool
  dailyActions: [
    'Update one line on your LinkedIn profile',
    'Read one article about your target industry',
    'Connect with one professional in your field',
    'Practice your elevator pitch for 5 minutes',
    'Review and improve one resume bullet point',
    'Watch a 10-minute skill tutorial',
    'Write down 3 things you\'re proud of today',
    'Research one company you\'d love to work for',
    'Practice answering "Why should we hire you?"',
    'Send a thank you message to someone who helped you'
  ],

  // Initialize mentorship
  init() {
    const saved = localStorage.getItem('mentorship_data');
    if (saved) {
      this.userData = JSON.parse(saved);
    }
  },

  // Save progress
  save() {
    localStorage.setItem('mentorship_data', JSON.stringify(this.userData));
  },

  // Assess user and assign mentor
  assessAndAssignMentor(prevRole, breakDuration, targetRole, confidenceAnswer) {
    this.userData.prevRole = prevRole;
    this.userData.breakDuration = breakDuration;
    this.userData.targetRole = targetRole;

    // Assess confidence level (1-10)
    const confidenceScore = this.assessConfidence(confidenceAnswer);
    this.userData.confidenceLevel = confidenceScore;

    // Assign mentor type based on profile
    if (confidenceScore <= 4) {
      this.userData.mentorType = 'Confidence Rebuilder';
    } else if (prevRole !== targetRole) {
      this.userData.mentorType = 'Career Transition Coach';
    } else if (prevRole.toLowerCase().includes('lead') || prevRole.toLowerCase().includes('manager')) {
      this.userData.mentorType = 'Leadership Comeback Mentor';
    } else {
      this.userData.mentorType = 'Skill Strategist';
    }

    // Initialize scores
    this.userData.careerReadiness = 15;
    this.userData.confidenceIndex = confidenceScore * 10;

    this.save();
    return this.userData.mentorType;
  },

  // Assess confidence from answer
  assessConfidence(answer) {
    const lowerAnswer = answer.toLowerCase();
    const positiveWords = ['confident', 'ready', 'excited', 'prepared', 'strong'];
    const negativeWords = ['nervous', 'worried', 'unsure', 'scared', 'doubt'];
    
    let score = 5; // baseline
    positiveWords.forEach(word => {
      if (lowerAnswer.includes(word)) score += 1;
    });
    negativeWords.forEach(word => {
      if (lowerAnswer.includes(word)) score -= 1;
    });
    
    return Math.max(1, Math.min(10, score));
  },

  // Complete a task
  completeTask(week, taskIndex) {
    const taskId = `w${week}_t${taskIndex}`;
    if (!this.userData.completedTasks.includes(taskId)) {
      this.userData.completedTasks.push(taskId);
      
      // Update scores
      this.userData.careerReadiness += 3;
      this.userData.confidenceIndex += 2;
      
      // Check if week is complete
      const weekTasks = this.weeklyProgram[week].tasks.length;
      const completedInWeek = this.userData.completedTasks.filter(t => t.startsWith(`w${week}_`)).length;
      
      if (completedInWeek === weekTasks && week < 6) {
        this.weeklyProgram[week + 1].unlocked = true;
        this.userData.currentWeek = week + 1;
      }
      
      this.save();
    }
  },

  // Get daily task
  getDailyTask() {
    const today = new Date().toDateString();
    
    if (this.userData.lastTaskDate !== today) {
      const randomIndex = Math.floor(Math.random() * this.dailyActions.length);
      this.userData.dailyTask = this.dailyActions[randomIndex];
      this.userData.lastTaskDate = today;
      this.save();
    }
    
    return this.userData.dailyTask;
  },

  // Complete daily task
  completeDailyTask() {
    this.userData.careerReadiness += 1;
    this.userData.confidenceIndex += 1;
    this.userData.dailyTask = null;
    this.userData.lastTaskDate = null;
    this.save();
  },

  // Get progress summary
  getProgress() {
    const totalTasks = Object.values(this.weeklyProgram).reduce((sum, week) => sum + week.tasks.length, 0);
    const completed = this.userData.completedTasks.length;
    const progressPercent = Math.round((completed / totalTasks) * 100);
    
    return {
      currentWeek: this.userData.currentWeek,
      completedTasks: completed,
      totalTasks: totalTasks,
      progressPercent: progressPercent,
      careerReadiness: Math.min(100, this.userData.careerReadiness),
      confidenceIndex: Math.min(100, this.userData.confidenceIndex)
    };
  }
};

// Export for use
window.MentorshipSystem = MentorshipSystem;
