// ========================================
// 9. College Analytics Dashboard
// ========================================

import { store } from '../store.js';
import { renderPageLayout, renderStatCard } from '../components.js';

export function renderCollegeDashboard() {
  store.currentRole = 'college';
  const data = store.collegeData;

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const maxPlacement = Math.max(...data.monthlyPlacements);

  const content = `
    <div class="page-header">
      <div style="display:flex;align-items:center;gap:var(--space-4)">
        <div class="avatar avatar-xl" style="background:var(--success)">🏫</div>
        <div>
          <h1>${data.name} Analytics</h1>
          <p>Track placement performance and student skill development</p>
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="dashboard-stats">
      ${renderStatCard('🎓', 'Total Students', data.totalStudents, '+45 this year', '#EEF2FF', '#4F46E5')}
      ${renderStatCard('✅', 'Placed Students', data.placedStudents, `${data.placementRate}% rate`, '#D1FAE5', '#10B981')}
      ${renderStatCard('💰', 'Avg Package', data.avgPackage, '+12% vs last year', '#F5F3FF', '#7C3AED')}
      ${renderStatCard('🏆', 'Highest Package', data.highestPackage, 'Google (SDE-1)', '#FEF3C7', '#F59E0B')}
    </div>

    <div class="dashboard-grid">
      <div style="display:flex;flex-direction:column;gap:var(--space-6)">
        <!-- Placement Trend -->
        <div class="chart-card">
          <div class="chart-header">
            <div>
              <div class="chart-title">Monthly Placement Trend</div>
              <div class="chart-subtitle">Cumulative placements for 2025-26 batch</div>
            </div>
            <span class="badge badge-success">↑ ${data.placementRate}%</span>
          </div>
          <div class="bar-chart">
            ${data.monthlyPlacements.map((val, i) => `
              <div class="bar-chart-item">
                <div class="bar" style="height:${(val / maxPlacement * 100)}%;background:linear-gradient(to top, var(--primary), var(--accent))">
                  <div class="bar-value">${val}</div>
                </div>
                <div class="bar-label">${months[i]}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Department Performance -->
        <div class="chart-card">
          <div class="chart-header">
            <div>
              <div class="chart-title">Department-wise Performance</div>
              <div class="chart-subtitle">Student count, placements, and avg package</div>
            </div>
            <button class="btn btn-ghost btn-sm" onclick="alert('Report exported!')">📥 Export</button>
          </div>
          <div class="placement-row header">
            <div>Department</div>
            <div>Students</div>
            <div>Placed</div>
            <div>Avg XP</div>
            <div>Avg Package</div>
          </div>
          ${data.departments.map(dept => `
            <div class="placement-row">
              <div class="font-semibold">${dept.name}</div>
              <div>${dept.students}</div>
              <div>
                <span class="badge ${dept.placed / dept.students > 0.85 ? 'badge-success' : dept.placed / dept.students > 0.7 ? 'badge-warning' : 'badge-danger'}">
                  ${dept.placed} (${Math.round(dept.placed / dept.students * 100)}%)
                </span>
              </div>
              <div class="font-semibold text-primary">${dept.avgXP.toLocaleString()}</div>
              <div class="font-semibold">₹${dept.avgPackage} LPA</div>
            </div>
          `).join('')}
        </div>

        <!-- Skill Gap Analysis -->
        <div class="chart-card">
          <div class="chart-header">
            <div>
              <div class="chart-title">Skill Gap Analysis</div>
              <div class="chart-subtitle">Current student level vs industry requirement</div>
            </div>
          </div>
          ${data.skillGaps.map(sg => `
            <div class="skill-gap-item">
              <div class="skill-gap-name">${sg.skill}</div>
              <div class="skill-gap-bars">
                <div class="skill-gap-bar-row">
                  <div class="skill-gap-bar-label">Current</div>
                  <div class="skill-gap-bar">
                    <div class="skill-gap-bar-fill" style="width:${sg.current}%;background:var(--primary)"></div>
                  </div>
                  <span class="text-xs font-bold" style="min-width:30px">${sg.current}%</span>
                </div>
                <div class="skill-gap-bar-row">
                  <div class="skill-gap-bar-label">Required</div>
                  <div class="skill-gap-bar">
                    <div class="skill-gap-bar-fill" style="width:${sg.required}%;background:var(--success)"></div>
                  </div>
                  <span class="text-xs font-bold" style="min-width:30px">${sg.required}%</span>
                </div>
              </div>
              <span class="badge ${sg.current / sg.required > 0.7 ? 'badge-success' : sg.current / sg.required > 0.5 ? 'badge-warning' : 'badge-danger'}">
                ${Math.round(sg.required - sg.current)}% gap
              </span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Right Column -->
      <div style="display:flex;flex-direction:column;gap:var(--space-6)">
        <!-- Placement Rate Donut -->
        <div class="chart-card">
          <div class="chart-title" style="margin-bottom:var(--space-4)">Placement Rate</div>
          <div class="donut-chart">
            <svg width="180" height="180" viewBox="0 0 180 180">
              <circle cx="90" cy="90" r="70" fill="none" stroke="var(--border-light)" stroke-width="16" />
              <circle cx="90" cy="90" r="70" fill="none"
                stroke="url(#donutGrad)"
                stroke-width="16" stroke-linecap="round"
                stroke-dasharray="${2 * Math.PI * 70}"
                stroke-dashoffset="${2 * Math.PI * 70 * (1 - data.placementRate / 100)}"
                style="transition:stroke-dashoffset 1s ease" />
              <defs>
                <linearGradient id="donutGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style="stop-color:#4F46E5" />
                  <stop offset="100%" style="stop-color:#10B981" />
                </linearGradient>
              </defs>
            </svg>
            <div class="donut-center">
              <div class="donut-value" style="color:var(--primary)">${data.placementRate}%</div>
              <div class="donut-label">Placed</div>
            </div>
          </div>
          <div class="donut-legend">
            <div class="legend-item">
              <div class="legend-dot" style="background:var(--primary)"></div>
              Placed (${data.placedStudents})
            </div>
            <div class="legend-item">
              <div class="legend-dot" style="background:var(--border)"></div>
              Unplaced (${data.totalStudents - data.placedStudents})
            </div>
          </div>
        </div>

        <!-- Top Recruiters -->
        <div class="card">
          <h3 style="margin-bottom:var(--space-4)">🏢 Top Recruiters</h3>
          ${data.topRecruiters.map((name, i) => {
            const company = store.companies.find(c => c.name === name);
            return `
              <div style="display:flex;align-items:center;gap:var(--space-3);padding:var(--space-3) 0;${i < data.topRecruiters.length - 1 ? 'border-bottom:1px solid var(--border-light)' : ''}">
                <div class="avatar avatar-sm" style="background:${company ? company.color : '#94A3B8'}">${company ? company.initials : name[0]}</div>
                <div class="text-sm font-medium">${name}</div>
                <div class="text-xs text-tertiary" style="margin-left:auto">${Math.floor(10 + Math.random() * 20)} hires</div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Student XP Heatmap -->
        <div class="card">
          <h3 style="margin-bottom:var(--space-3)">📅 Activity Heatmap</h3>
          <p class="text-xs text-tertiary" style="margin-bottom:var(--space-3)">Student practice activity over 4 weeks</p>
          <div class="heatmap-grid">
            ${Array.from({length: 28}, () => {
              const intensity = Math.random();
              const color = intensity > 0.75 ? 'var(--primary)' : intensity > 0.5 ? 'var(--primary-light)' : intensity > 0.25 ? 'var(--primary-lighter)' : 'var(--border-light)';
              return `<div class="heatmap-cell" style="background:${color}" title="${Math.floor(intensity * 100)} activities"></div>`;
            }).join('')}
          </div>
          <div style="display:flex;align-items:center;gap:var(--space-2);margin-top:var(--space-3);justify-content:flex-end">
            <span class="text-xs text-tertiary">Less</span>
            <div class="heatmap-cell" style="background:var(--border-light);width:12px;height:12px;border-radius:2px"></div>
            <div class="heatmap-cell" style="background:var(--primary-lighter);width:12px;height:12px;border-radius:2px"></div>
            <div class="heatmap-cell" style="background:var(--primary-light);width:12px;height:12px;border-radius:2px"></div>
            <div class="heatmap-cell" style="background:var(--primary);width:12px;height:12px;border-radius:2px"></div>
            <span class="text-xs text-tertiary">More</span>
          </div>
        </div>

        <!-- Export -->
        <button class="btn btn-primary w-full" onclick="alert('Full report downloaded!')">
          📊 Download Full Report
        </button>
      </div>
    </div>
  `;

  return renderPageLayout('college', content);
}
