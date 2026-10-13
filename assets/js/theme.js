(function () {
  'use strict';
  var dark = false;
  try { dark = localStorage.getItem('site-theme') === 'dark'; } catch (_) {}
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  document.addEventListener('DOMContentLoaded', function () {
    var button = document.querySelector('.theme-toggle');
    if (!button) return;
    function render() {
      document.documentElement.dataset.theme = dark ? 'dark' : 'light';
      button.setAttribute('aria-pressed', String(dark));
      var label = dark ? 'Switch to light mode' : 'Switch to dark mode';
      button.setAttribute('aria-label', label);
      button.title = label;
      button.querySelector('span').textContent = dark ? '☀' : '☾';
      var meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.content = dark ? '#171b22' : '#ffffff';
    }
    button.addEventListener('click', function () {
      dark = !dark;
      try { localStorage.setItem('site-theme', dark ? 'dark' : 'light'); } catch (_) {}
      render();
    });
    render();
  });
})();
