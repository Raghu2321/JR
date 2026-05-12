// ========================================
// 3. Practice Arena
// ========================================

import { store } from '../store.js';
import { renderPageLayout, showToast, showModal } from '../components.js';

export function renderPracticeArena() {
  store.currentRole = 'student';
  const challenges = store.challenges;
  const categories = ['All', 'Coding', 'Design', 'Data', 'Communication'];
  const difficulties = { Easy: 'badge-success', Medium: 'badge-warning', Hard: 'badge-danger' };

  const content = `
    <div class="page-header">
      <h1>Practice Arena 🎯</h1>
      <p>Complete challenges to earn XP and verify your skills</p>
    </div>

    <!-- Category Tabs -->
    <div class="tabs" id="practice-tabs">
      ${categories.map((cat, i) => `
        <div class="tab ${i === 0 ? 'active' : ''}" data-category="${cat}">${cat}</div>
      `).join('')}
    </div>

    <!-- Challenge Grid -->
    <div class="challenge-grid" id="challenge-grid">
      ${challenges.map(c => `
        <div class="challenge-card" data-category="${c.category}" data-id="${c.id}">
          <div class="challenge-header">
            <div class="challenge-category">
              <span class="badge badge-neutral">${c.category}</span>
              <span class="badge ${difficulties[c.difficulty]}">${c.difficulty}</span>
            </div>
            <div class="challenge-title">${c.title}</div>
            <div class="challenge-desc">${c.description}</div>
          </div>
          <div class="challenge-footer">
            <div class="challenge-xp">⚡ +${c.xp} XP</div>
            <div class="text-xs text-tertiary">⏱ ${c.time}</div>
            ${c.completed
              ? '<span class="badge badge-success">✓ Completed</span>'
              : `<button class="btn btn-primary btn-sm start-challenge-btn" data-id="${c.id}">Start</button>`
            }
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Code Editor Preview -->
    <div style="margin-top:var(--space-8)">
      <h3 style="margin-bottom:var(--space-4)">💻 Code Editor</h3>
      <div class="code-editor">
        <div class="code-editor-header">
          <span class="code-editor-dot" style="background:#EF4444"></span>
          <span class="code-editor-dot" style="background:#F59E0B"></span>
          <span class="code-editor-dot" style="background:#10B981"></span>
          <span style="color:#94A3B8;font-size:var(--text-xs);margin-left:var(--space-4)">solution.js</span>
        </div>
        <div class="code-editor-body">
          <div><span class="code-line-number">1</span>  <span class="code-comment">// Write your solution here</span></div>
          <div><span class="code-line-number">2</span>  <span class="code-keyword">function</span> <span class="code-function">twoSum</span>(nums, target) {</div>
          <div><span class="code-line-number">3</span>    <span class="code-keyword">const</span> map = <span class="code-keyword">new</span> <span class="code-function">Map</span>();</div>
          <div><span class="code-line-number">4</span>    <span class="code-keyword">for</span> (<span class="code-keyword">let</span> i = 0; i < nums.length; i++) {</div>
          <div><span class="code-line-number">5</span>      <span class="code-keyword">const</span> complement = target - nums[i];</div>
          <div><span class="code-line-number">6</span>      <span class="code-keyword">if</span> (map.<span class="code-function">has</span>(complement)) {</div>
          <div><span class="code-line-number">7</span>        <span class="code-keyword">return</span> [map.<span class="code-function">get</span>(complement), i];</div>
          <div><span class="code-line-number">8</span>      }</div>
          <div><span class="code-line-number">9</span>      map.<span class="code-function">set</span>(nums[i], i);</div>
          <div><span class="code-line-number">10</span>   }</div>
          <div><span class="code-line-number">11</span> }</div>
        </div>
      </div>
    </div>
  `;

  return renderPageLayout('student', content);
}

// Event delegation for practice arena
export function initPracticeArena() {
  // Tab filtering
  document.querySelectorAll('#practice-tabs .tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('#practice-tabs .tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const category = tab.dataset.category;
      document.querySelectorAll('#challenge-grid .challenge-card').forEach(card => {
        if (category === 'All' || card.dataset.category === category) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Start challenge
  document.querySelectorAll('.start-challenge-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.id);
      const challenge = store.challenges.find(c => c.id === id);
      if (!challenge) return;

      showModal(`🎯 ${challenge.title}`, `
        <div style="text-align:center;padding:var(--space-4)">
          <div style="font-size:3rem;margin-bottom:var(--space-4)">🏆</div>
          <h3 style="margin-bottom:var(--space-2)">Ready to attempt?</h3>
          <p class="text-secondary text-sm" style="margin-bottom:var(--space-4)">${challenge.description}</p>
          <div style="display:flex;justify-content:center;gap:var(--space-6);margin-bottom:var(--space-4)">
            <div>
              <div class="text-2xl font-bold text-primary">+${challenge.xp}</div>
              <div class="text-xs text-tertiary">XP Reward</div>
            </div>
            <div>
              <div class="text-2xl font-bold" style="color:var(--warning)">${challenge.time}</div>
              <div class="text-xs text-tertiary">Time Limit</div>
            </div>
          </div>
          <button class="btn btn-primary btn-lg w-full complete-challenge-btn" data-id="${id}" style="margin-top:var(--space-2)">
            Complete Challenge ✓
          </button>
          <p class="text-xs text-tertiary" style="margin-top:var(--space-3)">Click to simulate completing the challenge</p>
        </div>
      `);

      setTimeout(() => {
        const completeBtn = document.querySelector('.complete-challenge-btn');
        if (completeBtn) {
          completeBtn.addEventListener('click', () => {
            const result = store.completeChallenge(id);
            if (result) {
              document.querySelector('.modal-overlay')?.remove();
              showToast(`🎉 Challenge completed! +${result.xp} XP earned!`, 'success');
              // Re-render
              setTimeout(() => { window.location.hash = '#/student/practice'; window.dispatchEvent(new HashChangeEvent('hashchange')); }, 500);
            }
          });
        }
      }, 100);
    });
  });
}
