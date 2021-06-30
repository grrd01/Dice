/*
 * grrd's Dice
 * Copyright (c) 2015 Gerard Tyedmers, grrd@gmx.net
 * Licensed under the MPL License
 */

/*jslint devel: true, browser: true */ /*global  self  */

const CACHE_NAME = "grrds-dice-cache";
const CACHE_VERSION = "v2.10";
const CACHE = CACHE_NAME + "-" + CACHE_VERSION;

const urlsToCache = [
    "index.html",
    "i/4inarow.svg",
    "i/dice.png",
    "i/dice_1.svg",
    "i/dice_2.svg",
    "i/dice_3.svg",
    "i/dice_3kind.svg",
    "i/dice_4.svg",
    "i/dice_4kind.svg",
    "i/dice_5.svg",
    "i/dice_6.svg",
    "i/dice_chance.svg",
    "i/dice_full_h.svg",
    "i/dice_lg_str.svg",
    "i/dice_plus.svg",
    "i/dice_sm_str.svg",
    "i/dice_sum.svg",
    "i/dice_yahtzee.svg",
    "i/info.svg",
    "i/list.svg",
    "i/lock.svg",
    "i/mail.svg",
    "i/memo.svg",
    "i/ok.svg",
    "i/puzzle.svg",
    "i/settings.svg",
    "i/tictactoe.svg",
    "i/title.png",
    "i/title2.png",
    "i/x.svg",
    "js/Detector.js",
    "js/dice.css",
    "js/dice.js",
    "js/shake.js",
    "js/build/three.min.js",
    "js/loaders/MTLLoader.js",
    "js/loaders/OBJLoader.js",
    "models/dice.mtl",
    "models/dice.obj"
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE)
            .then(function (cache) {
                console.log("Opened cache");
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                const fetchRequest = event.request.clone();
                return fetch(fetchRequest).then(
                    function (response) {
                        // Check if we received a valid response
                        if (!response || response.status !== 200 || response.type !== "basic") {
                            return response;
                        }
                        let responseToCache = response.clone();
                        caches.open(CACHE)
                            .then(function (cache) {
                                cache.put(event.request, responseToCache);
                            });
                        return response;
                    }
                );
            })
    );
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(cacheNames.map(function (cacheName) {
                if (cacheName.indexOf(CACHE_NAME) === 0 && cacheName.indexOf(CACHE_VERSION) === -1) {
                    console.log(cacheName + " deleted");
                    return caches.delete(cacheName);
                }
            }));
        })
    );
});
