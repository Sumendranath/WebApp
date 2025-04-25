
// This is a simple Service Worker script

// Install event
self.addEventListener('install', (event) => {
  console.log('Service Worker installed.');
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('Service Worker activated.');
  // You can add cache management code here.
});

// Fetch event - it allows caching and fetching data from the network
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});
