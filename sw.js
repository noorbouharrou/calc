self.addEventListener("install", async (e) => {
    console.log("Caching resources..");
    e.waitUntil(
        caches.open("static").then(async (cache) => {
            try {
                await cache.addAll([
                    "/", // root path instead of "./"
                    "/src/manifest.json",
                    "/src/images/logo192.png"
                ]);
                console.log("Resources cached successfully. Done");
            } catch (error) {
                console.error("Caching failed:", error);
            }
        })
    );
});

self.addEventListener("fetch", (e) => {
    console.log('Intercepting fetch request for:', e.request.url);
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request).catch((error) => {
                console.error('Fetch failed:', error);
                return new Response("Service Unavailable", { status: 503 });
            });
        })
    );
});

