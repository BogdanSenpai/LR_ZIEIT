self.addEventListener("install", event => {
 console.log("Service Workers installing... ", event);
});
self.addEventListener("activate", event => {
 console.log("Activating Service Workers ", event);
 return self.clients.claim()
});
