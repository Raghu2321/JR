// ========================================
// 5. Student Portfolio
// ========================================

import { store } from '../store.js';
import { renderPageLayout, renderSkillTag } from '../components.js';

export function renderPortfolio() {
  store.currentRole = 'student';
  const s = store.currentStudent;

  const projects = [
    { title: 'E-Commerce Platform', desc: 'Full-stack online shop with React, Node.js, and MongoDB', color: '#4F46E5', icon: '🛒', skills: ['React', 'Node.js', 'MongoDB'] },
    { title: 'ML Sentiment Analyzer', desc: 'NLP model to analyze tweet sentiments using Python & TensorFlow', color: '#7C3AED', icon: '🤖', skills: ['Python', 'TensorFlow', 'NLP'] },
    { title: 'Task Management App', desc: 'Real-time collaborative task board with drag-and-drop', color: '#10B981', icon: '📋', skills: ['React', 'Firebase', 'CSS'] },
    { title: 'REST API Service', desc: 'Scalable microservice architecture with authentication', color: '#F59E0B', icon: '⚙️', skills: ['Node.js', 'Express', 'PostgreSQL'] },
    { title: 'Portfolio Website', desc: 'Personal portfolio with 3D animations and dark mode', color: '#EC4899', icon: '🎨', skills: ['HTML', 'CSS', 'Three.js'] },
  ];

  const achievements = [
    { icon: '🏆', title: 'First Challenge', date: 'Jan 2026', desc: 'Completed your first challenge' },
    { icon: '⚡', title: '1000 XP', date: 'Feb 2026', desc: 'Reached 1000 experience points' },
    { icon: '🔥', title: '7-Day Streak', date: 'Mar 2026', desc: 'Practiced for 7 consecutive days' },
    { icon: '✅', title: 'Skill Master', date: 'Mar 2026', desc: 'Verified 4 skills through challenges' },
    { icon: '🎤', title: 'Interview Pro', date: 'Apr 2026', desc: 'Completed 10 mock interviews' },
    { icon: '🚀', title: 'Level 10+', date: 'Apr 2026', desc: 'Reached Level 10 milestone' },
  ];

  const content = `
    <!-- Portfolio Header -->
    <div class="portfolio-header">
      <div class="portfolio-avatar">${s.initials}</div>
      <div class="portfolio-info">
        <h2>${s.name}</h2>
        <div class="portfolio-title">${s.title} · ${s.college}</div>
        <div style="display:flex;gap:var(--space-2);margin-bottom:var(--space-4);flex-wrap:wrap">
          <span class="badge badge-primary">⭐ Level ${s.level}</span>
          <span class="badge badge-accent">⚡ ${s.xp.toLocaleString()} XP</span>
          <span class="badge badge-success">🏆 Rank #${s.rank}</span>
        </div>
        <div class="portfolio-stats">
          <div class="portfolio-stat-item">
            <div class="pstat-value">${s.completedChallenges}</div>
            <div class="pstat-label">Challenges</div>
          </div>
          <div class="portfolio-stat-item">
            <div class="pstat-value">${s.projectCount}</div>
            <div class="pstat-label">Projects</div>
          </div>
          <div class="portfolio-stat-item">
            <div class="pstat-value">${s.interviewsCompleted}</div>
            <div class="pstat-label">Interviews</div>
          </div>
          <div class="portfolio-stat-item">
            <div class="pstat-value">${s.skills.filter(sk => sk.verified).length}</div>
            <div class="pstat-label">Verified Skills</div>
          </div>
        </div>
      </div>
    </div>

    <div class="dashboard-grid">
      <div style="display:flex;flex-direction:column;gap:var(--space-6)">
        <!-- Verified Skills -->
        <div class="card">
          <h3 style="margin-bottom:var(--space-5)">Verified Skills</h3>
          <div style="display:flex;flex-wrap:wrap;gap:var(--space-2);margin-bottom:var(--space-5)">
            ${s.skills.map(sk => renderSkillTag(sk.name, sk.verified)).join('')}
          </div>
          ${s.skills.map(sk => `
            <div class="skill-item">
              <div class="skill-name" style="min-width:100px">
                ${sk.verified ? '<span style="color:var(--success)">✓</span>' : '<span style="color:var(--text-tertiary)">○</span>'}
                ${sk.name}
              </div>
              <div class="skill-progress-wrap">
                <div class="progress-bar">
                  <div class="progress-fill" style="width:${sk.level}%"></div>
                </div>
              </div>
              <div class="skill-level">${sk.level}%</div>
              <div class="text-xs text-tertiary" style="min-width:50px;text-align:right">${sk.xp} XP</div>
            </div>
          `).join('')}
        </div>

        <!-- Projects -->
        <div class="card">
          <h3 style="margin-bottom:var(--space-5)">Projects</h3>
          <div class="grid grid-2 gap-4">
            ${projects.map(p => `
              <div class="project-card">
                <div class="project-preview" style="background:${p.color}10;color:${p.color}">${p.icon}</div>
                <div class="project-content">
                  <h4>${p.title}</h4>
                  <p>${p.desc}</p>
                  <div style="display:flex;gap:var(--space-2);flex-wrap:wrap">
                    ${p.skills.map(sk => `<span class="badge badge-neutral">${sk}</span>`).join('')}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div style="display:flex;flex-direction:column;gap:var(--space-6)">
        <!-- XP Breakdown -->
        <div class="card" style="background:linear-gradient(135deg,var(--primary-bg),var(--accent-bg))">
          <h3 style="margin-bottom:var(--space-4)">XP Breakdown</h3>
          <div style="margin-bottom:var(--space-3)">
            <div style="display:flex;justify-content:space-between;margin-bottom:4px">
              <span class="text-sm">Challenges</span>
              <span class="text-sm font-bold">1,240 XP</span>
            </div>
            <div class="progress-bar"><div class="progress-fill" style="width:55%"></div></div>
          </div>
          <div style="margin-bottom:var(--space-3)">
            <div style="display:flex;justify-content:space-between;margin-bottom:4px">
              <span class="text-sm">Interviews</span>
              <span class="text-sm font-bold">680 XP</span>
            </div>
            <div class="progress-bar"><div class="progress-fill" style="width:30%"></div></div>
          </div>
          <div style="margin-bottom:var(--space-3)">
            <div style="display:flex;justify-content:space-between;margin-bottom:4px">
              <span class="text-sm">Projects</span>
              <span class="text-sm font-bold">380 XP</span>
            </div>
            <div class="progress-bar"><div class="progress-fill" style="width:15%"></div></div>
          </div>
          <div>
            <div style="display:flex;justify-content:space-between;margin-bottom:4px">
              <span class="text-sm">Streaks</span>
              <span class="text-sm font-bold">150 XP</span>
            </div>
            <div class="progress-bar"><div class="progress-fill" style="width:7%"></div></div>
          </div>
        </div>

        <!-- Achievements -->
        <div class="card">
          <h3 style="margin-bottom:var(--space-4)">🏅 Achievements</h3>
          ${achievements.map(a => `
            <div style="display:flex;gap:var(--space-3);padding:var(--space-3) 0;border-bottom:1px solid var(--border-light)">
              <span style="font-size:1.3rem">${a.icon}</span>
              <div style="flex:1">
                <div class="text-sm font-semibold">${a.title}</div>
                <div class="text-xs text-tertiary">${a.desc}</div>
              </div>
              <div class="text-xs text-tertiary">${a.date}</div>
            </div>
          `).join('')}
        </div>

        <!-- Download Resume -->
        <button class="btn btn-primary w-full" onclick="alert('Resume download feature coming soon!')">
          📄 Download Resume
        </button>
      </div>
    </div>
  `;

  return renderPageLayout('student', content);
}
