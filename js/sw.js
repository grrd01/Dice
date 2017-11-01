var CACHE_NAME = 'grrds-dice-cache-v1.0';
var urlsToCache = [
    '../index.html',
    '../images/4inarow.svg',
    '../images/dice_1.svg',
    '../images/dice_1w.svg',
    '../images/dice_2.svg',
    '../images/dice_2w.svg',
    '../images/dice_3.svg',
    '../images/dice_3kind.svg',
    '../images/dice_3w.svg',
    '../images/dice_4.svg',
    '../images/dice_4kind.svg',
    '../images/dice_4w.svg',
    '../images/dice_5.svg',
    '../images/dice_5w.svg',
    '../images/dice_6.svg',
    '../images/dice_chance.svg',
    '../images/dice_full_h.svg',
    '../images/dice_lg_str.svg',
    '../images/dice_plus.svg',
    '../images/dice_sm_str.svg',
    '../images/dice_sum.svg',
    '../images/dice_yahtzee.svg',
    '../images/lock.svg',
    '../images/mail.svg',
    '../images/puzzle.svg',
    '../images/settings.png',
    '../images/title.png',
    '../images/title2.png',
    'Detector.js',
    'dice.css',
    'dice.js',
    'jquery.mobile-1.3.2.min.css',
    'jquery.mobile-1.3.2.min.js',
    'jquery-1.9.1.min.js',
    'l10n.js',
    'shake.js',
    'sw.js',
    'build/three.min.js',
    'images/ajax-loader.gif',
    'images/ajax-loader.png',
    'images/icons-18-black.png',
    'images/icons-18-white.png',
    'images/icons-36-black.png',
    'images/icons-36-white.png',
    '../loaders/MTLLoader.js',
    '../loaders/OBJLoader.js',
    '../models/dice.mtl',
    '../models/dice.obj',
    '../locales/de/dice.properties',
    '../locales/en/dice.properties',
    '../locales/fr/dice.properties',
    '../locales/nl/dice.properties',
    '../locales/rm/dice.properties',
    '../locales/locales.ini'
];

self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                // IMPORTANT: Clone the request. A request is a stream and
                // can only be consumed once. Since we are consuming this
                // once by cache and once by the browser for fetch, we need
                // to clone the response.
                var fetchRequest = event.request.clone();

                return fetch(fetchRequest).then(
                    function(response) {
                        // Check if we received a valid response
                        if(!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // IMPORTANT: Clone the response. A response is a stream
                        // and because we want the browser to consume the response
                        // as well as the cache consuming the response, we need
                        // to clone it so we have two streams.
                        var responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(function(cache) {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
    );
});