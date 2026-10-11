(function () {
  'use strict';

  if (typeof HTMLDialogElement === 'undefined' || !HTMLDialogElement.prototype.showModal) return;

  var activeDialog = null;
  var trigger = null;
  var previousOverflow = '';

  document.querySelectorAll('.pub-details').forEach(function (link) {
    var dialog = document.getElementById('publication-dialog-' + link.dataset.publicationId);
    if (!dialog) return;
    link.setAttribute('aria-haspopup', 'dialog');
    link.setAttribute('aria-controls', dialog.id);
    link.addEventListener('click', function (event) {
      event.preventDefault();
      if (activeDialog) return;
      trigger = link;
      previousOverflow = document.body.style.overflow;
      activeDialog = dialog;
      dialog.showModal();
      document.body.style.overflow = 'hidden';
      dialog.querySelector('.publication-dialog__body').scrollTop = 0;
    });
  });

  document.querySelectorAll('.publication-dialog').forEach(function (dialog) {
    dialog.querySelectorAll('[data-publication-close]').forEach(function (button) {
      button.addEventListener('click', function () { dialog.close(); });
    });
    // Only a click that starts and ends on the backdrop closes the drawer.
    var backdropStart = false;
    dialog.addEventListener('pointerdown', function (event) {
      backdropStart = event.target === dialog && outsideDialog(event, dialog);
    });
    dialog.addEventListener('click', function (event) {
      if (backdropStart && event.target === dialog && outsideDialog(event, dialog)) dialog.close();
      backdropStart = false;
    });
    dialog.addEventListener('close', function () {
      if (activeDialog !== dialog) return;
      document.body.style.overflow = previousOverflow;
      activeDialog = null;
      if (trigger && trigger.isConnected) trigger.focus({ preventScroll: true });
      trigger = null;
    });
  });

  function outsideDialog(event, dialog) {
    var rect = dialog.getBoundingClientRect();
    return event.clientX < rect.left || event.clientX > rect.right ||
      event.clientY < rect.top || event.clientY > rect.bottom;
  }
})();
