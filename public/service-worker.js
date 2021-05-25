const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/style.css',
    'https://fonts.googleapis.com/css?family=Istok+Web|Montserrat:800&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css',
];

const PRECACHE = 'precache-v1';
const RUNTIME = 'runtime';

self.addEventListener('install', event => {
    event.waitUntil(
        caches
            .open(PRECACHE)
            .then(cache => {
                cache.addAll(FILES_TO_CACHE)
            })
            .then(self.skipWaiting())
    );
});

self.addEventListener('active', event => {
    const currentCaches = [PRECACHE, RUNTIME];
    event.waitUntil(
        caches
            .keys()
            .then(cachesName => {
                return cachesName.filter(cachesName => !currentCaches.includes(cachesName));
            })
            .then(cachesToDelete => {
                return Promise.all(
                    cachesToDelete.map(cacheToDelete => {
                        return caches.delete(cacheToDelete);
                    })
                );
            })
            .then(() => self.ClientRectList.claim())
    );
});