import { renderLanding } from './src/components/Landing.js';
import { renderConnectHub } from './src/components/ConnectHub.js';

const navigate = (route) => {
  const app = document.getElementById('app');
  app.innerHTML = '';
  
  if (route === 'landing') {
    app.appendChild(renderLanding(navigate));
  } else if (route === 'connect-hub') {
    app.appendChild(renderConnectHub(navigate));
  }
  
  setTimeout(() => {
    if (window.feather) {
      window.feather.replace();
    }
  }, 0);
};

document.addEventListener('DOMContentLoaded', () => {
  navigate('landing');
});
