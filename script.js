document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.tab-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Deselect all tabs
      tabs.forEach(t => {
        t.setAttribute('aria-selected', 'false');
        t.classList.remove('active');
      });
      // Hide all panels
      panels.forEach(panel => {
        panel.hidden = true;
        panel.classList.remove('active');
      });

      // Select clicked tab
      tab.setAttribute('aria-selected', 'true');
      tab.classList.add('active');

      // Show associated panel
      const targetId = tab.getAttribute('data-target');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.hidden = false;
        targetPanel.classList.add('active');
        targetPanel.focus();
      }
    });
  });
});
