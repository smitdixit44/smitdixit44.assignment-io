const cacheName = 'v2';


 self.addEventListener('install', (e) => {
	console.log('Service Worker: Installed');
});

  self.addEventListener('activate', (e) => {
	console.log('Service Worker: Activated');

	//Remove unwanted caches
	e.waitUntil(

    caches.keys().then(cacheNames =>{

return Promise.all(
cacheNames.map(cache => {
if(cache !== cacheName){

	console.log('Service Worker: Clearing Old Cache');
	return caches.delete(cache);
}

})
	)

    })

		);
});

  //Call Fetch Event
  self.addEventListener('fetch', e=>{

console.log('Service Worker: Fetching');
e.respondWith(
fetch(e.request)
.then(res =>{
	//Make Copy/Clone of response
const resClone = res.Clone();
//Open cache
caches
.open(cacheName)
.then(cache => {

	cache.put(e.request, resClone);
});
return res;

}).catch(err => caches.match(e.request).then(res => res))
	);


  })