// ========================================
// 6. Job Listings Page
// ========================================

import { store } from '../store.js';
import { renderPageLayout, renderSkillTag, renderMatchScore, showModal, showToast } from '../components.js';

export function renderJobListings() {
  store.currentRole = 'student';
  const jobs = store.jobs;
  const student = store.students[0];

  const content = `
    <div class="page-header">
      <h1>Job Listings 💼</h1>
      <p>Find your dream job matched to your skills and XP</p>
    </div>

    <!-- Search & Filters -->
    <div class="input-group" style="margin-bottom:var(--space-4);max-width:500px">
      <span class="input-icon">🔍</span>
      <input type="text" placeholder="Search jobs, companies, skills..." id="job-search-input" />
    </div>

    <div class="job-filters" id="job-filters">
      <div class="filter-chip active" data-filter="all">All Jobs</div>
      <div class="filter-chip" data-filter="Full-time">Full-time</div>
      <div class="filter-chip" data-filter="Internship">Internship</div>
      <div class="filter-chip" data-filter="Remote">Remote</div>
      <div class="filter-chip" data-filter="high-match">High Match (75%+)</div>
    </div>

    <!-- Job Listings -->
    <div id="job-listings-container">
      ${jobs.map(job => {
        const score = store.calculateMatchScore(student, job);
        return `
          <div class="job-listing-card" data-type="${job.type}" data-location="${job.location}" data-score="${score}" data-title="${job.title.toLowerCase()}" data-company="${job.company.toLowerCase()}">
            <div class="job-listing-logo" style="background:${job.color}15;color:${job.color}">${job.initials}</div>
            <div class="job-listing-content">
              <div class="job-listing-title">${job.title}</div>
              <div class="job-listing-company">${job.company} · ${job.location}</div>
              <div class="job-listing-meta">
                <span class="job-meta-item">💰 ${job.salary}</span>
                <span class="job-meta-item">📍 ${job.location}</span>
                <span class="job-meta-item">📋 ${job.type}</span>
                <span class="job-meta-item">⚡ ${job.xpRequired.toLocaleString()} XP required</span>
              </div>
              <div class="job-listing-skills">
                ${job.skills.map(sk => {
                  const hasSkill = student.skills.includes(sk);
                  return renderSkillTag(sk, hasSkill);
                }).join('')}
              </div>
            </div>
            <div class="job-listing-actions">
              ${renderMatchScore(score)}
              <button class="btn btn-primary btn-sm apply-job-btn" data-id="${job.id}" data-score="${score}">Apply →</button>
              <span class="text-xs text-tertiary">${job.applicants} applicants</span>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  return renderPageLayout('student', content);
}

export function initJobListings() {
  // Filter chips
  document.querySelectorAll('#job-filters .filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('#job-filters .filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const filter = chip.dataset.filter;

      document.querySelectorAll('#job-listings-container .job-listing-card').forEach(card => {
        if (filter === 'all') {
          card.style.display = '';
        } else if (filter === 'high-match') {
          card.style.display = parseInt(card.dataset.score) >= 75 ? '' : 'none';
        } else if (filter === 'Remote') {
          card.style.display = card.dataset.location === 'Remote' ? '' : 'none';
        } else {
          card.style.display = card.dataset.type === filter ? '' : 'none';
        }
      });
    });
  });

  // Search
  const searchInput = document.getElementById('job-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase();
      document.querySelectorAll('#job-listings-container .job-listing-card').forEach(card => {
        const title = card.dataset.title;
        const company = card.dataset.company;
        card.style.display = (title.includes(q) || company.includes(q)) ? '' : 'none';
      });
    });
  }

  // Apply
  document.querySelectorAll('.apply-job-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const jobId = parseInt(btn.dataset.id);
      const score = parseInt(btn.dataset.score);
      const job = store.jobs.find(j => j.id === jobId);
      if (!job) return;

      const student = store.students[0];
      const matchedSkills = job.skills.filter(s => student.skills.includes(s));
      const missingSkills = job.skills.filter(s => !student.skills.includes(s));

      showModal('AI Match Analysis', `
        <div style="text-align:center;margin-bottom:var(--space-5)">
          <div class="match-score ${score >= 75 ? 'high' : score >= 50 ? 'medium' : 'low'}"
            style="width:80px;height:80px;font-size:var(--text-xl);margin:0 auto var(--space-3)">${score}%</div>
          <div class="text-sm text-secondary">Match Score for <strong>${job.title}</strong></div>
        </div>

        <div style="margin-bottom:var(--space-4)">
          <div class="text-sm font-semibold" style="margin-bottom:var(--space-2)">✅ Matched Skills (${matchedSkills.length}/${job.skills.length})</div>
          <div style="display:flex;gap:var(--space-2);flex-wrap:wrap">
            ${matchedSkills.length > 0 ? matchedSkills.map(s => `<span class="badge badge-success">${s}</span>`).join('') : '<span class="text-sm text-tertiary">None</span>'}
          </div>
        </div>

        ${missingSkills.length > 0 ? `
        <div style="margin-bottom:var(--space-4)">
          <div class="text-sm font-semibold" style="margin-bottom:var(--space-2)">⚠️ Missing Skills</div>
          <div style="display:flex;gap:var(--space-2);flex-wrap:wrap">
            ${missingSkills.map(s => `<span class="badge badge-warning">${s}</span>`).join('')}
          </div>
        </div>
        ` : ''}

        <div style="margin-bottom:var(--space-4)">
          <div class="text-sm font-semibold" style="margin-bottom:var(--space-2)">📊 Score Breakdown</div>
          <div style="margin-bottom:var(--space-2)">
            <div style="display:flex;justify-content:space-between;margin-bottom:2px">
              <span class="text-xs text-secondary">Skills Match (40%)</span>
              <span class="text-xs font-bold">${Math.round(matchedSkills.length / job.skills.length * 100)}%</span>
            </div>
            <div class="progress-bar"><div class="progress-fill" style="width:${matchedSkills.length / job.skills.length * 100}%"></div></div>
          </div>
          <div style="margin-bottom:var(--space-2)">
            <div style="display:flex;justify-content:space-between;margin-bottom:2px">
              <span class="text-xs text-secondary">XP Level (30%)</span>
              <span class="text-xs font-bold">${Math.min(Math.round(student.xp / job.xpRequired * 100), 100)}%</span>
            </div>
            <div class="progress-bar"><div class="progress-fill" style="width:${Math.min(student.xp / job.xpRequired * 100, 100)}%"></div></div>
          </div>
          <div>
            <div style="display:flex;justify-content:space-between;margin-bottom:2px">
              <span class="text-xs text-secondary">Experience (30%)</span>
              <span class="text-xs font-bold">${Math.min(Math.round(student.level / 15 * 100), 100)}%</span>
            </div>
            <div class="progress-bar"><div class="progress-fill" style="width:${Math.min(student.level / 15 * 100, 100)}%"></div></div>
          </div>
        </div>

        <button class="btn btn-primary w-full" id="confirm-apply-btn" data-id="${jobId}">
          Submit Application 🚀
        </button>
      `);

      setTimeout(() => {
        const confirmBtn = document.getElementById('confirm-apply-btn');
        if (confirmBtn) {
          confirmBtn.addEventListener('click', () => {
            document.querySelector('.modal-overlay')?.remove();
            showToast(`🎉 Applied to ${job.title} at ${job.company}!`, 'success');
          });
        }
      }, 100);
    });
  });
}
