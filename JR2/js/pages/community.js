// ========================================
// 10. Community / Connect Hub
// ========================================

import { store } from '../store.js';
import { renderPageLayout, showToast } from '../components.js';

export function renderCommunity() {
  const role = store.currentRole || 'student';
  const posts = store.posts;

  const trendingTopics = [
    { name: '#PlacementSeason2026', count: '2.4K posts' },
    { name: '#ReactJS', count: '1.8K posts' },
    { name: '#SystemDesign', count: '1.2K posts' },
    { name: '#GoogleInterview', count: '890 posts' },
    { name: '#MachineLearning', count: '756 posts' },
  ];

  const mentors = [
    { name: 'Dr. Anil Kapoor', initials: 'AK', role: 'Senior SDE, Google', color: '#4285F4' },
    { name: 'Neha Gupta', initials: 'NG', role: 'ML Lead, Microsoft', color: '#00A4EF' },
    { name: 'Sanjay Reddy', initials: 'SR', role: 'VP Engineering, Razorpay', color: '#3395FF' },
  ];

  const events = [
    { title: 'System Design Workshop', date: 'Apr 22, 2026', time: '6:00 PM IST', speaker: 'Google SDE', badge: 'Live' },
    { title: 'Resume Building Masterclass', date: 'Apr 25, 2026', time: '5:00 PM IST', speaker: 'HR Lead, Microsoft', badge: 'Upcoming' },
  ];

  const content = `
    <div class="page-header">
      <h1>Community Hub 🌐</h1>
      <p>Connect, share knowledge, and grow with the JOB READY community</p>
    </div>

    <div class="dashboard-grid">
      <!-- Feed -->
      <div>
        <!-- Create Post -->
        <div class="card" style="margin-bottom:var(--space-5)">
          <div style="display:flex;align-items:flex-start;gap:var(--space-3)">
            <div class="avatar" style="background:var(--primary)">
              ${role === 'company' ? store.currentCompany.initials : role === 'college' ? 'AD' : store.currentStudent.initials}
            </div>
            <div style="flex:1">
              <div class="input-group" style="margin-bottom:var(--space-3)">
                <input type="text" placeholder="Share something with the community..." id="post-input" />
              </div>
              <div style="display:flex;justify-content:space-between;align-items:center">
                <div style="display:flex;gap:var(--space-3)">
                  <button class="btn btn-ghost btn-sm">📷 Image</button>
                  <button class="btn btn-ghost btn-sm">🔗 Link</button>
                  <button class="btn btn-ghost btn-sm">📊 Poll</button>
                </div>
                <button class="btn btn-primary btn-sm" id="create-post-btn">Post →</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Posts Feed -->
        <div id="posts-feed">
          ${posts.map(post => `
            <div class="post-card" id="post-${post.id}">
              <div class="post-header">
                <div class="avatar" style="background:${post.avatar}">${post.initials}</div>
                <div>
                  <div class="post-author-name">${post.author}</div>
                  <div class="post-author-title">${post.title} · ${post.time}</div>
                </div>
              </div>
              <div class="post-body">${post.content}</div>
              ${post.tags ? `
                <div style="display:flex;gap:var(--space-2);margin-bottom:var(--space-4);flex-wrap:wrap">
                  ${post.tags.map(t => `<span class="badge badge-primary">#${t}</span>`).join('')}
                </div>
              ` : ''}
              <div class="post-actions">
                <div class="post-action like-btn" data-id="${post.id}" data-liked="false">
                  <span>👍</span>
                  <span class="like-count">${post.likes}</span>
                </div>
                <div class="post-action">
                  <span>💬</span>
                  <span>${post.comments} Comments</span>
                </div>
                <div class="post-action">
                  <span>🔄</span>
                  <span>Share</span>
                </div>
                <div class="post-action">
                  <span>🔖</span>
                  <span>Save</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Right Sidebar -->
      <div style="display:flex;flex-direction:column;gap:var(--space-6)">
        <!-- Trending Topics -->
        <div class="card">
          <h3 style="margin-bottom:var(--space-4)">🔥 Trending Topics</h3>
          ${trendingTopics.map((t, i) => `
            <div class="trending-tag">
              <div class="tag-rank">${i + 1}</div>
              <div class="tag-name">${t.name}</div>
              <div class="tag-count">${t.count}</div>
            </div>
          `).join('')}
        </div>

        <!-- Mentors -->
        <div class="card">
          <h3 style="margin-bottom:var(--space-4)">🧑‍🏫 Connect with Mentors</h3>
          ${mentors.map(m => `
            <div class="mentor-card">
              <div class="avatar" style="background:${m.color}">${m.initials}</div>
              <div class="mentor-info">
                <div class="mentor-name">${m.name}</div>
                <div class="mentor-role">${m.role}</div>
              </div>
              <button class="btn btn-outline btn-sm connect-mentor-btn">Connect</button>
            </div>
          `).join('')}
        </div>

        <!-- Events -->
        <div class="card">
          <h3 style="margin-bottom:var(--space-4)">📅 Upcoming Events</h3>
          ${events.map(e => `
            <div style="padding:var(--space-3) 0;border-bottom:1px solid var(--border-light)">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:var(--space-1)">
                <div class="text-sm font-semibold">${e.title}</div>
                <span class="badge ${e.badge === 'Live' ? 'badge-danger' : 'badge-primary'}">${e.badge}</span>
              </div>
              <div class="text-xs text-tertiary">${e.date} · ${e.time}</div>
              <div class="text-xs text-secondary" style="margin-top:2px">Speaker: ${e.speaker}</div>
            </div>
          `).join('')}
          <button class="btn btn-ghost btn-sm w-full" style="margin-top:var(--space-3)">View All Events →</button>
        </div>
      </div>
    </div>
  `;

  return renderPageLayout(role, content);
}

export function initCommunity() {
  // Like posts
  document.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const liked = btn.dataset.liked === 'true';
      const countEl = btn.querySelector('.like-count');
      let count = parseInt(countEl.textContent);

      if (liked) {
        btn.dataset.liked = 'false';
        countEl.textContent = count - 1;
        btn.style.color = '';
      } else {
        btn.dataset.liked = 'true';
        countEl.textContent = count + 1;
        btn.style.color = 'var(--primary)';
        btn.style.fontWeight = '700';
      }
    });
  });

  // Create post
  const createBtn = document.getElementById('create-post-btn');
  const postInput = document.getElementById('post-input');
  if (createBtn && postInput) {
    createBtn.addEventListener('click', () => {
      const text = postInput.value.trim();
      if (!text) {
        showToast('Please write something before posting', 'error');
        return;
      }
      const role = store.currentRole || 'student';
      const user = role === 'company' ? store.currentCompany : store.currentStudent;

      const newPost = document.createElement('div');
      newPost.className = 'post-card';
      newPost.style.animation = 'slideUp 0.3s ease';
      newPost.innerHTML = `
        <div class="post-header">
          <div class="avatar" style="background:var(--primary)">${user.initials}</div>
          <div>
            <div class="post-author-name">${user.name}</div>
            <div class="post-author-title">Just now</div>
          </div>
        </div>
        <div class="post-body">${text}</div>
        <div class="post-actions">
          <div class="post-action"><span>👍</span><span>0</span></div>
          <div class="post-action"><span>💬</span><span>0 Comments</span></div>
          <div class="post-action"><span>🔄</span><span>Share</span></div>
          <div class="post-action"><span>🔖</span><span>Save</span></div>
        </div>
      `;

      const feed = document.getElementById('posts-feed');
      if (feed) feed.prepend(newPost);
      postInput.value = '';
      showToast('Post published! 🎉', 'success');
    });
  }

  // Connect mentor
  document.querySelectorAll('.connect-mentor-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.textContent = '✓ Connected';
      btn.className = 'btn btn-success btn-sm';
      showToast('Connection request sent! 🤝', 'success');
    });
  });
}
