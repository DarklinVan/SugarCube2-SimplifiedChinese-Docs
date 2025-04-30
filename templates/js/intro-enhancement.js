/*
	PAGE ENHANCEMENT
*/
/* globals SCDocs */
(() => {
	'use strict';

	if (!('SCDocs' in window)) {
		return;
	}

	// Restore user settings.
	const codeColor = SCDocs.getConfig('codeColor');

	if (codeColor === 'inherit') {
		document.documentElement.classList.add('disable-code-color');
	}

	// Outline patching.
	const outlineStyleEl = document.createElement('style');
	outlineStyleEl.setAttribute('id', 'style-aria-outlines');
	outlineStyleEl.setAttribute('type', 'text/css');
	document.head.appendChild(outlineStyleEl);
	outlineStyleEl.textContent = '*:focus{outline:none;}';
	let outlineLastEvent = 'mousedown';
	const outlineToggleFn = ev => {
		if (ev.type !== outlineLastEvent) {
			outlineLastEvent = ev.type;

			if (ev.type === 'keydown') {
				outlineStyleEl.textContent = '';
			}
			else {
				outlineStyleEl.textContent = '*:focus{outline:none;}';
			}
		}
	};
	document.addEventListener('keydown', outlineToggleFn);
	document.addEventListener('mousedown', outlineToggleFn);
})();
