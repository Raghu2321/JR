// ========================================
// 1. Landing Page — Role Selection
// ========================================

import { store } from '../store.js';

export function renderLanding() {
  store.currentRole = null;

  return `
    <div class="landing-page">
      <nav class="landing-nav" id="landing-navbar">
        <a href="#/" class="navbar-brand">
          <div class="brand-icon">JR</div>
          <span>JOB READY</span>
        </a>
        <div class="navbar-nav">
          <a href="#/" class="nav-link active">Home</a>
          <a href="#/" class="nav-link">About</a>
          <a href="#/" class="nav-link">Features</a>
          <a href="#/" class="nav-link">Contact</a>
        </div>
      </nav>

      <!-- Hero -->
      <section class="hero container">
        <div class="hero-badge">🚀 The Future of Campus Hiring</div>
        <h1>
          Your Career Journey<br/>
          Starts with <span class="gradient-text">JOB READY</span>
        </h1>
        <p class="hero-subtitle">
          A 360° career ecosystem connecting students, companies, and colleges through
          skill-based hiring powered by XP, AI matching, and verified skills.
        </p>
        <div class="hero-actions">
          <button class="btn btn-primary btn-lg" onclick="document.getElementById('roles').scrollIntoView({behavior:'smooth'})">
            Get Started →
          </button>
          <button class="btn btn-outline btn-lg" onclick="document.getElementById('features').scrollIntoView({behavior:'smooth'})">
            Learn More
          </button>
        </div>
      </section>

      <!-- Role Selection -->
      <section class="role-section" id="roles">
        <div class="container">
          <div class="role-section-title">
            <h2>Choose Your Role</h2>
            <p>Select how you want to use JOB READY</p>
          </div>
          <div class="role-cards">
            <div class="role-card" id="role-student" onclick="window.location.hash='#/student/dashboard'">
              <div class="role-icon" style="background:#EEF2FF;color:#4F46E5">🎓</div>
              <h3>Student</h3>
              <p>Build skills, earn XP, practice interviews, and land your dream job with AI-powered matching.</p>
              <span class="role-enter">Enter as Student →</span>
            </div>
            <div class="role-card" id="role-company" onclick="window.location.hash='#/company/dashboard'">
              <div class="role-icon" style="background:#F5F3FF;color:#7C3AED">🏢</div>
              <h3>Company</h3>
              <p>Find top talent ranked by verified skills and XP. Streamline your hiring pipeline.</p>
              <span class="role-enter">Enter as Recruiter →</span>
            </div>
            <div class="role-card" id="role-college" onclick="window.location.hash='#/college/dashboard'">
              <div class="role-icon" style="background:#D1FAE5;color:#10B981">🏫</div>
              <h3>College</h3>
              <p>Track student performance, analyze skill gaps, and boost placement rates with data insights.</p>
              <span class="role-enter">Enter as Admin →</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Features -->
      <section class="features-section container" id="features">
        <div class="role-section-title">
          <h2>Why JOB READY?</h2>
          <p>Everything you need for a modern hiring ecosystem</p>
        </div>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon" style="background:#EEF2FF;color:#4F46E5">⚡</div>
            <h3>XP-Based Growth</h3>
            <p>Earn experience points by completing tasks, solving problems, and acing interviews. Your XP reflects real ability.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon" style="background:#F5F3FF;color:#7C3AED">🤖</div>
            <h3>AI Matching</h3>
            <p>Our AI analyzes skills, XP, and performance to match students with the perfect job opportunities.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon" style="background:#D1FAE5;color:#10B981">✅</div>
            <h3>Verified Skills</h3>
            <p>Skills are validated through actual performance, not self-claims. Recruiters see real, verified data.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon" style="background:#FEF3C7;color:#F59E0B">🎤</div>
            <h3>Mock Interviews</h3>
            <p>Practice with AI-powered mock interviews. Get real-time feedback and improve your performance.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon" style="background:#FEE2E2;color:#EF4444">📊</div>
            <h3>Analytics Dashboard</h3>
            <p>Colleges get powerful analytics to track placements, identify skill gaps, and improve outcomes.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon" style="background:#DBEAFE;color:#3B82F6">🌐</div>
            <h3>Community Hub</h3>
            <p>Connect with peers, mentors, and industry professionals. Share knowledge and grow together.</p>
          </div>
        </div>
      </section>

      <!-- Stats -->
      <section class="stats-section">
        <div class="container">
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-number" id="stat-students">10,000+</div>
              <div class="stat-text">Active Students</div>
            </div>
            <div class="stat-item">
              <div class="stat-number" id="stat-companies">500+</div>
              <div class="stat-text">Partner Companies</div>
            </div>
            <div class="stat-item">
              <div class="stat-number" id="stat-placements">8,200+</div>
              <div class="stat-text">Placements Made</div>
            </div>
            <div class="stat-item">
              <div class="stat-number" id="stat-colleges">120+</div>
              <div class="stat-text">Colleges Onboarded</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="landing-footer">
        <div class="container">
          <p>© 2026 JOB READY. All rights reserved. Built with ❤️ for the future of hiring.</p>
        </div>
      </footer>
    </div>
  `;
}
