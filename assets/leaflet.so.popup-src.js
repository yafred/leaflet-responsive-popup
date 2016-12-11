L.SoPopup = L.Popup.extend({
	
	/**
	 * Options:
	 * - Do we use tips ? (no)
	 * - How near to an edge can a popup be ? (fenceWidth)
	 */
	
	
	/**
	 * Overrides https://github.com/Leaflet/Leaflet/blob/release-1.0.2/src/layer/Popup.js#L158
	 */
	_initLayout: function () {
		
		var prefix = 'leaflet-popup',
		    container = this._container = L.DomUtil.create('div',
			prefix + ' ' + (this.options.className || '') +
			' leaflet-zoom-animated');

		if (this.options.closeButton) {
			var closeButton = this._closeButton = L.DomUtil.create('a', prefix + '-close-button', container);
			closeButton.href = '#close';
			closeButton.innerHTML = '&#215;';

			L.DomEvent.on(closeButton, 'click', this._onCloseButtonClick, this);
		}

		var wrapper = this._wrapper = L.DomUtil.create('div', prefix + '-content-wrapper', container);
		this._contentNode = L.DomUtil.create('div', prefix + '-content', wrapper);

		L.DomEvent
			.disableClickPropagation(wrapper)
			.disableScrollPropagation(this._contentNode)
			.on(wrapper, 'contextmenu', L.DomEvent.stopPropagation);

		/* No tip
		this._tipContainer = L.DomUtil.create('div', prefix + '-tip-container', container);
		this._tip = L.DomUtil.create('div', prefix + '-tip', this._tipContainer);
		*/
	},
	
	
	
	/**
	 * Overrides https://github.com/Leaflet/Leaflet/blob/release-1.0.2/src/layer/DivOverlay.js#L172
	 */
	_updatePosition: function () {
		if (!this._map) { return; }
		
		// position upper left corner of the popup
		var pos = this._map.latLngToLayerPoint(this._latlng),
		    offset = L.point(this.options.offset),
		    anchor = this._getAnchor();

		if (this._zoomAnimated) {
			L.DomUtil.setPosition(this._container, pos.add(anchor));
		} else {
			offset = offset.add(pos).add(anchor);
		}

		// context
		var mapSize = this._map.getSize();
		var posQuadrant = "";
		
		if(pos.y < Math.round(mapSize.y / 2)) {
			posQuadrant = "n";
		}
		else {
			posQuadrant = "s";
		}
		
		if(pos.x < Math.round(mapSize.x / 2)) {
			posQuadrant += "w";
		}
		else {
			posQuadrant += "e";
		}
		
		// offset the popup in a way it will be visible without moving the map
		var fenceWidth = 10;
		var bottom = this._containerBottom = -offset.y;
		if(/n/.test(posQuadrant)) {
			bottom = this._containerBottom = -this._container.offsetHeight -offset.y -20 -5; // leaflet-popup margin-bottom: 20px
		}
		
		var left = this._containerLeft = -Math.round(this._containerWidth / 2) + offset.x;
		if(/w/.test(posQuadrant) && pos.x + left < fenceWidth) { // left from the fence
			left = this._containerLeft = fenceWidth - pos.x;
		}

		if(/e/.test(posQuadrant) && (pos.x + Math.round(this._containerWidth/2) + fenceWidth) > mapSize.x) { // right from the fence
			left = this._containerLeft = (mapSize.x - pos.x) - this._containerWidth - fenceWidth;
		}


		// bottom position the popup in case the height of the popup changes (images loading etc)
		this._container.style.bottom = bottom + 'px';
		this._container.style.left = left + 'px';
	}
	
});


//Instantiates a `SoPopup` object given an optional `options` object that describes its appearance and location and an optional `source` object that is used to tag the popup with a reference to the Layer to which it refers.
L.soPopup = function (options, source) {
	return new L.SoPopup(options, source);
};
