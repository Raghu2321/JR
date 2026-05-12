// ========================================
// JOB READY — Main Application Entry
// ========================================

import { Router } from './router.js';
import { store } from './store.js';

// Pages
import { renderLanding } from './pages/landing.js';
import { renderStudentDashboard } from './pages/studentDashboard.js';
import { renderPracticeArena, initPracticeArena } from './pages/practiceArena.js';
import { renderInterviewArena, initInterviewArena } from './pages/interviewArena.js';
import { renderPortfolio } from './pages/portfolio.js';
import { renderJobListings, initJobListings } from './pages/jobListings.js';
import { renderCompanyDashboard, initCompanyDashboard } from './pages/companyDashboard.js';
import { renderCandidateRanking, initCandidateRanking } from './pages/candidateRanking.js';
import { renderCollegeDashboard } from './pages/collegeDashboard.js';
import { renderConnectHub, initConnectHub } from './pages/connectHub.js';

// ---- Initialize Router ----
const router = new Router();

// Landing
router.on('/', renderLanding);
router.on('', renderLanding);

// Student routes
router.on('/student/dashboard', renderConnectHub);
router.on('/student/practice', renderPracticeArena);
router.on('/student/interview', renderInterviewArena);
router.on('/student/portfolio', renderPortfolio);
router.on('/student/jobs', renderJobListings);

// Company routes
router.on('/company/dashboard', renderCompanyDashboard);
router.on('/company/candidates', renderCandidateRanking);

// College routes
router.on('/college/dashboard', renderCollegeDashboard);

// Connect Hub (Replaces Community)
router.on('/community', renderConnectHub);

// Fallback
router.on('*', renderLanding);

// ---- Post-render Initialization ----
window.addEventListener('routeRendered', (e) => {
  const route = e.detail.route;

  // Initialize page-specific interactivity
  setTimeout(() => {
    if (route === '/student/practice') initPracticeArena();
    if (route === '/student/interview') initInterviewArena();
    if (route === '/student/jobs') initJobListings();
    if (route === '/company/dashboard') initCompanyDashboard();
    if (route === '/company/candidates') initCandidateRanking();
    if (route === '/student/dashboard' || route === '/community') initConnectHub();

    // Mobile menu toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.getElementById('main-sidebar');
    if (mobileBtn && sidebar) {
      mobileBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
      });
    }

    // Close sidebar on link click (mobile)
    document.querySelectorAll('.sidebar-link').forEach(link => {
      link.addEventListener('click', () => {
        const sidebar = document.getElementById('main-sidebar');
        if (sidebar) sidebar.classList.remove('open');
      });
    });
  }, 150);
});

// ---- Start App ----
router.start();

console.log('🚀 JOB READY — 360° Career Ecosystem loaded!');
