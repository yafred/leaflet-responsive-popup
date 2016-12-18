L.ResponsivePopup = L.Popup.extend({
		
	options: {
		/*
		 * offset
		 * 
		 * autoPanPadding
		 * autoPanPaddingTopLeft
		 * autoPanPaddingBottomRight
		 */
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
	        basePoint = map.layerPointToContainerPoint(pos),
	        containerWidth = container.offsetWidth,
	        containerHeight = container.offsetHeight,
		    padding = L.point(this.options.autoPanPadding),
		    paddingTL = L.point(this.options.autoPanPaddingTopLeft || padding),
		    paddingBR = L.point(this.options.autoPanPaddingBottomRight || padding),
	        mapSize = map.getSize(),
	        anchor = this._getAnchor(),  // popup anchor
        	offset = L.point(this.options.offset); // offset relative to anchor (option from L.DivOverlay. We only use absolute values).
		
		// Where can we fit the popup ?
		var canGoTop = true,
		    canGoBottom = true,
		    canGoLeft = true,
		    canGoRight = true;
		
		if(basePoint.y + anchor.y - Math.abs(offset.y) - containerHeight - Math.abs(paddingTL.y) < 0) {
			canGoTop = false;
		}
		if(basePoint.y + anchor.y + Math.abs(offset.y) + containerHeight + Math.abs(paddingBR.y) > mapSize.y) {
			canGoBottom = false;
		}
		if(basePoint.x + anchor.x - Math.abs(offset.x) - containerWidth - Math.abs(paddingTL.x) < 0) {
			canGoLeft = false;
		}
		if(basePoint.x + anchor.x + Math.abs(offset.x) + containerWidth + Math.abs(paddingBR.x) > mapSize.x) {
			canGoRight = false;
		}
		
		// manage overflows
		var subtractX = containerWidth / 2,
		    subtractY = containerHeight / 2;
		
		if(canGoTop || canGoBottom) {		
			if(basePoint.x + anchor.x - subtractX < Math.abs(paddingTL.x)) { // left overflow
				subtractX = basePoint.x + anchor.x - Math.abs(paddingTL.x);
			}
			if(basePoint.x + anchor.x + containerWidth / 2 > mapSize.x - Math.abs(paddingBR.x)) { // right overflow
				subtractX = containerWidth - mapSize.x + basePoint.x + anchor.x + Math.abs(paddingBR.x);
			}
		}	
		if(canGoLeft || canGoRight) {
			if(basePoint.y + anchor.y - subtractY < Math.abs(paddingTL.y)) { // top overflow
				subtractY = basePoint.y + anchor.y - Math.abs(paddingTL.y);
			}		
			if(basePoint.y + anchor.y + containerHeight / 2 > mapSize.y - Math.abs(paddingBR.y)) { // bottom overflow
				subtractY = containerHeight - mapSize.y + basePoint.y + anchor.y + Math.abs(paddingBR.y);
			}						
		}
		
		// position the popup (order of preference is: top, left, bottom, right, centerOnMap)
		if(canGoTop) {
			pos = pos.subtract(L.point(subtractX, -anchor.y + containerHeight + Math.abs(offset.y), true));
		}
		else if(canGoLeft) {
			pos = pos.subtract(L.point(-anchor.x + containerWidth + Math.abs(offset.x), subtractY, true));
		}
		else if(canGoBottom) {
			pos = pos.subtract(L.point(subtractX, -anchor.y - Math.abs(offset.y), true));
		}
		else if(canGoRight) {
			pos = pos.subtract(L.point(-anchor.x - Math.abs(offset.x), subtractY, true));
		}
		else {
			pos = this._map.latLngToLayerPoint(this._map.getCenter());
			pos = pos.subtract(L.point(containerWidth / 2, containerHeight / 2));
		}
		
		L.DomUtil.setPosition(container, pos);
		
		// if point is not visible, just hide the popup
		if(basePoint.x < 0 || basePoint.y < 0 || basePoint.x > mapSize.x || basePoint.y > mapSize.y) {
			container.style.display = 'none';
		}
	}
	
});


//Instantiates a `ResponsivePopup` object given an optional `options` object that describes its appearance and location and an optional `source` object that is used to tag the popup with a reference to the Layer to which it refers.
L.responsivePopup = function (options, source) {
	return new L.ResponsivePopup(options, source);
};
