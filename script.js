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
  // Parse user agent to get browser name
  let browserName = 'Unknown Browser';
  const userAgent = navigator.userAgent.toLowerCase();
  
  if (userAgent.includes('chrome')) browserName = 'Google Chrome';
  else if (userAgent.includes('firefox')) browserName = 'Mozilla Firefox';
  else if (userAgent.includes('safari')) browserName = 'Apple Safari';
  else if (userAgent.includes('edge')) browserName = 'Microsoft Edge';
  else if (userAgent.includes('opera')) browserName = 'Opera';
  
  // Parse platform to get OS name
  let osName = 'Unknown OS';
  if (navigator.platform.includes('Win')) osName = 'Windows';
  else if (navigator.platform.includes('Mac')) osName = 'MacOS';
  else if (navigator.platform.includes('Linux')) osName = 'Linux';
  
  // Format language for display
  const languageNames = new Intl.DisplayNames(['en'], { type: 'language' });
  const displayLanguage = languageNames.of(navigator.language) || navigator.language;
  
  // Create user-friendly display
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
fetch('https://jsonplaceholder.typicode.com/posts/31/comments')
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

// 4. Theme toggle
const toggleBtn = document.getElementById('themeToggle');
toggleBtn?.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
});

// Initialize theme
window.addEventListener('load', () => {
  const hour = new Date().getHours();
  const saved = localStorage.getItem('theme');
  if (saved) {
    if (saved === 'dark') document.body.classList.add('dark-theme');
  } else if (hour < 7 || hour >= 21) {
    document.body.classList.add('dark-theme');
  }
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