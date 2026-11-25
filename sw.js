/* YDS Çalışma · çevrim dışı çalışma için önbellek. Veri toplamaz. */
const V="yds-calisma-v1";
const FILES=["./","./index.html","./data.json","./fb.js","./content.js","./grammar.js","./extra2.js","./reading2.js","./reading3a.js","./reading3b.js","./extra3a.js","./extra3b.js","./extra3c.js","./extra4.js","./extra5.js","./manifest.webmanifest","./icons/icon-192.png","./icons/icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
/* Önce ağ (güncel sürüm), ağ yoksa önbellek */
self.addEventListener("fetch",e=>{if(e.request.method!=="GET"||new URL(e.request.url).origin!==location.origin)return;
  e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(V).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match("./index.html"))))});
