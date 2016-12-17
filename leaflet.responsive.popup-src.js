L.ResponsivePopup = L.Popup.extend({
		
	options: {
		// min distance in pixels between an edge of the popup and a border of the map
		mapPadding: 10,
	},
	
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
		
		var map = this._map,
            container = this._container,
		    pos = this._map.latLngToLayerPoint(this._latlng),
	        tooltipPoint = map.layerPointToContainerPoint(pos),
	        tooltipWidth = container.offsetWidth,
	        tooltipHeight = container.offsetHeight,
	        mapSize = map.getSize(),
	        anchor = this._getAnchor(),  // popup anchor
        	offset = L.point(this.options.offset); // offset relative to anchor (option from L.DivOverlay. We only use absolute values).
		
		// Where can we fit the popup ?
		var canGoTop = true,
		    canGoBottom = true,
		    canGoLeft = true,
		    canGoRight = true;
		
		if(tooltipPoint.y + anchor.y - Math.abs(offset.y) - tooltipHeight - this.options.mapPadding < 0) {
			canGoTop = false;
		}
		if(tooltipPoint.y + anchor.y + Math.abs(offset.y) + tooltipHeight + this.options.mapPadding > mapSize.y) {
			canGoBottom = false;
		}
		if(tooltipPoint.x + anchor.x - Math.abs(offset.x) - tooltipWidth - this.options.mapPadding < 0) {
			canGoLeft = false;
		}
		if(tooltipPoint.x + anchor.x + Math.abs(offset.x) + tooltipWidth + this.options.mapPadding > mapSize.x) {
			canGoRight = false;
		}
		
		// manage overflows
		var subtractX = tooltipWidth / 2,
		    subtractY = tooltipHeight / 2;
		
		if(canGoTop || canGoBottom) {		
			if(tooltipPoint.x + anchor.x - subtractX < this.options.mapPadding) { // left overflow
				subtractX = tooltipPoint.x + anchor.x - this.options.mapPadding;
			}
			if(tooltipPoint.x + anchor.x + tooltipWidth / 2 > mapSize.x - this.options.mapPadding) { // right overflow
				subtractX = tooltipWidth - mapSize.x + tooltipPoint.x + anchor.x +this.options.mapPadding;
			}
		}	
		if(canGoLeft || canGoRight) {
			if(tooltipPoint.y + anchor.y - subtractY < this.options.mapPadding) { // top overflow
				subtractY = tooltipPoint.y + anchor.y - this.options.mapPadding;
			}		
			if(tooltipPoint.y + anchor.y + tooltipHeight / 2 > mapSize.y - this.options.mapPadding) { // bottom overflow
				subtractY = tooltipHeight - mapSize.y + tooltipPoint.y + anchor.y + this.options.mapPadding;
			}						
		}
		
		// position the popup (order of preference is: top, left, bottom, right, centerOnMap)
		if(canGoTop) {
			pos = pos.subtract(L.point(subtractX, -anchor.y + tooltipHeight + Math.abs(offset.y), true));
		}
		else if(canGoLeft) {
			pos = pos.subtract(L.point(-anchor.x + tooltipWidth + Math.abs(offset.x), subtractY, true));
		}
		else if(canGoBottom) {
			pos = pos.subtract(L.point(subtractX, -anchor.y - Math.abs(offset.y), true));
		}
		else if(canGoRight) {
			pos = pos.subtract(L.point(-anchor.x - Math.abs(offset.x), subtractY, true));
		}
		else {
			pos = this._map.latLngToLayerPoint(this._map.getCenter());
			pos = pos.subtract(L.point(tooltipWidth / 2, tooltipHeight / 2));
		}
		
		L.DomUtil.setPosition(container, pos);
		
		// if point is not visible, just hide the popup
		if(tooltipPoint.x < 0 || tooltipPoint.y < 0 || tooltipPoint.x > mapSize.x || tooltipPoint.y > mapSize.y) {
			container.style.display = 'none';
		}
	}
	
});


//Instantiates a `ResponsivePopup` object given an optional `options` object that describes its appearance and location and an optional `source` object that is used to tag the popup with a reference to the Layer to which it refers.
L.responsivePopup = function (options, source) {
	return new L.ResponsivePopup(options, source);
};
