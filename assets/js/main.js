/*
	Future Imperfect by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function() {
	var body = document.body;
	var menu = document.getElementById('menu');
	var sidebar = document.getElementById('sidebar');
	var main = document.getElementById('main');
	var search = document.getElementById('search');
	var touchStartX = null;
	var touchStartY = null;

	breakpoints({
		xlarge: ['1281px', '1680px'],
		large: ['981px', '1280px'],
		medium: ['737px', '980px'],
		small: ['481px', '736px'],
		xsmall: [null, '480px']
	});

	function hideMenu(event) {
		if (!body.classList.contains('is-menu-visible'))
			return;

		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}

		body.classList.remove('is-menu-visible');

		window.setTimeout(function() {
			menu.scrollTop = 0;
			menu.querySelectorAll('form').forEach(function(form) {
				form.reset();
			});
		}, 500);
	}

	window.addEventListener('load', function() {
		window.setTimeout(function() {
			body.classList.remove('is-preload');
		}, 100);

		document.querySelectorAll('article.post .image img').forEach(function(img) {
			if (!img.getAttribute('loading'))
				img.setAttribute('loading', 'lazy');

			if (!img.getAttribute('decoding'))
				img.setAttribute('decoding', 'async');
		});
	});

	if (menu) {
		body.appendChild(menu);
		menu.style.msOverflowStyle = '-ms-autohiding-scrollbar';
		menu.style.webkitOverflowScrolling = 'touch';

		menu.addEventListener('click', function(event) {
			var anchor = event.target.closest('a');
			if (!anchor || !menu.contains(anchor))
				return;

			var href = anchor.getAttribute('href');
			var target = anchor.getAttribute('target');
			if (!href || href === '#' || href === '' || href === '#menu')
				return;

			event.preventDefault();
			event.stopPropagation();
			hideMenu();

			window.setTimeout(function() {
				if (target === '_blank')
					window.open(href);
				else
					window.location.href = href;
			}, 510);
		});

		menu.addEventListener('touchstart', function(event) {
			if (!event.touches || !event.touches.length)
				return;
			touchStartX = event.touches[0].pageX;
			touchStartY = event.touches[0].pageY;
		}, { passive: true });

		menu.addEventListener('touchmove', function(event) {
			if (touchStartX === null || touchStartY === null || !event.touches || !event.touches.length)
				return;

			var diffX = touchStartX - event.touches[0].pageX;
			var diffY = touchStartY - event.touches[0].pageY;
			var canSwipeHide = (diffY < 20 && diffY > -20) && (diffX < -50);
			if (canSwipeHide) {
				touchStartX = null;
				touchStartY = null;
				hideMenu();
			}
		}, { passive: true });

		['click', 'touchend', 'touchstart', 'touchmove'].forEach(function(type) {
			menu.addEventListener(type, function(event) {
				event.stopPropagation();
			});
		});

		body.addEventListener('click', function(event) {
			var anchor = event.target.closest('a[href="#menu"]');
			if (anchor) {
				event.preventDefault();
				event.stopPropagation();
				body.classList.toggle('is-menu-visible');
				return;
			}
			hideMenu(event);
		});

		body.addEventListener('touchend', function(event) {
			hideMenu(event);
		});

		window.addEventListener('keydown', function(event) {
			if (event.key === 'Escape')
				hideMenu();
		});
	}

	if (search) {
		var searchInput = search.querySelector('input');

		body.addEventListener('click', function(event) {
			var trigger = event.target.closest('[href="#search"]');
			if (!trigger)
				return;

			event.preventDefault();
			if (!search.classList.contains('visible')) {
				search.reset();
				search.classList.add('visible');
				if (searchInput)
					searchInput.focus();
			}
		});

		if (searchInput) {
			searchInput.addEventListener('keydown', function(event) {
				if (event.key === 'Escape')
					searchInput.blur();
			});

			searchInput.addEventListener('blur', function() {
				window.setTimeout(function() {
					search.classList.remove('visible');
				}, 100);
			});
		}
	}

	if (sidebar && main) {
		var intro = document.getElementById('intro');
		if (intro) {
			breakpoints.on('<=large', function() {
				main.insertBefore(intro, main.firstChild);
			});

			breakpoints.on('>large', function() {
				sidebar.insertBefore(intro, sidebar.firstChild);
			});
		}
	}
})();