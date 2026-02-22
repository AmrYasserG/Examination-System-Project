
document.addEventListener('DOMContentLoaded', () => {

  
  // var btn = document.createElement('button');
  // btn.id = 'themeToggle';
  // btn.onclick = toggleTheme;
  // btn.className = 'fixed top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full shadow-md hover:shadow-lg transition cursor-pointer card-bg z-50';
  // btn.innerHTML = '<i id="themeIcon" class="fa-solid fa-sun text-yellow-500 text-lg"></i>';
  // document.body.appendChild(btn);

 
  var savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);
});

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  var icon = document.getElementById('themeIcon');
  if (icon) {
    icon.className = theme === 'dark'
      ? 'fa-solid fa-moon text-purple-300 text-lg'
      : 'fa-solid fa-sun text-yellow-500 text-lg';
  }
}

function toggleTheme() {
  var current = document.documentElement.getAttribute('data-theme');
  var next = current === 'light' ? 'dark' : 'light';
  localStorage.setItem('theme', next); 
  applyTheme(next);
}