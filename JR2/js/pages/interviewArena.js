// ========================================
// 4. Interview Arena
// ========================================

import { store } from '../store.js';
import { renderPageLayout, showToast } from '../components.js';
import { interviewData } from '../data/interviewQuestions.js';

let currentState = {
  view: 'main', // 'main', 'subcategories', 'chapters', 'quiz'
  category: null,     // 'Aptitude' or 'Verbal'
  subcategory: null,  // 'Quantitative Aptitude' or 'Logical Reasoning', etc
  chapterIndex: 0,
  questionIndex: 0,
  score: 0
};

export function renderInterviewArena() {
  store.currentRole = 'student';

  const content = `
    <div class="page-header">
      <h1>Interview Arena 🎤</h1>
      <p>Practice mock interviews, solve challenges, and climb the leaderboard</p>
    </div>

    <!-- Container for dynamic injection -->
    <div id="arena-content">
      ${renderMainGrid()}
    </div>
  `;

  return renderPageLayout('student', content);
}

// 1. Initial Grid
function renderMainGrid() {
  return `
    <div class="grid grid-3 gap-4" style="margin-bottom:var(--space-8)">
      <div class="card card-glass card-interactive arena-category-btn" data-category="Aptitude">
        <div class="interview-icon" style="background:#EEF2FF;color:#4F46E5;font-size:24px;border-radius:12px;padding:12px;display:inline-block;margin-bottom:15px">🧮</div>
        <h3 class="text-primary" style="margin-bottom:5px">Aptitude</h3>
        <p class="text-sm text-secondary" style="margin-bottom:10px">Quantitative & Logical reasoning</p>
        <span class="badge badge-primary">Earn XP per question</span>
      </div>
      <div class="card card-glass card-interactive arena-category-btn" data-category="Verbal">
        <div class="interview-icon" style="background:#F5F3FF;color:#7C3AED;font-size:24px;border-radius:12px;padding:12px;display:inline-block;margin-bottom:15px">📝</div>
        <h3 class="text-accent" style="margin-bottom:5px">Verbal</h3>
        <p class="text-sm text-secondary" style="margin-bottom:10px">Reading comprehension & Grammar</p>
        <span class="badge badge-accent">Earn XP per question</span>
      </div>
      <div class="card card-glass card-interactive start-interview-btn" data-type="Tech1">
        <div class="interview-icon" style="background:#DBEAFE;color:#3B82F6;font-size:24px;border-radius:12px;padding:12px;display:inline-block;margin-bottom:15px">💻</div>
        <h3 class="text-info" style="margin-bottom:5px">Technical 1</h3>
        <p class="text-sm text-secondary" style="margin-bottom:10px">Core subjects (OS, DBMS, CN)</p>
        <span class="badge badge-primary">+150 XP</span>
      </div>
      <div class="card card-glass card-interactive start-interview-btn" data-type="Tech2">
        <div class="interview-icon" style="background:#E0E7FF;color:#3730A3;font-size:24px;border-radius:12px;padding:12px;display:inline-block;margin-bottom:15px">⚡</div>
        <h3 style="color:#3730A3;margin-bottom:5px">Technical 2</h3>
        <p class="text-sm text-secondary" style="margin-bottom:10px">Advanced Data Structures & Algorithms</p>
        <span class="badge badge-primary">+200 XP</span>
      </div>
      <div class="card card-glass card-interactive start-interview-btn" data-type="GD">
        <div class="interview-icon" style="background:#FEF3C7;color:#F59E0B;font-size:24px;border-radius:12px;padding:12px;display:inline-block;margin-bottom:15px">🗣️</div>
        <h3 class="text-warning" style="margin-bottom:5px">Group Discussion</h3>
        <p class="text-sm text-secondary" style="margin-bottom:10px">AI simulated GD environments</p>
        <span class="badge badge-warning">+120 XP</span>
      </div>
      <div class="card card-glass card-interactive start-interview-btn" data-type="HR">
        <div class="interview-icon" style="background:#D1FAE5;color:#10B981;font-size:24px;border-radius:12px;padding:12px;display:inline-block;margin-bottom:15px">🤝</div>
        <h3 class="text-success" style="margin-bottom:5px">HR Interview</h3>
        <p class="text-sm text-secondary" style="margin-bottom:10px">Behavioral prep & Cultural fit</p>
        <span class="badge badge-success">+150 XP</span>
      </div>
      <div class="card card-glass card-interactive start-interview-btn" data-type="Mock">
        <div class="interview-icon" style="background:#FEE2E2;color:#EF4444;font-size:24px;border-radius:12px;padding:12px;display:inline-block;margin-bottom:15px">🎯</div>
        <h3 class="text-danger" style="margin-bottom:5px">Mock Tests</h3>
        <p class="text-sm text-secondary" style="margin-bottom:10px">Full-length assessments</p>
        <span class="badge badge-danger">+300 XP</span>
      </div>
    </div>

    <!-- Video Call Simulation -->
    <div style="margin-top:var(--space-8)">
      <h3 style="margin-bottom:var(--space-4)">Live Interview Simulation</h3>
      <div class="dashboard-grid-equal">
        <div class="video-call" id="video-call-area">
          <div class="video-main">
            <div class="interviewer-avatar">🤖</div>
            <div class="video-self">👤</div>
          </div>
          <div class="video-controls">
            <div class="video-control-btn" title="Mute">🎤</div>
            <div class="video-control-btn" title="Camera">📷</div>
            <div class="video-control-btn" title="Share Screen">🖥️</div>
            <div class="video-control-btn" title="Chat">💬</div>
            <div class="video-control-btn end-call" title="End Call" id="end-call-btn">📞</div>
          </div>
        </div>

        <div class="card card-glass">
          <h3 style="margin-bottom:var(--space-5)">🤖 AI Feedback Engine</h3>
          <div id="ai-feedback-area">
            <div style="text-align:center;padding:var(--space-8)">
              <div style="font-size:2rem;margin-bottom:var(--space-3)">🎯</div>
              <p class="text-secondary text-sm">Select an interview type to start receiving AI evaluation and XP points.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// 2. Subcategories (e.g. Quantitative vs Logical)
function renderSubcategories() {
  const subCats = Object.keys(interviewData[currentState.category]);

  const cards = subCats.map(subCat => {
    return `
      <div class="card card-interactive arena-subcategory-btn" data-sub="${subCat}" style="text-align:center; padding:var(--space-10)">
        <h2 style="margin-bottom:var(--space-2); color:var(--primary)">${subCat}</h2>
        <p class="text-secondary">${interviewData[currentState.category][subCat].length} Chapters</p>
      </div>
    `;
  }).join('');

  return `
    <div class="quiz-breadcrumbs">
      <span class="bc-home">Interview Arena</span> > 
      <span class="active">${currentState.category}</span>
    </div>
    <div class="grid grid-2 gap-6">
      ${cards}
    </div>
  `;
}

// 3. Chapters
function renderChapters() {
  const chapters = interviewData[currentState.category][currentState.subcategory];

  const cards = chapters.map((chap, idx) => {
    return `
      <div class="card card-interactive arena-chapter-btn" data-idx="${idx}">
        <h4 style="margin-bottom:var(--space-2)">${chap.chapter}</h4>
        <div style="display:flex; justify-content:space-between; align-items:center">
          <span class="text-sm text-secondary">${chap.questions.length} Questions</span>
          <button class="btn btn-primary btn-sm">Start Practice</button>
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="quiz-breadcrumbs">
      <span class="bc-home">Interview Arena</span> > 
      <span class="bc-cat">${currentState.category}</span> > 
      <span class="active">${currentState.subcategory}</span>
    </div>
    <h3 style="margin-bottom:var(--space-4)">Select a Chapter to Begin</h3>
    <div class="chapter-grid">
      ${cards}
    </div>
  `;
}

// 4. Quiz Interface
function renderQuiz() {
  const chapters = interviewData[currentState.category][currentState.subcategory];
  const chapterData = chapters[currentState.chapterIndex];
  const qData = chapterData.questions[currentState.questionIndex];

  // If questions are done
  if (!qData) {
    return `
      <div class="quiz-breadcrumbs">
        <span class="bc-home">Interview Arena</span> > 
        <span class="bc-cat">${currentState.category}</span> > 
        <span class="bc-sub">${currentState.subcategory}</span> > 
        <span class="active">${chapterData.chapter}</span>
      </div>
      <div class="card card-glass" style="max-width:600px; margin:0 auto; text-align:center; padding:var(--space-10)">
        <div style="font-size:3rem; margin-bottom:var(--space-4)">🎉</div>
        <h2 style="margin-bottom:var(--space-3)">Chapter Completed!</h2>
        <p class="text-secondary" style="margin-bottom:var(--space-6)">You have successfully finished all practice questions for this chapter.</p>
        <button class="btn btn-primary bc-sub">Choose Another Chapter</button>
      </div>
    `;
  }

  const optionsHTML = qData.options.map((opt, i) => `
    <button class="quiz-option-btn" data-idx="${i}">${opt}</button>
  `).join('');

  return `
    <div class="quiz-breadcrumbs">
      <span class="bc-home">Interview Arena</span> > 
      <span class="bc-cat">${currentState.category}</span> > 
      <span class="bc-sub">${currentState.subcategory}</span> > 
      <span class="active">${chapterData.chapter}</span>
    </div>
    
    <div class="card card-glass" style="max-width:800px; margin:0 auto;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--space-6); border-bottom:1px solid var(--border-light); padding-bottom:var(--space-4)">
        <span class="badge badge-accent">Question ${currentState.questionIndex + 1} of ${chapterData.questions.length}</span>
        <span class="text-sm font-bold text-success">+${qData.xp} XP</span>
      </div>
      
      <h3 style="font-size:1.4rem; margin-bottom:var(--space-6); line-height:1.5;">${qData.text}</h3>
      
      <div id="quiz-options-container">
        ${optionsHTML}
      </div>

      <div style="margin-top:var(--space-6); text-align:right">
        <button class="btn btn-primary" id="btn-next-question" style="display:none;">Next Question ➔</button>
      </div>
    </div>
  `;
}

// ==== Event Binding & State Management ====
function updateArenaView() {
  const container = document.getElementById('arena-content');
  if (!container) return;

  if (currentState.view === 'main') {
    container.innerHTML = renderMainGrid();
    bindSimulationEvents();
  } else if (currentState.view === 'subcategories') {
    container.innerHTML = renderSubcategories();
  } else if (currentState.view === 'chapters') {
    container.innerHTML = renderChapters();
  } else if (currentState.view === 'quiz') {
    container.innerHTML = renderQuiz();
  }

  bindArenaEvents();
}

function bindArenaEvents() {
  document.querySelectorAll('.arena-category-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      currentState.category = e.currentTarget.dataset.category;
      currentState.view = 'subcategories';
      updateArenaView();
    });
  });

  document.querySelectorAll('.arena-subcategory-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      currentState.subcategory = e.currentTarget.dataset.sub;
      currentState.view = 'chapters';
      updateArenaView();
    });
  });

  document.querySelectorAll('.arena-chapter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      currentState.chapterIndex = parseInt(e.currentTarget.dataset.idx);
      currentState.questionIndex = 0;
      currentState.view = 'quiz';
      updateArenaView();
    });
  });

  // Breadcrumbs
  document.querySelectorAll('.bc-home').forEach(btn => {
    btn.addEventListener('click', () => {
      currentState.view = 'main';
      updateArenaView();
    });
  });
  document.querySelectorAll('.bc-cat').forEach(btn => {
    btn.addEventListener('click', () => {
      currentState.view = 'subcategories';
      updateArenaView();
    });
  });
  document.querySelectorAll('.bc-sub').forEach(btn => {
    btn.addEventListener('click', () => {
      currentState.view = 'chapters';
      updateArenaView();
    });
  });

  // Quiz Options
  const optionBtns = document.querySelectorAll('.quiz-option-btn');
  const nextBtn = document.getElementById('btn-next-question');

  optionBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (btn.classList.contains('correct') || btn.classList.contains('incorrect')) return; // Already answered

      const selectedIdx = parseInt(e.currentTarget.dataset.idx);
      const chapterData = interviewData[currentState.category][currentState.subcategory][currentState.chapterIndex];
      const qData = chapterData.questions[currentState.questionIndex];
      const correctIdx = qData.correctIndex;

      // Disable all buttons
      optionBtns.forEach(b => b.disabled = true);

      // Evaluate
      if (selectedIdx === correctIdx) {
        btn.classList.add('correct');
        store.earnXP(qData.xp);
        showToast(`Correct! +${qData.xp} XP`, 'success');
        
        // Ensure header XP updates (requires global re-render or explicit DOM update)
        const xpElement = document.querySelector('.navbar-user .font-bold.text-primary');
        if (xpElement) xpElement.innerText = `${store.currentStudent.xp} XP`;

      } else {
        btn.classList.add('incorrect');
        // highlight correct one
        optionBtns[correctIdx].classList.add('correct');
        showToast('Incorrect answer. Try to understand the logic.', 'error');
      }

      nextBtn.style.display = 'inline-flex';
    });
  });

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentState.questionIndex++;
      updateArenaView();
    });
  }
}

// ==== Legacy Simulation Events (For Technical, GD, HR, Mocks) ====
function bindSimulationEvents() {
  document.querySelectorAll('.start-interview-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.dataset.type;
      const feedbackArea = document.getElementById('ai-feedback-area');
      if (!feedbackArea) return;

      showToast(`Starting ${type} Interview Simulation...`, 'success');

      setTimeout(() => {
        const score = Math.floor(70 + Math.random() * 25);
        feedbackArea.innerHTML = `
          <div style="animation:slideUp 0.3s ease">
            <div style="text-align:center;margin-bottom:var(--space-5)">
              <div style="font-size:var(--text-4xl);font-weight:900;color:${score >= 80 ? 'var(--success)' : 'var(--warning)'}">${score}%</div>
              <div class="text-sm text-secondary">Performance Score</div>
            </div>
            <div style="space-y:var(--space-3)">
              <div style="margin-bottom:var(--space-3)">
                <div style="display:flex;justify-content:space-between;margin-bottom:4px">
                  <span class="text-sm font-medium">Communication</span>
                  <span class="text-sm font-bold text-primary">${Math.floor(75 + Math.random() * 20)}%</span>
                </div>
                <div class="progress-bar"><div class="progress-fill" style="width:${75 + Math.random() * 20}%"></div></div>
              </div>
              <div style="margin-bottom:var(--space-3)">
                <div style="display:flex;justify-content:space-between;margin-bottom:4px">
                  <span class="text-sm font-medium">Problem Solving</span>
                  <span class="text-sm font-bold text-primary">${Math.floor(70 + Math.random() * 25)}%</span>
                </div>
                <div class="progress-bar"><div class="progress-fill" style="width:${70 + Math.random() * 25}%"></div></div>
              </div>
            </div>
            <div class="card card-flat" style="margin-top:var(--space-4);padding:var(--space-4)">
              <p class="text-sm text-secondary"><strong>💡 Tip:</strong> Practice explaining your thought process out loud.</p>
            </div>
          </div>
        `;
        
        // Award simulation XP
        store.earnXP(100);
        const xpElement = document.querySelector('.navbar-user .font-bold.text-primary');
        if (xpElement) xpElement.innerText = `${store.currentStudent.xp} XP`;
        
      }, 1500);
    });
  });

  const endCallBtn = document.getElementById('end-call-btn');
  if (endCallBtn) {
    endCallBtn.addEventListener('click', () => {
      showToast('Interview session ended', '');
    });
  }
}

export function initInterviewArena() {
  // Reset state on init so it starts fresh every time you click Sidebar -> Interview Arena
  currentState = {
    view: 'main',
    category: null,
    subcategory: null,
    chapterIndex: 0,
    questionIndex: 0,
    score: 0
  };
  bindArenaEvents();
  bindSimulationEvents();
}
