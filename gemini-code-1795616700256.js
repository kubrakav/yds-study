const V = "yds-calisma-v2";
const FILES = [
  "./",
  "./index.html",
  "./data.json",
  "./fb.js",
  "./content.js",
  "./grammar.js",
  "./extra2.js",
  "./reading2.js",
  "./reading3a.js",
  "./reading3b.js",
  "./extra3a.js",
  "./extra3b.js",
  "./extra3c.js",
  "./extra4.js",
  "./extra5.js",
  "./avatar.png",
  "./manifest.webmanifest"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(V)
      .then(c => c.addAll(FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    fetch(e.request)
      .then(r => {
        if (r && r.status === 200) {
          const c = r.clone();
          caches.open(V).then(x => x.put(e.request, c));
        }
        return r;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true }).then(r => r || caches.match("./index.html")))
  );
});