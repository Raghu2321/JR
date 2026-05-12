// ========================================
// 8. Candidate Ranking Page
// ========================================

import { store } from '../store.js';
import { renderPageLayout, renderSkillTag, showToast } from '../components.js';

export function renderCandidateRanking() {
  store.currentRole = 'company';
  const candidates = store.getLeaderboard();

  const content = `
    <div class="page-header">
      <h1>Candidate Ranking 👥</h1>
      <p>Browse and shortlist top talent ranked by XP and verified skills</p>
    </div>

    <!-- Filters -->
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-6);flex-wrap:wrap;gap:var(--space-3)">
      <div class="input-group" style="max-width:350px">
        <span class="input-icon">🔍</span>
        <input type="text" placeholder="Search candidates..." id="candidate-search" />
      </div>
      <div style="display:flex;gap:var(--space-3)">
        <div class="filter-chip active" data-cfilter="all">All Candidates</div>
        <div class="filter-chip" data-cfilter="shortlisted">Shortlisted</div>
        <div class="filter-chip" data-cfilter="verified">Verified 3+</div>
      </div>
    </div>

    <!-- Candidates Table -->
    <div class="table-wrapper">
      <table class="table" id="candidate-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Candidate</th>
            <th>College</th>
            <th>Skills</th>
            <th>Verified</th>
            <th>XP</th>
            <th>Level</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${candidates.map((s, i) => `
            <tr data-id="${s.id}" data-name="${s.name.toLowerCase()}" data-verified="${s.verified}" data-shortlisted="${store.isShortlisted(s.id)}">
              <td>
                <div class="leaderboard-rank ${i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : ''}"
                  style="${i > 2 ? 'background:var(--surface);color:var(--text-secondary)' : ''}">${i + 1}</div>
              </td>
              <td>
                <div style="display:flex;align-items:center;gap:var(--space-3)">
                  <div class="avatar avatar-sm" style="background:${s.avatar}">${s.initials}</div>
                  <div>
                    <div class="font-semibold text-sm">${s.name}</div>
                    <div class="text-xs text-tertiary">${s.title}</div>
                  </div>
                </div>
              </td>
              <td class="text-sm">${s.college}</td>
              <td>
                <div style="display:flex;gap:4px;flex-wrap:wrap">
                  ${s.skills.slice(0, 3).map(sk => `<span class="badge badge-neutral">${sk}</span>`).join('')}
                  ${s.skills.length > 3 ? `<span class="badge badge-neutral">+${s.skills.length - 3}</span>` : ''}
                </div>
              </td>
              <td>
                <span class="badge ${s.verified >= 3 ? 'badge-success' : 'badge-warning'}">${s.verified} verified</span>
              </td>
              <td>
                <span class="font-bold text-primary">${s.xp.toLocaleString()}</span>
              </td>
              <td>
                <span class="badge badge-primary">Lvl ${s.level}</span>
              </td>
              <td>
                <div class="candidate-actions">
                  <button class="btn ${store.isShortlisted(s.id) ? 'btn-success' : 'btn-outline'} btn-sm shortlist-btn" data-id="${s.id}">
                    ${store.isShortlisted(s.id) ? '✓ Shortlisted' : 'Shortlist'}
                  </button>
                </div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <!-- Candidate Cards (Mobile View Alternative) -->
    <div style="display:none;margin-top:var(--space-6)" id="candidate-cards-mobile">
      ${candidates.map((s, i) => `
        <div class="candidate-card" data-id="${s.id}">
          <div class="leaderboard-rank ${i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : ''}"
            style="${i > 2 ? 'background:var(--surface);color:var(--text-secondary)' : ''}">${i + 1}</div>
          <div class="avatar" style="background:${s.avatar}">${s.initials}</div>
          <div class="candidate-info">
            <div class="candidate-name">${s.name}</div>
            <div class="candidate-title">${s.title} · ${s.college}</div>
            <div class="candidate-skills">
              ${s.skills.map(sk => `<span class="badge badge-neutral">${sk}</span>`).join('')}
            </div>
          </div>
          <div class="candidate-xp">
            <div class="candidate-xp-value">${s.xp.toLocaleString()}</div>
            <div class="candidate-xp-label">XP · Lvl ${s.level}</div>
          </div>
          <div class="candidate-actions">
            <button class="btn ${store.isShortlisted(s.id) ? 'btn-success' : 'btn-outline'} btn-sm shortlist-btn" data-id="${s.id}">
              ${store.isShortlisted(s.id) ? '✓' : '+'}
            </button>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Summary -->
    <div class="grid grid-3 gap-4" style="margin-top:var(--space-8)">
      <div class="card text-center">
        <div class="text-3xl font-bold text-primary" style="margin-bottom:var(--space-1)">${candidates.length}</div>
        <div class="text-sm text-secondary">Total Candidates</div>
      </div>
      <div class="card text-center">
        <div class="text-3xl font-bold" style="color:var(--success);margin-bottom:var(--space-1)">${store.shortlistedCandidates.length}</div>
        <div class="text-sm text-secondary">Shortlisted</div>
      </div>
      <div class="card text-center">
        <div class="text-3xl font-bold" style="color:var(--accent);margin-bottom:var(--space-1)">${candidates.filter(c => c.verified >= 3).length}</div>
        <div class="text-sm text-secondary">Highly Verified</div>
      </div>
    </div>
  `;

  return renderPageLayout('company', content);
}

export function initCandidateRanking() {
  // Shortlist toggle
  document.querySelectorAll('.shortlist-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      const added = store.toggleShortlist(id);
      if (added) {
        btn.className = 'btn btn-success btn-sm shortlist-btn';
        btn.textContent = '✓ Shortlisted';
        showToast('Candidate shortlisted! ✅', 'success');
      } else {
        btn.className = 'btn btn-outline btn-sm shortlist-btn';
        btn.textContent = 'Shortlist';
        showToast('Candidate removed from shortlist', '');
      }
    });
  });

  // Search
  const searchInput = document.getElementById('candidate-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase();
      document.querySelectorAll('#candidate-table tbody tr').forEach(row => {
        row.style.display = row.dataset.name.includes(q) ? '' : 'none';
      });
    });
  }

  // Filters
  document.querySelectorAll('[data-cfilter]').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('[data-cfilter]').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const filter = chip.dataset.cfilter;
      document.querySelectorAll('#candidate-table tbody tr').forEach(row => {
        if (filter === 'all') {
          row.style.display = '';
        } else if (filter === 'shortlisted') {
          row.style.display = store.isShortlisted(parseInt(row.dataset.id)) ? '' : 'none';
        } else if (filter === 'verified') {
          row.style.display = parseInt(row.dataset.verified) >= 3 ? '' : 'none';
        }
      });
    });
  });
}
