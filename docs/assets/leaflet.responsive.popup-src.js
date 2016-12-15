L.ResponsivePopup = L.Popup.extend({
	
	/**
	 * Big issues:
	 * - Position is wrong if map has been moved
	 * - Position is wrong if zoomAnimation: false
	 * 
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
		
		// can the popup fit ? 
		var canGoAbove = true;
		var canGoSideway = true;
		if(tooltipHeight > centerPoint.y) { 
			canGoAbove = false;
		}
		if(tooltipWidth > centerPoint.x) { 
			canGoSideway = false;
		}
		
		if(canGoAbove) {
			var offsetX = tooltipWidth / 2;
			if(tooltipPoint.x - offsetX < 0) {
				offsetX = tooltipPoint.x;
			}
			if(tooltipPoint.x + tooltipWidth / 2 > 2*centerPoint.x) {
				offsetX = tooltipWidth - 2*centerPoint.x + tooltipPoint.x;
			}
			if(/s/.test(posQuadrant)) {
				pos = pos.subtract(L.point(offsetX, tooltipHeight, true));
			}
			else {
				pos = pos.subtract(L.point(offsetX, 0, true));
			}
		}
		else if(canGoSideway) {
			var offsetY = tooltipHeight / 2;
			if(tooltipPoint.y - offsetY < 0) {
				offsetY = tooltipPoint.y;
			}		
			if(tooltipPoint.y + tooltipHeight / 2 > 2*centerPoint.y) {
				offsetY = tooltipHeight - 2*centerPoint.y + tooltipPoint.y;
			}			
			if(/w/.test(posQuadrant)) {
				pos = pos.subtract(L.point(0, offsetY, true));
			}
			else {
				pos = pos.subtract(L.point(tooltipWidth , offsetY, true));
			}
		}
		
		L.DomUtil.setPosition(this._container, pos);
	}
	
});


//Instantiates a `ResponsivePopup` object given an optional `options` object that describes its appearance and location and an optional `source` object that is used to tag the popup with a reference to the Layer to which it refers.
L.responsivePopup = function (options, source) {
	return new L.ResponsivePopup(options, source);
};
