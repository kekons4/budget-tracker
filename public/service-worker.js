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