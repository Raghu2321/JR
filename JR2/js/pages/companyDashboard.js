// ========================================
// 7. Company Dashboard
// ========================================

import { store } from '../store.js';
import { renderPageLayout, renderStatCard, showModal, showToast } from '../components.js';

export function renderCompanyDashboard() {
  store.currentRole = 'company';
  const company = store.currentCompany;
  const companyJobs = store.jobs.filter(j => j.companyId === company.id);
  const pipeline = company.pipeline;

  const content = `
    <div class="page-header">
      <div style="display:flex;align-items:center;gap:var(--space-4)">
        <div class="avatar avatar-xl" style="background:${company.color}">${company.initials}</div>
        <div>
          <h1>${company.name} Recruiting</h1>
          <p>Manage your hiring pipeline and find top talent</p>
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="dashboard-stats">
      ${renderStatCard('📋', 'Active Postings', companyJobs.length, '+2 this month', '#EEF2FF', '#4F46E5')}
      ${renderStatCard('👥', 'Total Applicants', pipeline.applied, '+12 this week', '#F5F3FF', '#7C3AED')}
      ${renderStatCard('✅', 'Shortlisted', pipeline.shortlisted, '4 pending review', '#D1FAE5', '#10B981')}
      ${renderStatCard('🎯', 'Hired', pipeline.hired, '+1 this month', '#FEF3C7', '#F59E0B')}
    </div>

    <!-- Pipeline -->
    <div style="margin-bottom:var(--space-8)">
      <h3 style="margin-bottom:var(--space-4)">Hiring Pipeline</h3>
      <div class="pipeline">
        <div class="pipeline-stage">
          <div class="pipeline-count" style="color:var(--primary)">${pipeline.applied}</div>
          <div class="pipeline-label">Applied</div>
          <div class="pipeline-bar" style="background:var(--primary)"></div>
        </div>
        <div class="pipeline-stage">
          <div class="pipeline-count" style="color:var(--accent)">${pipeline.screened}</div>
          <div class="pipeline-label">Screened</div>
          <div class="pipeline-bar" style="background:var(--accent)"></div>
        </div>
        <div class="pipeline-stage">
          <div class="pipeline-count" style="color:var(--success)">${pipeline.shortlisted}</div>
          <div class="pipeline-label">Shortlisted</div>
          <div class="pipeline-bar" style="background:var(--success)"></div>
        </div>
        <div class="pipeline-stage">
          <div class="pipeline-count" style="color:var(--warning)">${pipeline.hired}</div>
          <div class="pipeline-label">Hired</div>
          <div class="pipeline-bar" style="background:var(--warning)"></div>
        </div>
      </div>
    </div>

    <div class="dashboard-grid">
      <!-- Active Job Postings -->
      <div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-4)">
          <h3>Active Postings</h3>
          <button class="btn btn-primary btn-sm" id="post-job-btn">+ Post New Job</button>
        </div>
        ${companyJobs.map(job => `
          <div class="job-post-card">
            <div class="job-post-header">
              <div>
                <div class="job-post-title">${job.title}</div>
                <div class="job-post-dept">${job.location} · ${job.type} · ${job.salary}</div>
              </div>
              <span class="badge badge-primary">${job.posted}</span>
            </div>
            <div style="display:flex;gap:var(--space-2);flex-wrap:wrap;margin-top:var(--space-2)">
              ${job.skills.map(s => `<span class="badge badge-neutral">${s}</span>`).join('')}
            </div>
            <div class="job-post-stats">
              <div class="job-post-stat">
                <div class="job-post-stat-value">${job.applicants}</div>
                <div class="job-post-stat-label">Applicants</div>
              </div>
              <div class="job-post-stat">
                <div class="job-post-stat-value">${Math.floor(job.applicants * 0.4)}</div>
                <div class="job-post-stat-label">Screened</div>
              </div>
              <div class="job-post-stat">
                <div class="job-post-stat-value">${Math.floor(job.applicants * 0.15)}</div>
                <div class="job-post-stat-label">Shortlisted</div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Top Candidates -->
      <div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-4)">
          <h3>Top Candidates</h3>
          <a href="#/company/candidates" class="btn btn-ghost btn-sm">View All →</a>
        </div>
        ${store.getLeaderboard().slice(0, 5).map(s => `
          <div class="candidate-card">
            <div class="avatar" style="background:${s.avatar}">${s.initials}</div>
            <div class="candidate-info">
              <div class="candidate-name">${s.name}</div>
              <div class="candidate-title">${s.title} · ${s.college}</div>
              <div class="candidate-skills">
                ${s.skills.slice(0, 3).map(sk => `<span class="badge badge-neutral">${sk}</span>`).join('')}
              </div>
            </div>
            <div class="candidate-xp">
              <div class="candidate-xp-value">${s.xp.toLocaleString()}</div>
              <div class="candidate-xp-label">XP</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  return renderPageLayout('company', content);
}

export function initCompanyDashboard() {
  const postJobBtn = document.getElementById('post-job-btn');
  if (postJobBtn) {
    postJobBtn.addEventListener('click', () => {
      showModal('Post New Job', `
        <div class="form-group">
          <label class="form-label">Job Title</label>
          <input class="form-input" type="text" placeholder="e.g. Frontend Developer" />
        </div>
        <div class="form-group">
          <label class="form-label">Location</label>
          <select class="form-select">
            <option>Bangalore</option>
            <option>Hyderabad</option>
            <option>Remote</option>
            <option>Gurgaon</option>
            <option>Chennai</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Job Type</label>
          <select class="form-select">
            <option>Full-time</option>
            <option>Internship</option>
            <option>Part-time</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Required Skills</label>
          <input class="form-input" type="text" placeholder="e.g. React, TypeScript, CSS" />
        </div>
        <div class="form-group">
          <label class="form-label">Minimum XP Required</label>
          <input class="form-input" type="number" placeholder="e.g. 2000" />
        </div>
        <div class="form-group">
          <label class="form-label">Salary Range</label>
          <input class="form-input" type="text" placeholder="e.g. ₹18-25 LPA" />
        </div>
        <div class="form-group">
          <label class="form-label">Job Description</label>
          <textarea class="form-textarea" placeholder="Describe the role, responsibilities, and requirements..."></textarea>
        </div>
        <button class="btn btn-primary w-full" onclick="document.querySelector('.modal-overlay')?.remove(); window.__showToast && window.__showToast('Job posted successfully!', 'success')">
          Post Job →
        </button>
      `);
    });
  }
  // Expose toast
  window.__showToast = showToast;
}
