export function lazyScroll(fetch: () => void, element: HTMLElement | null) {
	let observer: IntersectionObserver;

	if (element) {
		observer = new IntersectionObserver(
			(entries) => {
				const first = entries[0];
				if (first?.isIntersecting) {
					return fetch();
				}
			},
			// threshold is the percentage of the element that must be visible before the callback is invoked
			// rootMargin is the margin around the root (viewport, in this case) that must be visible before the callback is invoked
			{ threshold: 0.8, rootMargin: '50px' }
		);
		observer.observe(element);
	}

	return {
		disconnect() {
			if (observer) {
				observer.disconnect();
			}
		}
	};
}
