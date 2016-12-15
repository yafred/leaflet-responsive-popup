L.ResponsivePopup = L.Popup.extend({
		
	options: {
		// min distance between an edge of the popup and a border of the map
		mapPadding: 10
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
		
		console.log(this.options.mapPadding);
		var map = this._map,
            container = this._container,
		    pos = this._map.latLngToLayerPoint(this._latlng),
	        centerPoint = map.latLngToContainerPoint(map.getCenter()),
	        tooltipPoint = map.layerPointToContainerPoint(pos),
	        tooltipWidth = container.offsetWidth,
	        tooltipHeight = container.offsetHeight,
	        direction = this.options.direction,   // do we need to pull this from posQuadrant ?
	        offset = L.point(this.options.offset), // needs support
	        anchor = this._getAnchor();  // needs support
	    
		// which quadrant
		var posQuadrant = "";
		
		if(tooltipPoint.y < centerPoint.y) {
			posQuadrant = "n";
		}
		else {
			posQuadrant = "s";
		}
		
		if(tooltipPoint.x < centerPoint.x) {
			posQuadrant += "w";
		}
		else {
			posQuadrant += "e";
		}
		
		// can the popup fit ? (roughly)
		var canGoAbove = true;
		var canGoSideway = true;
		if(tooltipHeight > centerPoint.y) { 
			canGoAbove = false;
		}
		if(tooltipWidth > centerPoint.x) { 
			canGoSideway = false;
		}
		
		if(canGoAbove) {
			var subtractX = tooltipWidth / 2;
			if(tooltipPoint.x - subtractX < this.options.mapPadding) { // left overflow
				subtractX = tooltipPoint.x - this.options.mapPadding;
			}
			if(tooltipPoint.x + tooltipWidth / 2 > 2*centerPoint.x - this.options.mapPadding) { // right overflow
				subtractX = tooltipWidth - 2*centerPoint.x + tooltipPoint.x + this.options.mapPadding;
			}
			if(/s/.test(posQuadrant)) {
				pos = pos.subtract(L.point(subtractX, tooltipHeight + Math.abs(offset.y), true));
			}
			else {
				pos = pos.subtract(L.point(subtractX, -Math.abs(offset.y), true));
			}
		}
		else if(canGoSideway) {
			var subtractY = tooltipHeight / 2;
			if(tooltipPoint.y - subtractY < this.options.mapPadding) { // top overflow
				subtractY = tooltipPoint.y - this.options.mapPadding;
			}		
			if(tooltipPoint.y + tooltipHeight / 2 > 2*centerPoint.y - this.options.mapPadding) { // bottom overflow
				subtractY = tooltipHeight - 2*centerPoint.y + tooltipPoint.y + this.options.mapPadding;
			}			
			if(/w/.test(posQuadrant)) {
				pos = pos.subtract(L.point(-Math.abs(offset.x), subtractY, true));
			}
			else {
				pos = pos.subtract(L.point(tooltipWidth + Math.abs(offset.x), subtractY, true));
			}
		}
		
		L.DomUtil.setPosition(this._container, pos);
	}
	
});


//Instantiates a `ResponsivePopup` object given an optional `options` object that describes its appearance and location and an optional `source` object that is used to tag the popup with a reference to the Layer to which it refers.
L.responsivePopup = function (options, source) {
	return new L.ResponsivePopup(options, source);
};
