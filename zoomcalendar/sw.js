self.addEventListener('fetch', async (event) => {
	if (event.request.mode === 'navigate') {
		return event.respondWith(
			fetch(event.request).catch(
				() => new Response('Check your connection')
			)
		);
	}
});
