// ========================================
// JOB READY — Shared UI Components
// ========================================

import { store } from './store.js';

// ---- Navbar ----
export function renderNavbar(role) {
  const navLinks = {
    student: [
      { label: 'Dashboard', route: '#/student/dashboard' },
      { label: 'Practice', route: '#/student/practice' },
      { label: 'Jobs', route: '#/student/jobs' },
      { label: 'Community', route: '#/community' },
    ],
    company: [
      { label: 'Dashboard', route: '#/company/dashboard' },
      { label: 'Candidates', route: '#/company/candidates' },
      { label: 'Community', route: '#/community' },
    ],
    college: [
      { label: 'Analytics', route: '#/college/dashboard' },
      { label: 'Community', route: '#/community' },
    ],
  };
  const links = navLinks[role] || [];
  const currentHash = window.location.hash;

  const user = role === 'company'
    ? { name: store.currentCompany.name, initials: store.currentCompany.initials, color: store.currentCompany.color }
    : role === 'college'
    ? { name: 'Admin', initials: 'AD', color: '#10B981' }
    : { name: store.currentStudent.name, initials: store.currentStudent.initials, color: '#4F46E5' };

  return `
    <nav class="navbar" id="main-navbar">
      <a href="#/" class="navbar-brand">
        <div class="brand-icon">JR</div>
        <span>JOB READY</span>
      </a>
      <button class="mobile-menu-toggle" id="mobile-menu-btn" aria-label="Toggle menu">☰</button>
      <div class="navbar-nav" id="navbar-nav">
        ${links.map(l => `
          <a href="${l.route}" class="nav-link ${currentHash === l.route ? 'active' : ''}">${l.label}</a>
        `).join('')}
      </div>
      <div class="navbar-user" onclick="window.location.hash='/'">
        <div class="avatar" style="background:${user.color}">${user.initials}</div>
        <span class="text-sm font-medium" style="color:var(--text)">${user.name}</span>
      </div>
    </nav>
  `;
}

// ---- Sidebar ----
export function renderSidebar(role) {
  const currentHash = window.location.hash;
  const sections = {
    student: [
      {
        title: 'Main',
        links: [
          { icon: '📊', label: 'Dashboard', route: '#/student/dashboard' },
          { icon: '🎯', label: 'Practice Arena', route: '#/student/practice' },
          { icon: '🎤', label: 'Interview Arena', route: '#/student/interview' },
          { icon: '💼', label: 'Job Listings', route: '#/student/jobs' },
        ]
      },
      {
        title: 'Profile',
        links: [
          { icon: '👤', label: 'My Portfolio', route: '#/student/portfolio' },
          { icon: '🏆', label: 'Leaderboard', route: '#/student/dashboard', badge: null },
        ]
      },
      {
        title: 'Social',
        links: [
          { icon: '🌐', label: 'Community', route: '#/community' },
        ]
      },
    ],
    company: [
      {
        title: 'Recruiting',
        links: [
          { icon: '📊', label: 'Dashboard', route: '#/company/dashboard' },
          { icon: '👥', label: 'Candidates', route: '#/company/candidates' },
        ]
      },
      {
        title: 'Social',
        links: [
          { icon: '🌐', label: 'Community', route: '#/community' },
        ]
      },
    ],
    college: [
      {
        title: 'Analytics',
        links: [
          { icon: '📊', label: 'Dashboard', route: '#/college/dashboard' },
        ]
      },
      {
        title: 'Social',
        links: [
          { icon: '🌐', label: 'Community', route: '#/community' },
        ]
      },
    ],
  };

  const sidebarSections = sections[role] || [];

  return `
    <aside class="sidebar" id="main-sidebar">
      ${sidebarSections.map(section => `
        <div class="sidebar-section">
          <div class="sidebar-section-title">${section.title}</div>
          ${section.links.map(link => `
            <a href="${link.route}" class="sidebar-link ${currentHash === link.route ? 'active' : ''}">
              <span class="link-icon">${link.icon}</span>
              <span>${link.label}</span>
              ${link.badge ? `<span class="link-badge">${link.badge}</span>` : ''}
            </a>
          `).join('')}
        </div>
      `).join('')}
    </aside>
  `;
}

// ---- Stat Card ----
export function renderStatCard(icon, label, value, change, bgColor = '#EEF2FF', iconColor = '#4F46E5') {
  const changeClass = change && change.startsWith('+') ? 'positive' : change && change.startsWith('-') ? 'negative' : '';
  return `
    <div class="stat-card">
      <div class="stat-icon" style="background:${bgColor};color:${iconColor};font-size:1.3rem">${icon}</div>
      <div class="stat-info">
        <div class="stat-label">${label}</div>
        <div class="stat-value">${value}</div>
        ${change ? `<div class="stat-change ${changeClass}">${change}</div>` : ''}
      </div>
    </div>
  `;
}

// ---- XP Ring ----
export function renderXPRing(xp, xpForLevel, level) {
  const pct = xp / xpForLevel;
  const circumference = 2 * Math.PI * 52;
  const dashoffset = circumference * (1 - pct);
  return `
    <div class="xp-ring">
      <svg width="120" height="120" viewBox="0 0 120 120">
        <defs>
          <linearGradient id="xpGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#4F46E5" />
            <stop offset="100%" style="stop-color:#7C3AED" />
          </linearGradient>
        </defs>
        <circle class="ring-bg" cx="60" cy="60" r="52" />
        <circle class="ring-fill" cx="60" cy="60" r="52"
          stroke-dasharray="${circumference}"
          stroke-dashoffset="${dashoffset}" />
      </svg>
      <div class="ring-text">
        <div class="ring-value">${xp.toLocaleString()}</div>
        <div class="ring-label">XP</div>
      </div>
    </div>
  `;
}

// ---- Skill Badge ----
export function renderSkillTag(name, verified = false) {
  return `
    <span class="skill-tag ${verified ? 'verified' : ''}">
      ${verified ? '<span class="verified-icon">✓</span>' : ''}
      ${name}
    </span>
  `;
}

// ---- Match Score ----
export function renderMatchScore(score) {
  const cls = score >= 75 ? 'high' : score >= 50 ? 'medium' : 'low';
  return `<div class="match-score ${cls}">${score}%</div>`;
}

// ---- Toast ----
export function showToast(message, type = '') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'} ${message}`;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ---- Modal ----
export function showModal(title, bodyHTML, actions = []) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <h3>${title}</h3>
        <button class="btn btn-ghost btn-icon" id="modal-close-btn">✕</button>
      </div>
      <div class="modal-body">${bodyHTML}</div>
      ${actions.length > 0 ? `
        <div class="modal-footer">
          ${actions.map(a => `<button class="btn ${a.class || 'btn-ghost'}" id="${a.id}">${a.label}</button>`).join('')}
        </div>
      ` : ''}
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target.id === 'modal-close-btn') {
      overlay.remove();
    }
  });
  return overlay;
}

// ---- Page Layout Wrapper ----
export function renderPageLayout(role, content) {
  return `
    ${renderNavbar(role)}
    ${renderSidebar(role)}
    <main class="main-content page-enter">
      ${content}
    </main>
  `;
}
