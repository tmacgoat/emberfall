// Emberfall service worker: network-first so updates show up, cache fallback for offline play.
const CACHE = 'emberfall-v2';
const FILES = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png',
  './art/camp_scene.webp',
  './art/camp_scene_s.webp',
  './art/map_bridge.webp',
  './art/map_camp.webp',
  './art/map_chapel.webp',
  './art/map_crypt.webp',
  './art/map_road.webp',
  './art/p_acolyte.webp',
  './art/p_archer.webp',
  './art/p_brannoc.webp',
  './art/p_cutter.webp',
  './art/p_grath.webp',
  './art/p_hollowed.webp',
  './art/p_hound.webp',
  './art/p_ilsa.webp',
  './art/p_isolde.webp',
  './art/p_king.webp',
  './art/p_maren.webp',
  './art/p_skarn.webp',
  './art/p_wren.webp',
  './art/t_acolyte.webp',
  './art/t_archer.webp',
  './art/t_brannoc.webp',
  './art/t_cutter.webp',
  './art/t_grath.webp',
  './art/t_hollowed.webp',
  './art/t_hound.webp',
  './art/t_ilsa.webp',
  './art/t_ilsa_npc.webp',
  './art/t_isolde.webp',
  './art/t_king.webp',
  './art/t_maren.webp',
  './art/t_skarn.webp',
  './art/t_wren.webp',
  './art/title_bg.webp',
  './art/title_bg_s.webp'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).catch(() => {})); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(fetch(e.request).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {}); return r; })
    .catch(() => caches.match(e.request).then(r => r || caches.match('./index.html'))));
});
