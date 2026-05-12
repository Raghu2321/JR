// ========================================
// 2. Student Dashboard
// ========================================

import { store } from '../store.js';
import { renderPageLayout, renderStatCard, renderXPRing } from '../components.js';

export function renderStudentDashboard() {
  store.currentRole = 'student';
  const s = store.currentStudent;
  const leaderboard = store.getLeaderboard().slice(0, 5);
  const recommendedJobs = store.jobs.slice(0, 3);

  const content = `
    <div class="page-header">
      <h1>Welcome back, ${s.name.split(' ')[0]}! 👋</h1>
      <p>Here's your career progress overview</p>
    </div>

    <!-- Stats Row -->
    <div class="dashboard-stats">
      ${renderStatCard('⚡', 'Total XP', s.xp.toLocaleString(), '+120 this week', '#EEF2FF', '#4F46E5')}
      ${renderStatCard('🏆', 'Rank', '#' + s.rank, '↑ 2 positions', '#F5F3FF', '#7C3AED')}
      ${renderStatCard('✅', 'Challenges', s.completedChallenges, '+5 completed', '#D1FAE5', '#10B981')}
      ${renderStatCard('🎤', 'Interviews', s.interviewsCompleted, '3 this month', '#FEF3C7', '#F59E0B')}
    </div>

    <!-- Main Grid -->
    <div class="dashboard-grid">
      <div style="display:flex;flex-direction:column;gap:var(--space-6)">
        <!-- XP Overview -->
        <div class="card">
          <div class="xp-overview">
            ${renderXPRing(s.xp, s.xpForLevel, s.level)}
            <div class="xp-details">
              <span class="xp-level">⭐ Level ${s.level}</span>
              <h3 style="margin-bottom:var(--space-2)">Experience Points</h3>
              <div class="progress-bar progress-bar-lg" style="margin-bottom:var(--space-2)">
                <div class="progress-fill" style="width:${(s.xp / s.xpForLevel * 100).toFixed(0)}%"></div>
              </div>
              <div class="xp-next-level">
                <span>${s.xpToNext}</span> XP to Level ${s.level + 1}
              </div>
              <div style="display:flex;gap:var(--space-3);margin-top:var(--space-4)">
                <a href="#/student/practice" class="btn btn-primary btn-sm">🎯 Practice</a>
                <a href="#/student/interview" class="btn btn-outline btn-sm">🎤 Interview</a>
                <a href="#/student/jobs" class="btn btn-ghost btn-sm">💼 Jobs</a>
              </div>
            </div>
          </div>
        </div>

        <!-- Skills Progress -->
        <div class="card">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-5)">
            <h3>Skill Progress</h3>
            <a href="#/student/portfolio" class="btn btn-ghost btn-sm">View Profile →</a>
          </div>
          ${s.skills.map(skill => `
            <div class="skill-item">
              <div class="skill-name">
                ${skill.verified ? '<span style="color:var(--success)">✓</span>' : '<span style="color:var(--text-tertiary)">○</span>'}
                ${skill.name}
              </div>
              <div class="skill-progress-wrap">
                <div class="progress-bar">
                  <div class="progress-fill" style="width:${skill.level}%"></div>
                </div>
              </div>
              <div class="skill-level">${skill.level}%</div>
            </div>
          `).join('')}
        </div>

        <!-- Recommended Jobs -->
        <div class="card">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-5)">
            <h3>Recommended Jobs</h3>
            <a href="#/student/jobs" class="btn btn-ghost btn-sm">View All →</a>
          </div>
          ${recommendedJobs.map(job => {
            const score = store.calculateMatchScore(store.students[0], job);
            return `
              <div class="job-card-mini" onclick="window.location.hash='#/student/jobs'">
                <div class="job-logo" style="background:${job.color}20;color:${job.color}">${job.initials}</div>
                <div class="job-info">
                  <div class="job-title-text">${job.title}</div>
                  <div class="job-company-text">${job.company} · ${job.location}</div>
                </div>
                <div class="match-score ${score >= 75 ? 'high' : score >= 50 ? 'medium' : 'low'}">${score}%</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Right Column -->
      <div style="display:flex;flex-direction:column;gap:var(--space-6)">
        <!-- Streak -->
        <div class="card" style="background:linear-gradient(135deg,#4F46E5,#7C3AED);color:white">
          <div style="display:flex;align-items:center;gap:var(--space-3);margin-bottom:var(--space-3)">
            <span style="font-size:2rem">🔥</span>
            <div>
              <div style="font-size:var(--text-3xl);font-weight:900">${s.streak}</div>
              <div style="font-size:var(--text-sm);opacity:0.85">Day Streak</div>
            </div>
          </div>
          <p style="font-size:var(--text-sm);opacity:0.75">Keep practicing daily to maintain your streak!</p>
        </div>

        <!-- Leaderboard -->
        <div class="card">
          <h3 style="margin-bottom:var(--space-4)">🏆 Leaderboard</h3>
          ${leaderboard.map((student, i) => `
            <div class="leaderboard-row" style="${student.id === s.id ? 'background:var(--primary-bg);border-radius:var(--radius)' : ''}">
              <div class="leaderboard-rank ${i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : ''}"
                style="${i > 2 ? 'background:var(--surface);color:var(--text-secondary)' : ''}">${i + 1}</div>
              <div class="avatar avatar-sm" style="background:${student.avatar}">${student.initials}</div>
              <div style="flex:1;min-width:0">
                <div class="text-sm font-semibold truncate">${student.name}</div>
                <div class="text-xs text-tertiary">Level ${student.level}</div>
              </div>
              <div class="text-sm font-bold text-primary">${student.xp.toLocaleString()} XP</div>
            </div>
          `).join('')}
        </div>

        <!-- Recent Activity -->
        <div class="card">
          <h3 style="margin-bottom:var(--space-4)">Recent Activity</h3>
          <div class="activity-item">
            <div class="activity-dot" style="background:var(--success)"></div>
            <div>
              <div class="activity-text"><strong>Completed</strong> SQL Query Challenge (+40 XP)</div>
              <div class="activity-time">2 hours ago</div>
            </div>
          </div>
          <div class="activity-item">
            <div class="activity-dot" style="background:var(--primary)"></div>
            <div>
              <div class="activity-text"><strong>Applied</strong> to ML Engineer at Microsoft</div>
              <div class="activity-time">5 hours ago</div>
            </div>
          </div>
          <div class="activity-item">
            <div class="activity-dot" style="background:var(--warning)"></div>
            <div>
              <div class="activity-text"><strong>Passed</strong> Mock Interview - Technical</div>
              <div class="activity-time">1 day ago</div>
            </div>
          </div>
          <div class="activity-item">
            <div class="activity-dot" style="background:var(--accent)"></div>
            <div>
              <div class="activity-text"><strong>Earned</strong> React Verified Badge</div>
              <div class="activity-time">2 days ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  return renderPageLayout('student', content);
}
