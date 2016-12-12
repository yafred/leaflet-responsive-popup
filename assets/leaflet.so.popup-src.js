L.ResponsivePopup = L.Popup.extend({
	
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
		
		// position upper left corner of the popup before offsetting
		var pos = this._map.latLngToLayerPoint(this._latlng),
		    offset = L.point(this.options.offset),
		    anchor = this._getAnchor();

		if (this._zoomAnimated) {
			L.DomUtil.setPosition(this._container, pos.add(anchor));
		} else {
			offset = offset.add(pos).add(anchor);
		}

		// what is the position before offsetting ?
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
		
		// can the popup fit ?
		var canGoAbove = true;
		var canGoSideway = true;
		if(this._container.offsetHeight > Math.round(mapSize.y/2)) { // There are more parameters to take into account
			canGoAbove = false;
		}
		if(this._containerWidth > Math.round(mapSize.x/2)) { // There are more parameters to take into account
			canGoSideway = false;
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
		
		if(!canGoAbove && canGoSideway) { // let's change the position
			left = this._containerLeft = 20; // margin
			if(/e/.test(posQuadrant)) {
				left = this._containerLeft = -this._containerWidth - 20; // margin
			}
			
			bottom = this._containerBottom = -Math.round(this._container.offsetHeight / 2) -offset.y -20; // margin
			if(/n/.test(posQuadrant) && pos.y - Math.round(this._container.offsetHeight / 2) < fenceWidth ) {
				bottom = this._containerBottom = -this._container.offsetHeight + pos.y - 20 - fenceWidth; // margin
			}
			if(/s/.test(posQuadrant) && pos.y + Math.round(this._container.offsetHeight / 2) > mapSize.y - fenceWidth) {
				bottom = this._containerBottom = pos.y - mapSize.y - 20 + fenceWidth;
			}
		}
		

		// bottom position the popup in case the height of the popup changes (images loading etc)
		this._container.style.bottom = bottom + 'px';
		this._container.style.left = left + 'px';
	}
	
});


//Instantiates a `ResponsivePopup` object given an optional `options` object that describes its appearance and location and an optional `source` object that is used to tag the popup with a reference to the Layer to which it refers.
L.responsivePopup = function (options, source) {
	return new L.ResponsivePopup(options, source);
};
