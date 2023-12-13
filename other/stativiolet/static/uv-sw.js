importScripts("/other/stativiolet/static/uv/uv.sw.js");

const sw = new UVServiceWorker();

self.addEventListener("fetch", (event) => event.respondWith(sw.fetch(event)));
