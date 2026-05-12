// ========================================
// Connect Hub (Replaces Community)
// ========================================

import { store } from '../store.js';
import { renderPageLayout, showToast } from '../components.js';

export function renderConnectHub() {
  const role = store.currentRole || 'student';
  const posts = store.posts;

  const startups = [
    { title: "NeuroConnect", description: "AI-powered mental health tracking wearable.", founders: "Aisha & Rahul", lookingFor: "Full Stack Dev" },
    { title: "AgriFlow", description: "Supply chain optimizer for local farmers.", founders: "David M.", lookingFor: "UI/UX Designer" }
  ];

  const content = `
    <div class="page-header">
      <h1>Connect Hub 🌟</h1>
      <p>Your networking, social, and innovation engine.</p>
    </div>

    <!-- Tabs -->
    <div class="tabs">
      <div class="tab active" id="tab-connect">🌐 Connect (Social)</div>
      <div class="tab" id="tab-startup">🚀 STARTUP (Innovation Space)</div>
    </div>

    <!-- Connect / Social Feed Section -->
    <div id="section-connect" class="dashboard-grid fade-in">
      <div>
        <div class="card card-glass" style="margin-bottom:var(--space-5)">
          <div style="display:flex;align-items:flex-start;gap:var(--space-3)">
            <div class="avatar" style="background:var(--primary-gradient)">
              ${role === 'company' ? store.currentCompany?.initials : role === 'college' ? 'AD' : store.currentStudent?.initials || 'ME'}
            </div>
            <div style="flex:1">
              <div class="input-group" style="margin-bottom:var(--space-3)">
                <input type="text" placeholder="Share your achievements or knowledge..." id="post-input" />
              </div>
              <div style="display:flex;justify-content:space-between;align-items:center">
                <div style="display:flex;gap:var(--space-3)">
                  <button class="btn btn-ghost btn-sm">📷 Image</button>
                  <button class="btn btn-ghost btn-sm">🔗 Link</button>
                </div>
                <button class="btn btn-primary btn-sm" id="create-post-btn">Post →</button>
              </div>
            </div>
          </div>
        </div>

        <div id="posts-feed">
          ${posts.map(post => `
            <div class="card post-card" style="margin-bottom:var(--space-4)" id="post-${post.id}">
              <div class="post-header" style="display:flex; gap:10px; margin-bottom:10px;">
                <div class="avatar" style="background:${post.avatar}">${post.initials}</div>
                <div>
                  <div class="font-bold">${post.author}</div>
                  <div class="text-xs text-secondary">${post.title} · ${post.time}</div>
                </div>
              </div>
              <div class="post-body" style="margin-bottom:15px;">${post.content}</div>
              <div style="display:flex; gap:15px; border-top:1px solid var(--border-light); padding-top:10px;">
                <button class="btn btn-ghost btn-sm like-btn" data-id="${post.id}" data-liked="false">👍 <span class="like-count">${post.likes}</span></button>
                <button class="btn btn-ghost btn-sm">💬 ${post.comments}</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      <div>
        <div class="card card-glass">
           <h3 style="margin-bottom:var(--space-4)">🔥 Trending Hashtags</h3>
           <p class="text-sm text-secondary">#JobReady2026</p>
           <p class="text-sm text-secondary">#FrontendDev</p>
        </div>
      </div>
    </div>

    <!-- STARTUP Section -->
    <div id="section-startup" class="dashboard-grid fade-in" style="display: none;">
      <div>
        <div class="page-header" style="margin-bottom: var(--space-4);">
          <h2>Pitch Your Idea 🎤</h2>
          <p class="text-secondary">Find collaborators and validate your startup problem statements.</p>
        </div>
        <div class="card card-glass" style="margin-bottom:var(--space-5)">
          <input type="text" id="pitch-title" class="input-group" style="width:100%; margin-bottom:10px; padding:10px;" placeholder="Startup Name or Idea Title" />
          <textarea id="pitch-desc" class="input-group" style="width:100%; height:80px; margin-bottom:10px; padding:10px;" placeholder="Describe the problem and your solution..."></textarea>
          <input type="text" id="pitch-looking" class="input-group" style="width:100%; margin-bottom:15px; padding:10px;" placeholder="Looking for... (e.g., UI/UX Designer, Backend Dev)" />
          <button class="btn btn-accent" id="btn-pitch">Pitch Idea 🚀</button>
        </div>
        <h3 style="margin-bottom:10px;">Recent Pitches</h3>
        <div id="pitches-feed">
          ${startups.map(startup => `
             <div class="card" style="margin-bottom: 15px;">
                <h3 class="text-accent">${startup.title}</h3>
                <p class="text-sm" style="margin: 10px 0;">${startup.description}</p>
                <div class="text-xs text-secondary" style="margin-bottom: 10px;">Founders: ${startup.founders}</div>
                <div style="display:flex; justify-content:space-between; align-items:center;">
                   <span class="badge badge-accent">Looking for: ${startup.lookingFor}</span>
                   <button class="btn btn-primary btn-sm btn-join-team">Request to Join</button>
                </div>
             </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  return renderPageLayout(role, content);
}

export function initConnectHub() {
  const tabConnect = document.getElementById('tab-connect');
  const tabStartup = document.getElementById('tab-startup');
  const secConnect = document.getElementById('section-connect');
  const secStartup = document.getElementById('section-startup');

  if(tabConnect && tabStartup) {
    tabConnect.addEventListener('click', () => {
      tabConnect.classList.add('active');
      tabStartup.classList.remove('active');
      secConnect.style.display = 'grid';
      secStartup.style.display = 'none';
    });

    tabStartup.addEventListener('click', () => {
      tabStartup.classList.add('active');
      tabConnect.classList.remove('active');
      secStartup.style.display = 'grid';
      secConnect.style.display = 'none';
    });
  }

  const createBtn = document.getElementById('create-post-btn');
  if (createBtn) {
    createBtn.addEventListener('click', () => {
      showToast('Post published! 🎉', 'success');
    });
  }

  const pitchBtn = document.getElementById('btn-pitch');
  if(pitchBtn) {
      pitchBtn.addEventListener('click', () => {
         const title = document.getElementById('pitch-title').value;
         if(!title) return showToast('Add a title!', 'error');
         showToast('Idea pitched successfully! 🚀', 'success');
      });
  }
}
