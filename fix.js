let currentUser = null;

async function handleSignup() {
  const pass = document.getElementById('signupPass').value;
  const confirm = document.getElementById('confirmPass').value;
  const declare = document.getElementById('selfDeclare').checked;
  
  if (pass !== confirm) {
    document.getElementById('passMatchError').innerText = '🌸 passwords need to match, lovely';
    return;
  } else { 
    document.getElementById('passMatchError').innerText = ''; 
  }
  
  if (!declare) { 
    alert('please tick the box — this is a women-first space 💗'); 
    return; 
  }

  const data = {
    email: document.getElementById('signupEmail').value,
    password: pass,
    fullName: document.getElementById('fullName').value,
    industry: document.getElementById('industry').value,
    prevRole: document.getElementById('prevRole').value,
    breakDuration: document.getElementById('breakDuration').value,
    targetRole: document.getElementById('targetRole').value,
    workPref: document.getElementById('workPref').value
  };

  try {
    const result = await api.signup(data);
    if (result.success) {
      currentUser = { uid: result.uid, ...data };
      localStorage.setItem('relaunchher_uid', result.uid);
      localStorage.setItem('relaunchher_user', data.fullName);
      showDashboard();
    } else {
      alert('Error: ' + result.error);
    }
  } catch (error) {
    alert('Signup failed: ' + error.message);
  }
}

async function handleLogin() {
  const email = document.getElementById('loginEmail').value;
  const pass = document.getElementById('loginPassword').value;
  
  if (!email || !pass) {
    if (!email) document.getElementById('loginEmailError').innerText = 'email please 💌';
    if (!pass) document.getElementById('loginPassError').innerText = 'password needed 🔐';
    return;
  }

  try {
    const result = await api.login(email, pass);
    if (result.success) {
      currentUser = result.user;
      localStorage.setItem('relaunchher_uid', result.uid);
      localStorage.setItem('relaunchher_user', result.user.fullName);
      showDashboard();
    } else {
      alert('Login failed: ' + result.error);
    }
  } catch (error) {
    alert('Login failed: ' + error.message);
  }
}

async function showDashboardMain() {
  const userName = localStorage.getItem('relaunchher_user') || 'Sneha';
  const uid = localStorage.getItem('relaunchher_uid');
  
  let readiness = 0, confidence = 0;
  if (uid) {
    try {
      const progress = await api.getProgress(uid);
      readiness = progress.readinessScore || 0;
      confidence = progress.confidenceScore || 0;
    } catch (error) {
      console.error('Failed to load progress:', error);
    }
  }

  const html = `
    <div class="welcome-header">
      <div class="user-greeting"><i class="fas fa-heart" style="color:#f28bb3;"></i> Welcome back, <span>${userName}</span></div>
      <p style="color:#af5286; font-size:1.4rem; margin-top:0.6rem;">you're glowing — let's rise together ✨</p>
    </div>
    <div class="progress-row">
      <div class="progress-card"><div class="circle-progress" style="background: conic-gradient(#f28bb3 0deg ${readiness * 3.6}deg, #ffd6e8 ${readiness * 3.6}deg 360deg);">${readiness}%</div><div><strong style="font-size:1.4rem;">readiness</strong><br> keep going!</div></div>
      <div class="progress-card"><div class="circle-progress" style="background: conic-gradient(#f4a2c6 0deg ${confidence * 3.6}deg, #ffd6e8 ${confidence * 3.6}deg 360deg);">${confidence}%</div><div><strong style="font-size:1.4rem;">confidence</strong><br> you're growing!</div></div>
    </div>
    <h2 style="color:#791e54;"><i class="fas fa-sparkle" style="color:#f28bb3;"></i> your comeback toolkit</h2>
    <div class="feature-grid">
      <div class="feature-card" onclick="showFeature('resumeGap')"><i class="fas fa-wand-magic"></i><h3>AI Resume Gap</h3><p>reframe with power</p></div>
      <div class="feature-card" onclick="showFeature('roadmap')"><i class="fas fa-map"></i><h3>Career Roadmap</h3><p>skills & certs</p></div>
      <div class="feature-card" onclick="showFeature('interview')"><i class="fas fa-microphone"></i><h3>Interview Practice</h3><p>simulate & shine</p></div>
      <div class="feature-card" onclick="showFeature('jobs')"><i class="fas fa-briefcase"></i><h3>Job Discovery</h3><p>returnship roles</p></div>
      <div class="feature-card" onclick="showFeature('mentorship')"><i class="fas fa-hand-holding-heart"></i><h3>Mentorship</h3><p>leaders who care</p></div>
      <div class="feature-card" onclick="showFeature('peer')"><i class="fas fa-comment-dots"></i><h3>Peer Support</h3><p>you're not alone</p></div>
    </div>
  `;
  document.getElementById('mainContentArea').innerHTML = html;
}

async function showFeature(feature) {
  let content = '';
  
  if (feature === 'resumeGap') {
    content = `<div class="feature-page"><h2>✨ AI transformation room</h2>
      <div class="form-group"><label>Previous role</label><input id="prevRoleGap" placeholder="Product Manager"></div>
      <div class="form-group"><label>Break duration</label><input id="breakGap" placeholder="2.5 years"></div>
      <div class="form-group"><label>Reason</label><input id="reasonGap" placeholder="family focus"></div>
      <button class="btn-primary" onclick="generateGapReframe()">reframe with AI ✨</button>
      <p id="gapOutput" style="background:#ffeaf5; padding:1.8rem; border-radius:40px; margin-top:1.5rem; min-height:60px;"></p>
      <button class="btn-primary" style="width:auto; display:none;" id="copyGapBtn" onclick="copyGap()"><i class="fas fa-copy"></i> copy</button>
      <p style="margin-top:1rem;">💗 Your journey is your strength.</p></div>`;
  } 
  else if (feature === 'roadmap') {
    content = `<div class="feature-page"><h2>🌸 guided comeback journey</h2>
      <div class="form-group"><label>Current Role</label><input id="currentRoleRoadmap" placeholder="Marketing Manager"></div>
      <div class="form-group"><label>Target Role</label><input id="targetRoleRoadmap" placeholder="Product Manager"></div>
      <div class="form-group"><label>Industry</label><input id="industryRoadmap" placeholder="Tech"></div>
      <button class="btn-primary" onclick="generateRoadmap()">Generate Roadmap 🗺️</button>
      <div id="roadmapOutput" style="background:#ffeaf5; padding:1.8rem; border-radius:40px; margin-top:1.5rem; min-height:60px;"></div></div>`;
  } 
  else if (feature === 'interview') {
    content = `<div class="feature-page"><h2>🎤 friendly interview practice</h2><div class="form-group"><label>Role</label><select id="interviewRole" onchange="generateQuestion()"><option>Product Manager</option><option>UX designer</option><option>Software Engineer</option><option>Marketing Manager</option></select></div><p id="interviewQ"><strong>🌸 Question:</strong> Loading...</p><textarea id="interviewAnswer" rows="4" placeholder="your answer..."></textarea><div style="display:flex; gap:1rem; margin:1rem 0;"><button class="btn-primary" style="width:auto; flex:1;" onclick="getInterviewFeedback()">Get AI Feedback 🤖</button><button class="btn-primary" style="width:auto; flex:1;" onclick="generateQuestion()">Next Question ➡️</button><button class="btn-primary" style="width:auto; flex:1; background:linear-gradient(115deg, #d4a5f9, #b47ad0);" onclick="resetInterview()">Restart 🔄</button></div><div id="feedbackOutput" style="background:#ffe4f3; padding:1.4rem; border-radius:40px; margin-top:1rem; min-height:60px; display:none;"></div><div style="background:#ffe4f3; padding:1.4rem; border-radius:40px; margin-top:1rem;"><p>💗 <strong>Tips:</strong> Use the STAR method (Situation, Task, Action, Result)</p><p>✨ Focus on your growth and learnings</p><p>🌸 Your career break is a strength, not a gap</p></div></div>`;
    setTimeout(() => generateQuestion(), 100);
  } 
  else if (feature === 'jobs') {
    content = `<div class="feature-page"><h2>💼 job discovery</h2>
      <div class="job-filters">
        <select id="jobMode" onchange="loadJobs()"><option value="">all modes</option><option value="remote">remote 💻</option><option value="hybrid">hybrid 🌸</option><option value="onsite">on-site</option></select>
        <select id="jobType" onchange="loadJobs()"><option value="">all types</option><option value="returnship">returnship 💖</option></select>
      </div>
      <div id="jobsList"></div></div>`;
    setTimeout(loadJobs, 100);
  } 
  else if (feature === 'mentorship') {
    MentorshipSystem.init();
    if (MentorshipSystem.userData.mentorType) {
      showMentorshipDashboard();
      return;
    }
    content = `<div class="feature-page">
      <h2>🌸 AI-Powered Mentorship Journey</h2>
      <p style="font-size:1.2rem; color:#902e68; margin-bottom:2rem;">Get a personalized 6-week mentorship program with daily micro-actions tailored to your comeback journey.</p>
      <div class="form-group"><label>Previous Role</label><input id="mentorPrevRole" placeholder="e.g. Marketing Manager"></div>
      <div class="form-group"><label>Career Break Duration</label><select id="mentorBreakDuration"><option>1-2 years</option><option>3-5 years</option><option>6+ years</option></select></div>
      <div class="form-group"><label>Target Role</label><input id="mentorTargetRole" placeholder="e.g. Product Manager"></div>
      <div class="form-group"><label>Current Confidence Level (1-10)</label><input type="number" id="mentorConfidence" min="1" max="10" placeholder="5"></div>
      <button class="btn-primary" onclick="startMentorship()">Start My Journey ✨</button>
      <div style="background:#ffe4f3; padding:1.5rem; border-radius:40px; margin-top:2rem;">
        <p><strong>💗 What You'll Get:</strong></p>
        <p>✨ AI mentor assigned based on your profile</p>
        <p>📅 6-week structured program with locked progression</p>
        <p>🎯 Daily 10-20 minute micro-actions</p>
        <p>📊 Real-time confidence & readiness tracking</p>
      </div>
    </div>`;
  } 
  else if (feature === 'peer') {
    if (typeof PeerMatchingSystem === 'undefined') {
      content = `<div class="feature-page"><h2>🌸 Peer Support</h2><p>Loading peer matching system...</p></div>`;
      document.getElementById('mainContentArea').innerHTML = content;
      return;
    }
    
    PeerMatchingSystem.init();
    const userProfile = PeerMatchingSystem.getUserProfile();
    
    // Check if already in a group
    const userGroup = PeerMatchingSystem.getUserGroup(userProfile.userId);
    if (userGroup) {
      showPeerGroupDashboard(userGroup, userProfile);
      return;
    }
    
    // Show profile form if not completed
    if (!userProfile.breakDuration || !userProfile.industry || !userProfile.targetRole) {
      content = `<div class="feature-page">
        <h2>🌸 Find Your Peer Group</h2>
        <p style="font-size:1.1rem; color:#902e68; margin-bottom:2rem;">Answer a few questions to get matched with women on similar comeback journeys!</p>
        <div class="form-group"><label>Career Break Duration</label><select id="peerBreakDuration"><option value="">Select...</option><option>1-2 years</option><option>3-5 years</option><option>6+ years</option></select></div>
        <div class="form-group"><label>Target Role</label><input id="peerTargetRole" placeholder="e.g. Product Manager"></div>
        <div class="form-group"><label>Industry</label><select id="peerIndustry"><option value="">Select...</option><option>Tech</option><option>Healthcare</option><option>Finance</option><option>Education</option><option>Marketing</option><option>Creative</option></select></div>
        <button class="btn-primary" onclick="savePeerProfile()">Find My Peer Group ✨</button>
      </div>`;
    } else {
      showPeerGroupBrowser(userProfile);
      return;
    }
  }
  else if (feature === 'assessment') {
    const uid = localStorage.getItem('relaunchher_uid');
    if (uid) {
      try {
        const progress = await api.getProgress(uid);
        const readiness = progress.readinessScore || 0;
        const confidence = progress.confidenceScore || 0;
        
        content = `<div class="feature-page"><h2>📊 readiness assessment</h2>
          <div class="circle-progress" style="margin:auto; width:140px; height:140px; background: conic-gradient(#f28bb3 0deg ${readiness * 3.6}deg, #ffd6e8 ${readiness * 3.6}deg 360deg);">${readiness}%</div>
          <p style="margin-top:2rem;"><strong>Your Progress</strong></p>
          <p>Readiness: ${readiness}% · Confidence: ${confidence}%</p>
          <p style="margin-top:1.5rem;">🌸 Keep using AI features to improve your scores!</p>
          <p style="background:#ffeaf5; padding:1rem; border-radius:20px; margin-top:1rem;">💡 Tip: Complete Resume Gap reframing (+10%) and Interview Practice (+15%) to boost your scores!</p>
          </div>`;
      } catch (error) {
        content = `<div class="feature-page"><h2>📊 readiness assessment</h2><p>Failed to load scores. Please try again.</p></div>`;
      }
    } else {
      content = `<div class="feature-page"><h2>📊 readiness assessment</h2><p>Please log in to see your scores.</p></div>`;
    }
  }
  
  document.getElementById('mainContentArea').innerHTML = content;
}

async function generateGapReframe() {
  const data = {
    prevRole: document.getElementById('prevRoleGap').value,
    breakDuration: document.getElementById('breakGap').value,
    reason: document.getElementById('reasonGap').value,
    uid: localStorage.getItem('relaunchher_uid')
  };
  
  if (!data.prevRole || !data.breakDuration || !data.reason) {
    alert('Please fill all fields');
    return;
  }

  document.getElementById('gapOutput').innerText = 'Generating with AI... ✨';
  
  try {
    const result = await api.generateResumeGap(data);
    if (result.success) {
      document.getElementById('gapOutput').innerText = result.reframedText;
      document.getElementById('copyGapBtn').style.display = 'inline-block';
      alert('✨ Readiness score increased! Check your dashboard.');
    } else {
      document.getElementById('gapOutput').innerText = 'Error: ' + result.error;
    }
  } catch (error) {
    document.getElementById('gapOutput').innerText = 'Failed to generate. Please try again.';
  }
}

async function generateRoadmap() {
  const data = {
    currentRole: document.getElementById('currentRoleRoadmap').value,
    targetRole: document.getElementById('targetRoleRoadmap').value,
    industry: document.getElementById('industryRoadmap').value
  };
  
  document.getElementById('roadmapOutput').innerText = 'Generating roadmap... 🗺️';
  
  try {
    const result = await api.getCareerRoadmap(data);
    if (result.success) {
      document.getElementById('roadmapOutput').innerHTML = result.roadmap.replace(/\n/g, '<br>');
    } else {
      document.getElementById('roadmapOutput').innerText = 'Error: ' + result.error;
    }
  } catch (error) {
    document.getElementById('roadmapOutput').innerText = 'Failed to generate roadmap.';
  }
}

async function getInterviewFeedback() {
  const roleSelect = document.getElementById('interviewRole');
  const questionElement = document.getElementById('interviewQ');
  const answerElement = document.getElementById('interviewAnswer');
  const feedbackElement = document.getElementById('feedbackOutput');
  
  if (!answerElement || !answerElement.value.trim()) {
    alert('Please provide your answer first');
    return;
  }
  
  const role = roleSelect ? roleSelect.value : 'Product Manager';
  const questionText = questionElement ? questionElement.textContent.replace(/.*Question:\s*/, '') : '';
  
  const data = {
    role: role,
    question: questionText,
    answer: answerElement.value,
    uid: localStorage.getItem('relaunchher_uid')
  };
  
  feedbackElement.style.display = 'block';
  feedbackElement.innerText = 'Analyzing your answer... 🤔';
  
  try {
    const result = await api.getInterviewFeedback(data);
    if (result.success) {
      feedbackElement.innerHTML = result.feedback.replace(/\n/g, '<br>');
      alert('✨ Confidence score increased! Check your dashboard.');
    } else {
      feedbackElement.innerText = 'Error: ' + result.error;
    }
  } catch (error) {
    feedbackElement.innerText = 'Failed to get feedback. Please try again.';
  }
}

async function loadJobs() {
  const mode = document.getElementById('jobMode')?.value;
  const type = document.getElementById('jobType')?.value;
  
  try {
    const result = await api.getJobs({ mode, type });
    const jobsList = document.getElementById('jobsList');
    
    if (result.success && result.jobs.length > 0) {
      jobsList.innerHTML = result.jobs.map(job => `
        <div class="job-card">
          <h3>✨ ${job.title}</h3>
          <p>${job.company} · ${job.mode} · ${job.tags?.map(t => `<span class="tag">${t}</span>`).join('') || ''}</p>
        </div>
      `).join('');
    } else {
      jobsList.innerHTML = '<p>No jobs found. Check back soon! 💕</p>';
    }
  } catch (error) {
    document.getElementById('jobsList').innerHTML = '<p>Failed to load jobs.</p>';
  }
}

async function loadMentors() {
  const industry = document.getElementById('mentorIndustry')?.value;
  
  try {
    const result = await api.getMentors(industry);
    const mentorsList = document.getElementById('mentorsList');
    
    if (result.success && result.mentors.length > 0) {
      mentorsList.innerHTML = result.mentors.map(mentor => `
        <div style="background:#ffe2fd; padding:1.2rem; border-radius:50px; margin-top:1rem;">
          🌸 ${mentor.name} · ${mentor.title} · ${mentor.sessions || 0} sessions available
        </div>
      `).join('');
    } else {
      mentorsList.innerHTML = '<p>No mentors found. 💕</p>';
    }
  } catch (error) {
    document.getElementById('mentorsList').innerHTML = '<p>Failed to load mentors.</p>';
  }
}

async function loadPosts() {
  try {
    const result = await api.getPosts();
    const postsList = document.getElementById('postsList');
    
    if (result.success && result.posts.length > 0) {
      postsList.innerHTML = result.posts.map(post => `
        <div class="post-card">
          🌿 anonymous: ${post.content}
          <button class="report-btn" onclick="reportPost('${post.id}')">report</button>
        </div>
      `).join('');
    } else {
      postsList.innerHTML = '<p>No posts yet. Be the first to share! 💕</p>';
    }
  } catch (error) {
    document.getElementById('postsList').innerHTML = '<p>Failed to load posts.</p>';
  }
}

async function createPost() {
  const content = document.getElementById('newPost').value;
  if (!content) return;
  
  const uid = localStorage.getItem('relaunchher_uid');
  
  try {
    const result = await api.createPost(content, uid);
    if (result.success) {
      document.getElementById('newPost').value = '';
      loadPosts();
    }
  } catch (error) {
    alert('Failed to create post');
  }
}

async function reportPost(postId) {
  const reason = prompt('Why are you reporting this post?');
  if (!reason) return;
  
  try {
    await api.reportPost(postId, reason);
    alert('Report submitted. Thank you for keeping our community safe 💕');
  } catch (error) {
    alert('Failed to submit report');
  }
}

function copyGap() {
  const text = document.getElementById('gapOutput').innerText;
  navigator.clipboard?.writeText(text);
  alert('✨ copied to clipboard!');
}

window.handleSignup = handleSignup;
window.handleLogin = handleLogin;
window.showDashboardMain = showDashboardMain;
window.showFeature = showFeature;
window.generateGapReframe = generateGapReframe;
window.generateRoadmap = generateRoadmap;
window.getInterviewFeedback = getInterviewFeedback;
window.loadJobs = loadJobs;
window.loadMentors = loadMentors;
window.loadPosts = loadPosts;
window.createPost = createPost;
window.reportPost = reportPost;
window.copyGap = copyGap;


// AI Mentorship Functions
function startMentorship() {
  const prevRole = document.getElementById('mentorPrevRole').value;
  const breakDuration = document.getElementById('mentorBreakDuration').value;
  const targetRole = document.getElementById('mentorTargetRole').value;
  const confidence = document.getElementById('mentorConfidence').value;
  
  if (!prevRole || !targetRole || !confidence) {
    alert('Please fill all fields');
    return;
  }
  
  MentorshipSystem.assessAndAssignMentor(prevRole, breakDuration, targetRole, confidence);
  showMentorshipDashboard();
}

function showMentorshipDashboard() {
  MentorshipSystem.init();
  const mentor = MentorshipSystem.mentorTypes[MentorshipSystem.userData.mentorType];
  const progress = MentorshipSystem.getProgress();
  const dailyTask = MentorshipSystem.getDailyTask();
  
  let content = `<div class="feature-page">
    <h2>🌸 Your AI Mentor: ${mentor.icon} ${MentorshipSystem.userData.mentorType}</h2>
    <p style="font-size:1.1rem; color:#902e68; margin-bottom:2rem;">${mentor.greeting}</p>
    <p style="color:#aa6191; margin-bottom:2rem;"><strong>Focus:</strong> ${mentor.focus}</p>
    
    <div style="display:flex; gap:2rem; margin-bottom:2rem; flex-wrap:wrap;">
      <div style="flex:1; min-width:200px; background:#ffe5f5; padding:1.5rem; border-radius:40px;">
        <div style="font-size:2.5rem; font-weight:700; color:#c45f9b;">${progress.careerReadiness}%</div>
        <div style="color:#902e68;">Career Readiness</div>
        <div style="background:#ffd6e8; height:8px; border-radius:10px; margin-top:0.5rem;">
          <div style="background:#f28bb3; height:100%; width:${progress.careerReadiness}%; border-radius:10px; transition:width 0.5s;"></div>
        </div>
      </div>
      <div style="flex:1; min-width:200px; background:#ffe5f5; padding:1.5rem; border-radius:40px;">
        <div style="font-size:2.5rem; font-weight:700; color:#c45f9b;">${progress.confidenceIndex}%</div>
        <div style="color:#902e68;">Confidence Index</div>
        <div style="background:#ffd6e8; height:8px; border-radius:10px; margin-top:0.5rem;">
          <div style="background:#f4a2c6; height:100%; width:${progress.confidenceIndex}%; border-radius:10px; transition:width 0.5s;"></div>
        </div>
      </div>
    </div>
    
    ${dailyTask ? `<div style="background:linear-gradient(135deg, #ffd9ec, #ffe5f2); padding:1.5rem; border-radius:40px; margin-bottom:2rem; border-left:5px solid #f28bb3;">
      <h3 style="color:#791e54; margin-bottom:0.5rem;">✨ Today's Micro Action (10-20 mins)</h3>
      <p style="font-size:1.1rem; color:#902e68; margin-bottom:1rem;">${dailyTask}</p>
      <button class="btn-primary" style="width:auto;" onclick="completeDailyTask()">Mark Complete ✓</button>
    </div>` : ''}
    
    <h3 style="color:#791e54; margin-bottom:1.5rem;">📅 6-Week Mentorship Journey</h3>
    <div style="margin-bottom:1rem; color:#902e68;">Week ${progress.currentWeek} of 6 • ${progress.completedTasks}/${progress.totalTasks} tasks completed (${progress.progressPercent}%)</div>
    <div style="background:#ffd6e8; height:12px; border-radius:10px; margin-bottom:2rem;">
      <div style="background:linear-gradient(90deg, #f28bb3, #c45f9b); height:100%; width:${progress.progressPercent}%; border-radius:10px; transition:width 0.5s;"></div>
    </div>
    
    ${generateWeeklyContent()}
    
    <button class="btn-primary" style="width:auto; margin-top:2rem; background:linear-gradient(115deg, #d4a5f9, #b47ad0);" onclick="resetMentorship()">Reset Journey 🔄</button>
  </div>`;
  
  document.getElementById('mainContentArea').innerHTML = content;
}

function generateWeeklyContent() {
  let html = '';
  for (let week = 1; week <= 6; week++) {
    const weekData = MentorshipSystem.weeklyProgram[week];
    const isUnlocked = weekData.unlocked;
    const isCurrent = week === MentorshipSystem.userData.currentWeek;
    
    html += `<div style="background:${isUnlocked ? '#fff' : '#f5f5f5'}; padding:1.5rem; border-radius:30px; margin-bottom:1rem; border:2px solid ${isCurrent ? '#f28bb3' : '#ffdae9'}; opacity:${isUnlocked ? '1' : '0.6'};">
      <h4 style="color:#791e54; margin-bottom:1rem;">${isUnlocked ? '🌸' : '🔒'} Week ${week}: ${weekData.title}</h4>
      ${isUnlocked ? `<ul style="list-style:none; padding:0;">
        ${weekData.tasks.map((task, idx) => {
          const taskId = `w${week}_t${idx}`;
          const isCompleted = MentorshipSystem.userData.completedTasks.includes(taskId);
          return `<li style="padding:0.5rem 0; display:flex; align-items:center; gap:0.5rem;">
            <input type="checkbox" ${isCompleted ? 'checked' : ''} onchange="completeTask(${week}, ${idx})" style="width:20px; height:20px; accent-color:#f28bb3;">
            <span style="color:${isCompleted ? '#999' : '#902e68'}; text-decoration:${isCompleted ? 'line-through' : 'none'};">${task}</span>
          </li>`;
        }).join('')}
      </ul>` : '<p style="color:#999;">Complete previous week to unlock</p>'}
    </div>`;
  }
  return html;
}

function completeTask(week, taskIndex) {
  MentorshipSystem.completeTask(week, taskIndex);
  showMentorshipDashboard();
}

function completeDailyTask() {
  MentorshipSystem.completeDailyTask();
  showMentorshipDashboard();
}

function resetMentorship() {
  if (confirm('Are you sure you want to reset your mentorship journey?')) {
    localStorage.removeItem('mentorship_data');
    MentorshipSystem.userData = {
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
    };
    showFeature('mentorship');
  }
}

window.startMentorship = startMentorship;
window.showMentorshipDashboard = showMentorshipDashboard;
window.completeTask = completeTask;
window.completeDailyTask = completeDailyTask;
window.resetMentorship = resetMentorship;


// Peer Matching Functions
function savePeerProfile() {
  const breakDuration = document.getElementById('peerBreakDuration')?.value;
  const targetRole = document.getElementById('peerTargetRole')?.value;
  const industry = document.getElementById('peerIndustry')?.value;
  
  if (!breakDuration || !targetRole || !industry) {
    alert('Please complete all fields');
    return;
  }
  
  localStorage.setItem('user_breakDuration', breakDuration);
  localStorage.setItem('user_targetRole', targetRole);
  localStorage.setItem('user_industry', industry);
  localStorage.setItem('user_confidenceLevel', 'medium');
  
  showFeature('peer');
}

function showPeerGroupBrowser(userProfile) {
  PeerMatchingSystem.init();
  const matchingGroup = PeerMatchingSystem.findMatchingGroup(userProfile);
  const allGroups = PeerMatchingSystem.getAllGroups();
  
  let content = `<div class="feature-page">
    <h2>🌸 Your Peer Groups</h2>
    <p style="color:#902e68; margin-bottom:1rem;">Join a small group of women on similar comeback journeys</p>
    <div style="background:#ffe4f3; padding:1rem; border-radius:20px; margin-bottom:2rem;">
      <strong>Your Profile:</strong> ${userProfile.industry} • ${userProfile.breakDuration} • ${userProfile.targetRole}
      <button class="btn-primary" style="width:auto; margin-left:1rem; padding:0.5rem 1rem;" onclick="editPeerProfile()">Edit Profile ✏️</button>
    </div>`;
  
  if (matchingGroup) {
    content += `<div style="background:linear-gradient(135deg, #ffd9ec, #ffe5f2); padding:2rem; border-radius:40px; margin-bottom:2rem; border:3px solid #f28bb3;">
      <h3 style="color:#791e54; margin-bottom:1rem;">✨ Perfect Match Found!</h3>
      <h4 style="color:#902e68;">${matchingGroup.name}</h4>
      <p><strong>Shared Goal:</strong> ${matchingGroup.sharedGoal}</p>
      <p><strong>Members:</strong> ${matchingGroup.members.length}/6 • <strong>Industry:</strong> ${matchingGroup.industry}</p>
      <p><strong>Break Duration:</strong> ${matchingGroup.breakDuration}</p>
      <button class="btn-primary" style="width:auto; margin-top:1rem;" onclick="joinPeerGroup('${matchingGroup.id}')">Join This Group 💕</button>
    </div>`;
  }
  
  if (allGroups.length > 0) {
    content += `<h3 style="color:#791e54; margin-top:2rem; margin-bottom:1rem;">Other Available Groups</h3>`;
    allGroups.forEach(group => {
      if (group.id === matchingGroup?.id) return;
      if (!group.hasSpace) return;
      
      content += `<div style="background:#fff; padding:1.5rem; border-radius:30px; margin-bottom:1rem; border:2px solid #ffdae9;">
        <h4 style="color:#902e68;">${group.name}</h4>
        <p style="font-size:0.9rem; color:#aa6191;"><strong>Goal:</strong> ${group.sharedGoal}</p>
        <p style="font-size:0.9rem;"><strong>Members:</strong> ${group.memberCount}/6 • <strong>Industry:</strong> ${group.industry} • <strong>Break:</strong> ${group.breakDuration}</p>
        <button class="btn-primary" style="width:auto; margin-top:0.5rem;" onclick="joinPeerGroup('${group.id}')">Join Group</button>
      </div>`;
    });
  }
  
  content += `<button class="btn-primary" style="width:auto; margin-top:2rem; background:linear-gradient(115deg, #d4a5f9, #b47ad0);" onclick="createNewPeerGroup()">Create New Group 🌟</button>
  </div>`;
  
  document.getElementById('mainContentArea').innerHTML = content;
}

function joinPeerGroup(groupId) {
  const userProfile = PeerMatchingSystem.getUserProfile();
  const success = PeerMatchingSystem.joinGroup(groupId, userProfile);
  
  if (success) {
    const group = PeerMatchingSystem.getUserGroup(userProfile.userId);
    showPeerGroupDashboard(group, userProfile);
  } else {
    alert('Unable to join group. It may be full.');
  }
}

function createNewPeerGroup() {
  const userProfile = PeerMatchingSystem.getUserProfile();
  const newGroup = PeerMatchingSystem.createNewGroup(userProfile);
  showPeerGroupDashboard(newGroup, userProfile);
}

function showPeerGroupDashboard(group, userProfile) {
  const aiSummary = PeerMatchingSystem.getAISummary(group.id);
  const recentPosts = group.posts.slice(-10).reverse();
  
  let content = `<div class="feature-page">
    <h2>🌸 ${group.name}</h2>
    <p style="color:#902e68; margin-bottom:1rem;"><strong>Shared Goal:</strong> ${group.sharedGoal}</p>
    <div style="display:flex; gap:1rem; margin-bottom:2rem; flex-wrap:wrap;">
      <div style="background:#ffe5f5; padding:1rem; border-radius:20px; flex:1; min-width:150px;">
        <div style="font-size:1.8rem; font-weight:700; color:#c45f9b;">${group.members.length}/6</div>
        <div style="color:#902e68; font-size:0.9rem;">Members</div>
      </div>
      <div style="background:#ffe5f5; padding:1rem; border-radius:20px; flex:1; min-width:150px;">
        <div style="font-size:1.8rem; font-weight:700; color:#c45f9b;">Week ${group.currentWeek}</div>
        <div style="color:#902e68; font-size:0.9rem;">of 6</div>
      </div>
      <div style="background:#ffe5f5; padding:1rem; border-radius:20px; flex:2; min-width:200px;">
        <div style="color:#902e68; font-size:0.9rem;"><strong>Industry:</strong> ${group.industry}</div>
        <div style="color:#902e68; font-size:0.9rem;"><strong>Break:</strong> ${group.breakDuration}</div>
      </div>
    </div>
    
    <div style="background:linear-gradient(135deg, #ffd9ec, #ffe5f2); padding:1.5rem; border-radius:40px; margin-bottom:2rem; border-left:5px solid #f28bb3;">
      <h3 style="color:#791e54; margin-bottom:0.5rem;">💬 This Week's Prompt</h3>
      <p style="font-size:1.1rem; color:#902e68; font-weight:500;">${group.weeklyPrompt}</p>
    </div>
    
    <div style="background:#ffe4f3; padding:1.5rem; border-radius:30px; margin-bottom:2rem;">
      <h4 style="color:#791e54; margin-bottom:0.5rem;">🤖 AI Group Assistant</h4>
      <p style="color:#902e68; font-size:0.95rem;">${aiSummary}</p>
      ${group.posts.length >= 3 ? `<button class="btn-primary" style="width:auto; margin-top:1rem;" onclick="advanceGroupWeek('${group.id}')">Move to Next Week ➡️</button>` : ''}
    </div>
    
    <h3 style="color:#791e54; margin-bottom:1rem;">💕 Group Discussion</h3>
    <textarea id="groupPostContent" rows="3" placeholder="Share your thoughts on this week's prompt..." style="width:100%; margin-bottom:1rem;"></textarea>
    <button class="btn-primary" style="width:auto; margin-bottom:2rem;" onclick="postToGroup('${group.id}')">Share 🌼</button>
    
    <div style="max-height:400px; overflow-y:auto;">`;
  
  if (recentPosts.length > 0) {
    recentPosts.forEach(post => {
      const date = new Date(post.timestamp).toLocaleDateString();
      content += `<div class="post-card" style="margin-bottom:1rem;">
        <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
          <strong style="color:#902e68;">${post.userName}</strong>
          <span style="color:#aa6191; font-size:0.85rem;">${date} • Week ${post.week}</span>
        </div>
        <p style="color:#7b3d63;">${post.content}</p>
      </div>`;
    });
  } else {
    content += `<p style="text-align:center; color:#aa6191; padding:2rem;">No posts yet. Be the first to share! 💕</p>`;
  }
  
  content += `</div>
    <button class="btn-primary" style="width:auto; margin-top:2rem; background:linear-gradient(115deg, #d4a5f9, #b47ad0);" onclick="leavePeerGroup('${group.id}')">Leave Group</button>
  </div>`;
  
  document.getElementById('mainContentArea').innerHTML = content;
}

function postToGroup(groupId) {
  const content = document.getElementById('groupPostContent').value;
  if (!content.trim()) {
    alert('Please write something to share');
    return;
  }
  
  const userName = localStorage.getItem('relaunchher_user') || 'Anonymous';
  PeerMatchingSystem.addPostToGroup(groupId, content, userName);
  
  const userProfile = PeerMatchingSystem.getUserProfile();
  const group = PeerMatchingSystem.getUserGroup(userProfile.userId);
  showPeerGroupDashboard(group, userProfile);
}

function advanceGroupWeek(groupId) {
  PeerMatchingSystem.advanceWeek(groupId);
  const userProfile = PeerMatchingSystem.getUserProfile();
  const group = PeerMatchingSystem.getUserGroup(userProfile.userId);
  showPeerGroupDashboard(group, userProfile);
}

function leavePeerGroup(groupId) {
  if (!confirm('Are you sure you want to leave this group?')) return;
  
  const userProfile = PeerMatchingSystem.getUserProfile();
  const group = PeerMatchingSystem.groups.find(g => g.id === groupId);
  if (group) {
    group.members = group.members.filter(id => id !== userProfile.userId);
    group.memberNames = group.memberNames.filter(name => name !== userProfile.name);
    PeerMatchingSystem.save();
  }
  
  showFeature('peer');
}

window.savePeerProfile = savePeerProfile;
window.showPeerGroupBrowser = showPeerGroupBrowser;
window.joinPeerGroup = joinPeerGroup;
window.createNewPeerGroup = createNewPeerGroup;
window.showPeerGroupDashboard = showPeerGroupDashboard;
window.postToGroup = postToGroup;
window.advanceGroupWeek = advanceGroupWeek;
window.leavePeerGroup = leavePeerGroup;


function editPeerProfile() {
  localStorage.removeItem('user_breakDuration');
  localStorage.removeItem('user_targetRole');
  localStorage.removeItem('user_industry');
  localStorage.removeItem('user_confidenceLevel');
  showFeature('peer');
}

window.editPeerProfile = editPeerProfile;
