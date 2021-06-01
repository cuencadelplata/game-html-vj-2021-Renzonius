const CACHE_NAME = 'offline';
const OFFLINE_URL = 'offline.html';

const recursosParaCachear = [
  '/',
  'index.html',
  'css/horde.css',
  'font/MedievalSharp.ttf',
  'img/iconos/chrome-extensionmanagementpage-48-48.png',
  'img/iconos/chrome-favicon-16-16.png',
  'img/iconos/chrome-installprocess-128-128.png',
  'img/frame_background.png',
  'img/sheet_arena.png',
  'img/sheet_beholder.png',
  'img/sheet_characters.png',
  'img/sheet_objects.png',
  'img/sheet_ui.png',
  'sound/effects/bat_damage.mp3',
  'sound/effects/bat_dies.mp3',
  'sound/effects/beholder_damage.mp3',
  'sound/effects/beholder_dies.mp3',
  'sound/effects/char_attacks_fire.mp3',
  'sound/effects/char_attacks.mp3',
  'sound/effects/char_damage_3.mp3',
  'sound/effects/char_dies.mp3',
  'sound/effects/code_entered.mp3',
  'sound/effects/coins.mp3',
  'sound/effects/cube_attacks.mp3',
  'sound/effects/cube_damage.mp3',
  'sound/effects/cube_dies.mp3',
  'sound/effects/cyclops_attacks.mp3',
  'sound/effects/cyclops_damage.mp3',
  'sound/effects/cyclops_dies.mp3',
  'sound/effects/demoblin_attacks.mp3',
  'sound/effects/dopp_dies.mp3',
  'sound/effects/dragon_attacks.mp3',
  'sound/effects/dragon_damage.mp3',
  'sound/effects/dragon_dies.mp3',
  'sound/effects/eat_food.mp3',
  'sound/effects/eyelet_damage.mp3',
  'sound/effects/eyelet_dies.mp3',
  'sound/effects/gate_closes.mp3',
  'sound/effects/gate_opens.mp3',
  'sound/effects/gel_damage.mp3',
  'sound/effects/gel_dies.mp3',
  'sound/effects/goblin_attacks.mp3',
  'sound/effects/goblin_damage.mp3',
  'sound/effects/goblin_dies.mp3',
  'sound/effects/immunity.mp3',
  'sound/effects/imp_damage.mp3',
  'sound/effects/imp_dies.mp3',
  'sound/effects/minotaur_attacks.mp3',
  'sound/effects/minotaur_damage.mp3',
  'sound/effects/minotaur_dies.mp3',
  'sound/effects/move_pointer.mp3',
  'sound/effects/owlbear_alarm.mp3',
  'sound/effects/owlbear_attacks.mp3',
  'sound/effects/owlbear_damage.mp3',
  'sound/effects/owlbear_dies.mp3',
  'sound/effects/pause.mp3',
  'sound/effects/pickup_weapon.mp3',
  'sound/effects/sandworm_attacks.mp3',
  'sound/effects/sandworm_dies.mp3',
  'sound/effects/select_pointer.mp3',
  'sound/effects/skull_damage.mp3',
  'sound/effects/skull_dies.mp3',
  'sound/effects/spike_attacks.mp3',
  'sound/effects/unpause.mp3',
  'sound/effects/weapon_wall.mp3',
  'sound/effects/wizard_attacks.mp3',
  'sound/effects/wizard_disappear.mp3',
  'sound/effects/wizard_reappear.mp3',
  'sound/music/final_battle.mp3',
  'sound/music/normal_battle.mp3',
  'sound/music/victory.mp3',
  'horde.js',
  'manifest.json',
  'script.js'
];

// self.addEventListener('install', function(event) {
//   console.log('[ServiceWorker] Install');
  
//   event.waitUntil((async () => {
//     const cache = await caches.open(CACHE_NAME);
//     // Setting {cache: 'reload'} in the new request will ensure that the response
//     // isn't fulfilled from the HTTP cache; i.e., it will be from the network.
//     await cache.add(new Request(OFFLINE_URL, {cache: 'reload'}));
//   })());
  
//   self.skipWaiting();
// });

self.addEventListener('install', (event) => {
  console.log('[Service Worker] Install');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
          console.log('[Servicio Worker] Almacena todo en caché: contenido e intérprete de la aplicación');
      return cache.addAll(recursosParaCachear);
    })
  );
});

self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activate');
  event.waitUntil((async () => {
    // Enable navigation preload if it's supported.
    // See https://developers.google.com/web/updates/2017/02/navigation-preload
    if ('navigationPreload' in self.registration) {
      await self.registration.navigationPreload.enable();
    }
  })());

  // Tell the active service worker to take control of the page immediately.
  self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  // console.log('[Service Worker] Fetch', event.request.url);
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const preloadResponse = await event.preloadResponse;
        if (preloadResponse) {
          return preloadResponse;
        }

        const networkResponse = await fetch(event.request);
        return networkResponse;
      } catch (error) {
        console.log('[Service Worker] Fetch failed; returning offline page instead.', error);

        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(OFFLINE_URL);
        return cachedResponse;
      }
    })());
  }
});