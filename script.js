// 1. Store and display browser info in a user-friendly way
const browserInfo = {
  userAgent: navigator.userAgent,
  platform: navigator.platform,
  language: navigator.language,
  screenWidth: window.screen.width,
  screenHeight: window.screen.height,
  cookiesEnabled: navigator.cookieEnabled,
  onlineStatus: navigator.onLine ? 'Online' : 'Offline'
};

localStorage.setItem('browserInfo', JSON.stringify(browserInfo));

const browserInfoElement = document.getElementById('browser-info');
if (browserInfoElement) {
  let browserName = 'Unknown Browser';
  const userAgent = navigator.userAgent.toLowerCase();
  
  if (userAgent.includes('chrome')) browserName = 'Google Chrome';
  else if (userAgent.includes('firefox')) browserName = 'Mozilla Firefox';
  else if (userAgent.includes('safari')) browserName = 'Apple Safari';
  else if (userAgent.includes('edge')) browserName = 'Microsoft Edge';
  else if (userAgent.includes('opera')) browserName = 'Opera';
  
  let osName = 'Unknown OS';
  if (navigator.platform.includes('Win')) osName = 'Windows';
  else if (navigator.platform.includes('Mac')) osName = 'MacOS';
  else if (navigator.platform.includes('Linux')) osName = 'Linux';
  
  const languageNames = new Intl.DisplayNames(['en'], { type: 'language' });
  const displayLanguage = languageNames.of(navigator.language) || navigator.language;
  
  browserInfoElement.innerHTML = `
    <div class="browser-info-container">
      <h4>Your Browser Information</h4>
      <ul>
        <li><strong>Browser:</strong> ${browserName}</li>
        <li><strong>Operating System:</strong> ${osName}</li>
        <li><strong>Language:</strong> ${displayLanguage}</li>
        <li><strong>Screen Resolution:</strong> ${window.screen.width} × ${window.screen.height}</li>
        <li><strong>Cookies:</strong> ${navigator.cookieEnabled ? 'Enabled' : 'Disabled'}</li>
        <li><strong>Status:</strong> ${navigator.onLine ? 'Online' : 'Offline'}</li>
      </ul>
    </div>
  `;
}

// 2. Load comments
fetch('https://jsonplaceholder.typicode.com/posts/5/comments')
  .then(res => res.json())
  .then(comments => {
    const list = document.getElementById('commentList');
    comments.forEach(c => {
      const li = document.createElement('li');
      li.textContent = `${c.name}: ${c.body}`;
      list.appendChild(li);
    });
  });

// 3. Modal after 60 seconds
setTimeout(() => {
  document.getElementById('feedbackModal')?.classList.remove('hidden');
}, 60000);

// 4. Theme management with time-based auto-switching
function setThemeBasedOnTime() {
  const now = new Date();
  const currentHour = now.getHours();
  const isDayTime = currentHour >= 7 && currentHour < 21;
  
  if (localStorage.getItem('theme') === null) {
    if (isDayTime) {
      document.body.classList.remove('dark-theme');
    } else {
      document.body.classList.add('dark-theme');
    }
  }
}

function updateToggleButton() {
  const toggleBtn = document.getElementById('themeToggle');
  if (!toggleBtn) return;
  
  const savedTheme = localStorage.getItem('theme');
  toggleBtn.classList.remove('auto-mode', 'light-mode', 'dark-mode');
  
  if (savedTheme === null) {
    toggleBtn.classList.add('auto-mode');
    toggleBtn.textContent = 'Toggle Theme (Auto)';
  } else if (savedTheme === 'light') {
    toggleBtn.classList.add('light-mode');
    toggleBtn.textContent = 'Toggle Theme (Light)';
  } else {
    toggleBtn.classList.add('dark-mode');
    toggleBtn.textContent = 'Toggle Theme (Dark)';
  }
}

// Initialize theme on load
window.addEventListener('load', () => {
  setThemeBasedOnTime();
  updateToggleButton();
  
  // Check every minute to update theme if needed
  setInterval(setThemeBasedOnTime, 60000);
});

// Theme toggle button
document.getElementById('themeToggle')?.addEventListener('click', () => {
  const hasDarkClass = document.body.classList.contains('dark-theme');
  
  if (localStorage.getItem('theme') === null) {
    localStorage.setItem('theme', 'dark');
    document.body.classList.add('dark-theme');
  } else if (localStorage.getItem('theme') === 'dark') {
    localStorage.setItem('theme', 'light');
    document.body.classList.remove('dark-theme');
  } else {
    localStorage.removeItem('theme');
    setThemeBasedOnTime();
  }
  
  updateToggleButton();
});

// Modal handling
document.addEventListener("DOMContentLoaded", function() {
  const modal = document.getElementById("feedbackModal");
  const btn = document.getElementById("openModalBtn");
  const closeBtn = document.querySelector(".close-button");

  btn.onclick = function() {
    modal.classList.remove("hidden");
  };

  closeBtn.onclick = function() {
    modal.classList.add("hidden");
  };

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.classList.add("hidden");
    }
  };
});