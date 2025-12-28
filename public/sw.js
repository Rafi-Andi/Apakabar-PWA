const cachename = 'APAKABARCACHEV3'
const urlToCache = [
  '/lives.png',
  '/manifest.json',
  '/style.css',
  '/',
  '/src/main.js',
  '/index.html',
  '/offline.html'
]

self.addEventListener('install', (event) => {
  const preCache = async () => {
    try {
      const cache = await caches.open(cachename)
      await cache.addAll(urlToCache)
      console.log('berhasill add all cache')
    } catch (error) {
      console.log('gagal add all cache', error)
    }

    return self.skipWaiting()
  }

  event.waitUntil(preCache())
})

self.addEventListener('activate', (event) => {
    const activate = async () => {
        try {
            const keys = await caches.keys()
            for(const key of keys){
                if(key !== cachename){
                    await caches.delete(key)
                }
            }
            console.log('berhasil activate')
        } catch (error) {
            console.log('gagal activate', error)
        }

        return self.clients.claim()
    }

    event.waitUntil(activate())
})

self.addEventListener('fetch', (event) => {
    if(event.request.method !== 'GET') return

    const serveRequest = async () => {
        try {
            const response = await fetch(event.request)

            return response
        } catch (error) {
            const acceptHeader = event.request.headers.get('accept') || ''
            if(acceptHeader.includes('text/html')){
                return await caches.match('/offline.html')
            }
        }
    }

    event.respondWith(serveRequest())
})
