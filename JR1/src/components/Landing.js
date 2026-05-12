export const renderLanding = (navigate) => {
  const container = document.createElement('div');
  container.className = 'landing-container fade-in';
  
  container.innerHTML = `
    <div class="landing-header">
      <h1>JOB READY</h1>
      <p>Your 360° Career Ecosystem</p>
    </div>
    
    <div class="options-grid">
      <div class="option-card" id="card-student">
        <div class="icon-wrapper">
          <i data-feather="book-open"></i>
        </div>
        <h2>Student</h2>
        <p>Learn, connect, and build your career portfolio.</p>
        <button class="btn btn-primary">Enter as Student</button>
      </div>
      
      <div class="option-card">
        <div class="icon-wrapper green">
          <i data-feather="briefcase"></i>
        </div>
        <h2>Company</h2>
        <p>Hire top talent and manage job postings.</p>
        <button class="btn btn-outline">Enter as Company</button>
      </div>
      
      <div class="option-card">
        <div class="icon-wrapper purple">
          <i data-feather="award"></i>
        </div>
        <h2>College</h2>
        <p>Track student progress and improve placements.</p>
        <button class="btn btn-outline">Enter as College</button>
      </div>
    </div>
  `;
  
  const studentCard = container.querySelector('#card-student');
  studentCard.addEventListener('click', () => {
    navigate('connect-hub');
  });
  
  return container;
};
