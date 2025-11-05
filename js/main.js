$(document).ready(function() {
	// Helper to create a gr-item HTML string
	function createGrItem(item) {
		return `
			<div class="gr-item">
				<h3 class="words">${item.words}</h3>
				<p class="phonetics">${item.phonetics}</p>
				<hr>
				<p class="translations">${item.translation}</p>
			</div>
		`;
	}

		// Shuffle array and limit to n items
		function shuffleAndLimit(arr, n) {
			const a = arr.slice();
			for (let i = a.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[a[i], a[j]] = [a[j], a[i]];
			}
			return a.slice(0, n);
		}

		Promise.all([
			fetch('data/01_first_person_singular.json').then(res => res.json()),
			fetch('data/02_first_person_plural.json').then(res => res.json())
		]).then(([singular, plural]) => {
			// Randomize and limit to 12
			const singularLimited = shuffleAndLimit(singular, 12);
			const pluralLimited = shuffleAndLimit(plural, 12);

			// Render singular
			const singularHtml = singularLimited.map(createGrItem).join('');
			$('.first-person-singular .gr-sub-container').html(singularHtml);

			// Render plural
			const pluralHtml = pluralLimited.map(createGrItem).join('');
			$('.first-person-plural .gr-sub-container').html(pluralHtml);
		}).catch(err => {
			console.error('Error loading JSON:', err);
		});
});