export const renderConnectHub = (navigate) => {
  const container = document.createElement('div');
  container.className = 'fade-in';

  // Global State
  let xp = 450;
  let activeTabKey = 'connect'; 
  
  container.innerHTML = `
    <nav class="navbar">
      <div class="logo-section">
        <div class="logo" id="nav-logo">JOB READY</div>
        <div class="search-bar">
          <i data-feather="search" style="color: var(--text-secondary); width: 16px;"></i>
          <input type="text" placeholder="Search for jobs, skills, or people" />
        </div>
      </div>
      <div class="nav-actions">
        <div class="nav-item active"><i data-feather="home"></i>Home</div>
        <div class="nav-item"><i data-feather="users"></i>Network</div>
        <div class="nav-item"><i data-feather="briefcase"></i>Jobs</div>
        <div class="nav-item"><i data-feather="message-square"></i>Messages</div>
        <div class="nav-item"><i data-feather="bell"></i>Notifications</div>
        <div class="profile-img" style="width: 32px; height: 32px; margin:-36px 0 0 0; margin-top:0;"></div>
      </div>
    </nav>
    
    <div class="hub-container">
      <aside class="sidebar-left fade-in">
        <div class="card profile-card">
          <div class="profile-bg"></div>
          <div class="profile-img"></div>
          <div class="profile-info">
            <div class="profile-name">Alex Johnson</div>
            <div class="profile-headline">Computer Science Student | Aspiring SDE</div>
          </div>
          <div class="profile-stats">
            <div class="stat-row">
              <span class="stat-label">Profile views</span>
              <span class="stat-value">47</span>
            </div>
            <div class="stat-row">
              <span class="stat-label">Connections</span>
              <span class="stat-value">128</span>
            </div>
          </div>
          <div class="xp-bar-container">
            <div class="stat-row">
              <span class="stat-label">Level 5</span>
              <span class="stat-value" id="xp-text">${xp} / 500 XP</span>
            </div>
            <div class="xp-bar">
              <div class="xp-progress" id="xp-fill" style="width: 90%;"></div>
            </div>
          </div>
        </div>
        
        <div class="card sidebar-module">
          <h4>Recent Tags</h4>
          <div class="trend-item"><span class="trend-meta">#</span> <span class="trend-title">ReactJS</span></div>
          <div class="trend-item"><span class="trend-meta">#</span> <span class="trend-title">SystemDesign</span></div>
          <div class="trend-item"><span class="trend-meta">#</span> <span class="trend-title">Startup</span></div>
        </div>
      </aside>
      
      <main class="feed-area fade-in">
        <div class="division-switcher" style="display: flex; gap: 1rem; margin-bottom: 1.5rem;">
          <div class="div-btn active" id="div-connect-hub" style="flex:1;text-align:center;padding:0.75rem;border-radius:var(--radius-sm);font-weight:600;cursor:pointer;background:var(--primary);color:white;box-shadow:var(--shadow-sm);transition:all 0.2s;">Connect Hub</div>
          <div class="div-btn" id="div-interview-arena" style="flex:1;text-align:center;padding:0.75rem;border-radius:var(--radius-sm);font-weight:600;cursor:pointer;background:var(--surface);border:1px solid var(--border);color:var(--text-secondary);transition:all 0.2s;">Interview Arena</div>
        </div>
        
        <div id="sub-tabs-container">
          <div class="tabs">
            <div class="tab active" id="tab-connect"><i data-feather="activity"></i> Connect</div>
            <div class="tab" id="tab-startup"><i data-feather="zap"></i> Startup Space</div>
          </div>
        </div>
        
        <div id="feed-content">
        </div>
      </main>
      
      <aside class="sidebar-right fade-in">
        <div class="card sidebar-module">
          <h4>Trending in Tech</h4>
          <div class="trend-item">
            <div class="trend-title">AI in 2026</div>
            <div class="trend-meta">Top news • 10,492 readers</div>
          </div>
          <div class="trend-item">
            <div class="trend-title">Remote Work Trends</div>
            <div class="trend-meta">1d ago • 5,200 readers</div>
          </div>
          <div class="trend-item">
            <div class="trend-title">Vite vs Webpack</div>
            <div class="trend-meta">12h ago • 3,100 readers</div>
          </div>
        </div>
      </aside>
    </div>

    <!-- Success Modal -->
    <div class="success-overlay" id="success-overlay">
      <div class="success-modal">
        <div class="success-icon"><i data-feather="check"></i></div>
        <h2>Assessment Complete!</h2>
        <p>Great job practicing! You've earned +50 XP.</p>
        <button class="btn btn-primary" id="btn-return-hub">Return to Hub</button>
      </div>
    </div>
  `;
  
  const renderConnectFeed = () => `
    <div class="card create-post fade-in">
      <div class="create-post-top">
        <div class="create-post-avatar"></div>
        <div class="create-post-input">Share an update, project, or achievement...</div>
      </div>
      <div class="create-post-actions">
        <button class="action-btn media"><i data-feather="image"></i> Media</button>
        <button class="action-btn event"><i data-feather="calendar"></i> Event</button>
        <button class="action-btn article"><i data-feather="file-text"></i> Write article</button>
      </div>
    </div>
    
    <div class="card post fade-in" style="animation-delay: 0.1s">
      <div class="post-header">
        <div class="post-author">
          <div class="author-avatar" style="background-image: url('https://ui-avatars.com/api/?name=Sarah+Lee&background=random');"></div>
          <div class="author-meta">
            <span class="author-name">Sarah Lee</span>
            <span class="author-title">UI/UX Designer | Looking for internships</span>
            <span class="post-time">2h • <i data-feather="globe" style="width:12px;height:12px;display:inline"></i></span>
          </div>
        </div>
        <button class="btn-icon"><i data-feather="more-horizontal"></i></button>
      </div>
      <div class="post-content">
        Just finished my latest UI case study on improving e-commerce checkouts! 🚀 Excited to share exactly how micro-interactions can boost conversion rates by 15%.
      </div>
      <div class="post-stats">
        <span>👍 34 Likes</span>
        <span>5 Comments • 2 Reposts</span>
      </div>
      <div class="post-actions">
        <button class="action-btn"><i data-feather="thumbs-up"></i> Like</button>
        <button class="action-btn"><i data-feather="message-circle"></i> Comment</button>
        <button class="action-btn"><i data-feather="repeat"></i> Repost</button>
        <button class="action-btn"><i data-feather="send"></i> Send</button>
      </div>
    </div>
  `;

  const renderStartupFeed = () => `
    <div class="startup-pitch-box fade-in">
      <h3><i data-feather="zap"></i> Pitch Your Startup Idea</h3>
      <p style="color: var(--text-secondary); margin-bottom: 1rem; font-size: 0.9rem;">Share your vision, get feedback, and find co-founders.</p>
      <button class="btn btn-primary" style="background-color: var(--secondary)">Create Pitch</button>
    </div>
    
    <div class="startup-feed fade-in" style="animation-delay: 0.1s">
      <div class="card post idea-card">
        <div class="post-header" style="padding-bottom: 0.5rem">
          <div class="post-author">
            <div class="author-avatar" style="background-image: url('https://ui-avatars.com/api/?name=Raj+Patel&background=random');"></div>
            <div class="author-meta">
              <span class="author-name">Raj Patel</span>
              <span class="author-title">Founder • EcoFlow</span>
              <span class="post-time">1d • <i data-feather="briefcase" style="width:12px;height:12px;display:inline;color:var(--secondary)"></i> Seed Stage</span>
            </div>
          </div>
          <span class="startup-tag"><i data-feather="target" style="width:12px;height:12px;"></i> EdTech</span>
        </div>
        <div class="post-content">
          <div class="idea-section">
            <h4>💡 The Problem</h4>
            <p>Students struggle to find structured, quality mentorship for specialized tech stacks. Existing platforms are too broad or expensive.</p>
          </div>
          <div class="idea-section">
            <h4>🚀 The Solution</h4>
            <p>A micro-mentorship marketplace where students can book 15-minute code review sessions with vetted industry professionals for affordable rates.</p>
          </div>
        </div>
        <div class="post-stats">
          <span>🔥 45 Upvotes</span>
          <span>12 Interested • 8 Comments</span>
        </div>
        <div class="post-actions">
          <button class="action-btn" style="color: var(--secondary)"><i data-feather="arrow-up"></i> Upvote</button>
          <button class="action-btn"><i data-feather="message-square"></i> Feedback</button>
          <button class="action-btn"><i data-feather="share-2"></i> Share</button>
        </div>
      </div>
    </div>
  `;

  const renderInterviewDashboard = () => `
    <div class="interview-grid fade-in">
      <!-- Card 1 -->
      <div class="interview-card category-select" data-category="Aptitude">
        <div class="interview-header">
          <div class="interview-icon aptitude"><i data-feather="pie-chart"></i></div>
          <div class="interview-content">
            <h3>Aptitude</h3>
            <p>Quantitative & logical reasoning</p>
          </div>
        </div>
        <div class="interview-footer">
          <span class="interview-progress">12/50 Modules</span>
          <button class="btn btn-primary" style="font-size: 0.75rem; padding: 0.25rem 0.75rem;">Practice</button>
        </div>
      </div>
      
      <!-- Card 2 -->
      <div class="interview-card category-select" data-category="Verbal">
        <div class="interview-header">
          <div class="interview-icon verbal"><i data-feather="edit-3"></i></div>
          <div class="interview-content">
            <h3>Verbal</h3>
            <p>English & communication skills</p>
          </div>
        </div>
        <div class="interview-footer">
          <span class="interview-progress">8/30 Modules</span>
          <button class="btn btn-primary" style="font-size: 0.75rem; padding: 0.25rem 0.75rem;">Practice</button>
        </div>
      </div>
      
      <!-- Card 3 -->
      <div class="interview-card category-select" data-category="Technical 1">
        <div class="interview-header">
          <div class="interview-icon tech1"><i data-feather="code"></i></div>
          <div class="interview-content">
            <h3>Technical 1</h3>
            <p>DSA & Core Subjects</p>
          </div>
        </div>
        <div class="interview-footer">
          <span class="interview-progress">24/100 Questions</span>
          <button class="btn btn-primary" style="font-size: 0.75rem; padding: 0.25rem 0.75rem;">Practice</button>
        </div>
      </div>

      <!-- Card 4 -->
      <div class="interview-card category-select" data-category="Technical 2">
        <div class="interview-header">
          <div class="interview-icon tech2"><i data-feather="layers"></i></div>
          <div class="interview-content">
            <h3>Technical 2</h3>
            <p>System Design & Domain specific</p>
          </div>
        </div>
        <div class="interview-footer">
          <span class="interview-progress">3/15 Scenarios</span>
          <button class="btn btn-primary" style="font-size: 0.75rem; padding: 0.25rem 0.75rem;">Practice</button>
        </div>
      </div>
      
      <!-- Card 5 -->
      <div class="interview-card category-select" data-category="Group Discussion">
        <div class="interview-header">
          <div class="interview-icon gd"><i data-feather="users"></i></div>
          <div class="interview-content">
            <h3>Group Discussion</h3>
            <p>Simulated GD topics</p>
          </div>
        </div>
        <div class="interview-footer">
          <span class="interview-progress">2/10 Topics</span>
          <button class="btn btn-primary" style="font-size: 0.75rem; padding: 0.25rem 0.75rem;">Practice</button>
        </div>
      </div>

      <!-- Card 6 -->
      <div class="interview-card category-select" data-category="HR">
        <div class="interview-header">
          <div class="interview-icon hr"><i data-feather="briefcase"></i></div>
          <div class="interview-content">
            <h3>HR</h3>
            <p>Behavioral & Situtational</p>
          </div>
        </div>
        <div class="interview-footer">
          <span class="interview-progress">5/25 Questions</span>
          <button class="btn btn-primary" style="font-size: 0.75rem; padding: 0.25rem 0.75rem;">Practice</button>
        </div>
      </div>
      
      <!-- Card 7 -->
      <div class="interview-card category-select" data-category="Mock Tests" style="grid-column: 1 / -1; border-color: var(--primary);">
        <div class="interview-header">
          <div class="interview-icon mock"><i data-feather="target"></i></div>
          <div class="interview-content">
            <h3>Full Mock Tests</h3>
            <p>Complete timed assessments simulating real placement tests</p>
          </div>
        </div>
        <div class="interview-footer" style="margin-top: 1rem;">
          <span class="interview-progress">Previous Score: 85%</span>
          <button class="btn btn-primary">Take Mock Test</button>
        </div>
      </div>
    </div>
  `;

  const renderAssessmentView = (categoryName) => `
    <div class="assessment-view fade-in">
      <div class="assessment-header">
        <div>
          <h2 style="margin-bottom: 0.25rem;">${categoryName} Practice</h2>
          <p style="color: var(--text-secondary); font-size: 0.85rem;">Question 1 of 10</p>
        </div>
        <div class="timer">14:59</div>
      </div>
      
      <div class="question-box">
        <div class="question-text">
          What will be the time complexity of a binary search tree in the worst case?
        </div>
        <div class="options-container">
          <div class="option-row option-choice">
            <div style="font-weight: bold; width: 24px;">A</div>
            <div>O(log n)</div>
          </div>
          <div class="option-row option-choice">
            <div style="font-weight: bold; width: 24px;">B</div>
            <div>O(n)</div>
          </div>
          <div class="option-row option-choice">
            <div style="font-weight: bold; width: 24px;">C</div>
            <div>O(n log n)</div>
          </div>
          <div class="option-row option-choice">
            <div style="font-weight: bold; width: 24px;">D</div>
            <div>O(1)</div>
          </div>
        </div>
      </div>
      
      <div style="display: flex; justify-content: space-between; margin-top: 3rem;">
        <button class="btn btn-outline" id="btn-cancel-assessment">Cancel</button>
        <button class="btn btn-primary" id="btn-submit-assessment" disabled>Submit Answer</button>
      </div>
    </div>
  `;

  const feedContent = container.querySelector('#feed-content');
  feedContent.innerHTML = renderConnectFeed(); // default
  
  const subTabsContainer = container.querySelector('#sub-tabs-container');
  const divConnectHub = container.querySelector('#div-connect-hub');
  const divInterviewArena = container.querySelector('#div-interview-arena');
  const tabConnect = container.querySelector('#tab-connect');
  const tabStartup = container.querySelector('#tab-startup');
  
  let currentSubTab = 'connect'; // Keep track of which sub tab to show when switching divisions

  const setDivActive = (activeDiv) => {
    [divConnectHub, divInterviewArena].forEach(d => {
      d.style.background = 'var(--surface)';
      d.style.color = 'var(--text-secondary)';
      d.style.border = '1px solid var(--border)';
      d.style.boxShadow = 'none';
    });
    activeDiv.style.background = 'var(--primary)';
    activeDiv.style.color = 'white';
    activeDiv.style.border = '1px solid transparent';
    activeDiv.style.boxShadow = 'var(--shadow-sm)';
  };
  
  const setTabActive = (activeTab) => {
    [tabConnect, tabStartup].forEach(t => t.classList.remove('active'));
    activeTab.classList.add('active');
  };

  const attachInterviewListeners = () => {
    const cards = feedContent.querySelectorAll('.category-select');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const cat = card.getAttribute('data-category');
        feedContent.innerHTML = renderAssessmentView(cat);
        attachAssessmentListeners();
      });
    });
  };

  const attachAssessmentListeners = () => {
    const options = feedContent.querySelectorAll('.option-choice');
    const submitBtn = feedContent.querySelector('#btn-submit-assessment');
    const cancelBtn = feedContent.querySelector('#btn-cancel-assessment');
    
    options.forEach(opt => {
      opt.addEventListener('click', () => {
        options.forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        submitBtn.removeAttribute('disabled');
      });
    });

    cancelBtn.addEventListener('click', () => {
      feedContent.innerHTML = renderInterviewDashboard();
      if (window.feather) window.feather.replace();
      attachInterviewListeners();
    });

    submitBtn.addEventListener('click', () => {
      // Show success modal
      const modal = container.querySelector('#success-overlay');
      modal.style.display = 'flex';
      
      // Update global XP
      xp += 50;
      let level = Math.floor(xp / 500) + 5;
      let levelProgress = xp % 500;
      let percentage = (levelProgress / 500) * 100;
      // if exactly 0 or just maxed out
      if (percentage === 0) percentage = 100;
      
      container.querySelector('#xp-text').innerText = levelProgress + " / 500 XP";
      container.querySelector('#xp-fill').style.width = percentage + "%";
      container.querySelector('.stat-label').innerText = "Level " + level;
      
      if (window.feather) window.feather.replace();
    });
  };

  // Close modal via button
  const returnBtn = container.querySelector('#btn-return-hub');
  returnBtn.addEventListener('click', () => {
    container.querySelector('#success-overlay').style.display = 'none';
    feedContent.innerHTML = renderInterviewDashboard();
    if (window.feather) window.feather.replace();
    attachInterviewListeners();
  });
  
  divConnectHub.addEventListener('click', () => {
    setDivActive(divConnectHub);
    subTabsContainer.style.display = 'block';
    if (currentSubTab === 'connect') {
      feedContent.innerHTML = renderConnectFeed();
    } else {
      feedContent.innerHTML = renderStartupFeed();
    }
    if (window.feather) window.feather.replace();
  });
  
  divInterviewArena.addEventListener('click', () => {
    setDivActive(divInterviewArena);
    subTabsContainer.style.display = 'none';
    feedContent.innerHTML = renderInterviewDashboard();
    if (window.feather) window.feather.replace();
    attachInterviewListeners();
  });

  tabConnect.addEventListener('click', () => {
    currentSubTab = 'connect';
    setTabActive(tabConnect);
    feedContent.innerHTML = renderConnectFeed();
    if (window.feather) window.feather.replace();
  });
  
  tabStartup.addEventListener('click', () => {
    currentSubTab = 'startup';
    setTabActive(tabStartup);
    feedContent.innerHTML = renderStartupFeed();
    if (window.feather) window.feather.replace();
  });
  
  const logoBtn = container.querySelector('#nav-logo');
  logoBtn.addEventListener('click', () => {
    navigate('landing');
  });

  return container;
};
