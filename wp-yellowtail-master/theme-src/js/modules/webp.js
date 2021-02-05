/* global Image: true */

export default function () {
	const rv = $.Deferred();
	const img = new Image();
	img.onload = function () { rv.resolve(); };
	img.onerror = function () { rv.reject(); };
	img.src = 'data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACyAgCdASoBAAEALmk0mk0iIiIiIgBoSygABc6zbAAA/v56QAAAAA==';
	return rv.promise();
}
