document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.tab-panel');
  const toggleBtn = document.getElementById('dark-mode-toggle');
  const body = document.body;

  // Tab switching
  tabs.forEach(tab => {
    tab.addEventListener('click', e => {
      e.preventDefault();
      const target = tab.getAttribute('data-target');

      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      panels.forEach(panel => {
        panel.classList.remove('active');
        panel.hidden = true;
      });

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const panel = document.getElementById(target);
      panel.classList.add('active');
      panel.hidden = false;
      panel.focus();
    });
  });

  // Dark mode toggle
  toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    // Switch icon
    if(body.classList.contains('dark-mode')) {
      toggleBtn.textContent = '🔆';
    } else {
      toggleBtn.textContent = '🌙';
    }
  });
});
