const divInstall = document.getElementById('installContainer');
const butInstall = document.getElementById('butInstall');

window.addEventListener('appinstalled', (event) => {
    console.log('👍', 'appinstalled', event);
    // Clear the deferredPrompt so it can be garbage collected
    window.deferredPrompt = null;
});

  /**
   * Warn the page must be served over HTTPS
   * The `beforeinstallprompt` event won't fire if the page is served over HTTP.
   * Installability requires a service worker with a fetch event handler, and
   * if the page isn't served over HTTPS, the service worker won't load.
   */

// Redireccionaminto de la URL en caso de no ser "HTTPS" (ServiceWorcker solo se registra en HTTPS)
// if (window.location.protocol === 'http:') {
//     const requireHTTPS = document.getElementById('requireHTTPS');
//     const link = requireHTTPS.querySelector('a');
//     link.href = window.location.href.replace('http://', 'https://');
//     requireHTTPS.classList.remove('hidden');
// }

window.addEventListener('beforeinstallprompt', (event) => {
    console.log('👍', 'beforeinstallprompt', event);
    // Stash the event so it can be triggered later.
    window.deferredPrompt = event;
    // Remove the 'hidden' class from the install button container
    divInstall.classList.toggle('hidden', false);
});

butInstall.addEventListener('click', async () => {
    console.log('👍', 'butInstall-clicked');
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      // The deferred prompt isn't available.
      return;
    }
    // Show the install prompt.
    promptEvent.prompt();
    // Log the result
    const result = await promptEvent.userChoice;
    console.log('👍', 'userChoice', result);
    // Reset the deferred prompt variable, since
    // prompt() can only be called once.
    window.deferredPrompt = null;
    // Hide the install button.
    divInstall.classList.toggle('hidden', true);
});

window.addEventListener('appinstalled', (event) => {
    console.log('👍', 'appinstalled', event);
    // Clear the deferredPrompt so it can be garbage collected
    window.deferredPrompt = null;
});

// ->Registro del Service Worcker<-
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
}