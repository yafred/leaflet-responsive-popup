/*
 leaflet.responsive.popup 0.6.3
 (c) 2018 https://github.com/yafred
*/

L.ResponsivePopup = L.Popup.extend({
		
	options: {
		hasTip: true
		/*
		 * Inherited from L.Popup
		 * 
		 * - offset
		 * 
		 * - autoPanPadding
		 * - autoPanPaddingTopLeft
		 * - autoPanPaddingBottomRight
		 */
	},
	
	/**
	 * Overrides https://github.com/Leaflet/Leaflet/blob/v1.3.4/src/layer/Popup.js#L176
	 * This is to add hasTip option
	 */
	_initLayout: function () {
		
		var prefix = 'leaflet-popup',
		    container = this._container = L.DomUtil.create('div',
			prefix + ' ' + (this.options.className || '') +
			' leaflet-zoom-animated');

		var wrapper = this._wrapper = L.DomUtil.create('div', prefix + '-content-wrapper', container);
		this._contentNode = L.DomUtil.create('div', prefix + '-content', wrapper);

		L.DomEvent.disableClickPropagation(wrapper);
		L.DomEvent.disableScrollPropagation(this._contentNode);
		L.DomEvent.on(wrapper, 'contextmenu', L.DomEvent.stopPropagation);

		this._tipContainer = L.DomUtil.create('div', prefix + '-tip-container', container);
  		if(!this.options.hasTip) {
  			this._tipContainer.style.visibility = 'hidden';
  		}
		this._tip = L.DomUtil.create('div', prefix + '-tip', this._tipContainer);

		if (this.options.closeButton) {
			var closeButton = this._closeButton = L.DomUtil.create('a', prefix + '-close-button', container);
			closeButton.href = '#close';
			closeButton.innerHTML = '&#215;';

			L.DomEvent.on(closeButton, 'click', this._onCloseButtonClick, this);
		}
	},
	
	
	
	/**
	 * Overrides https://github.com/Leaflet/Leaflet/blob/v1.3.4/src/layer/DivOverlay.js#L178
	 */
	_updatePosition: function () {

		if (!this._map) { return; }
		
		var pos = this._map.latLngToLayerPoint(this._latlng),
	        basePoint = this._map.layerPointToContainerPoint(pos),
	        containerWidth = this._container.offsetWidth,
	        containerHeight = this._container.offsetHeight,
		    padding = L.point(this.options.autoPanPadding),
		    paddingTL = L.point(this.options.autoPanPaddingTopLeft || padding),
		    paddingBR = L.point(this.options.autoPanPaddingBottomRight || padding),
	        mapSize = this._map.getSize(),
	        anchor = this._getAnchor(),  // popup anchor
        	offset = L.point(this.options.offset); // offset relative to anchor (option from L.DivOverlay. We only use absolute values).
  
		// Leaflet default dimensions (should not be hard coded in the future)
  		var tipHeight = 11; //px
  		var tipWidth = 22; //px
  		var containerRadius = 12; //px  
		
  		// Tweak offset to include tip dimensions 
  		var offsetX = Math.abs(offset.x);
   		var offsetY = Math.abs(offset.y);
   		if(this.options.hasTip) {
  			offsetX += tipHeight;
  			offsetY += tipHeight;  
  			
  			// clear CSS
  			L.DomUtil.removeClass(this._container, 'leaflet-resp-popup-north');		
  			L.DomUtil.removeClass(this._container, 'leaflet-resp-popup-south');		
  			L.DomUtil.removeClass(this._container, 'leaflet-resp-popup-east');		
  			L.DomUtil.removeClass(this._container, 'leaflet-resp-popup-west');		
  			L.DomUtil.removeClass(this._container, 'leaflet-resp-popup-north-east');		
  			L.DomUtil.removeClass(this._container, 'leaflet-resp-popup-north-west');		
  			L.DomUtil.removeClass(this._container, 'leaflet-resp-popup-south-east');		
  			L.DomUtil.removeClass(this._container, 'leaflet-resp-popup-south-west');		
  			L.DomUtil.removeClass(this._container, 'leaflet-resp-popup-east-north');		
  			L.DomUtil.removeClass(this._container, 'leaflet-resp-popup-east-south');		
  			L.DomUtil.removeClass(this._container, 'leaflet-resp-popup-west-north');		
  			L.DomUtil.removeClass(this._container, 'leaflet-resp-popup-west-south');
  			// this._container.style.display = 'initial'; // this does not work
  		}
		
		// Where can we fit the popup ?
		var canGoTop = true,
		    canGoBottom = true,
		    canGoLeft = true,
		    canGoRight = true,
		    containerPos = false;
		
		if(basePoint.y + anchor.y - offsetY - containerHeight - Math.abs(paddingTL.y) < 0) {
			canGoTop = false;
		}
		if(basePoint.y + anchor.y + offsetY + containerHeight + Math.abs(paddingBR.y) > mapSize.y) {
			canGoBottom = false;
		}
		if(basePoint.x + anchor.x - offsetX - containerWidth - Math.abs(paddingTL.x) < 0) {
			canGoLeft = false;
		}
		if(basePoint.x + anchor.x + offsetX + containerWidth + Math.abs(paddingBR.x) > mapSize.x) {
			canGoRight = false;
		}
		
		// manage overflows
		var subtractX = containerWidth / 2 - anchor.x,
		    subtractY = containerHeight / 2 - anchor.y;
		
		if(canGoTop || canGoBottom) {		
			var containerLeft = basePoint.x + anchor.x - (containerWidth / 2);
			var containerRight = basePoint.x + anchor.x + (containerWidth / 2);
			if(containerLeft < Math.abs(paddingTL.x)) { // left overflow
				subtractX = containerWidth / 2 - anchor.x - Math.abs(paddingTL.x) + containerLeft;
			}		
			if(containerRight > mapSize.x - Math.abs(paddingBR.x)) { // right overflow
				subtractX = containerWidth / 2 - anchor.x + containerRight - mapSize.x + Math.abs(paddingBR.x);
			}						
		}	
		if(canGoLeft || canGoRight) {
			var containerTop = basePoint.y + anchor.y - (containerHeight / 2);
			var containerBottom = basePoint.y + anchor.y + (containerHeight / 2);
			if(containerTop < Math.abs(paddingTL.y)) { // top overflow
				subtractY = containerHeight / 2 - anchor.y - Math.abs(paddingTL.y) + containerTop;
			}		
			if(containerBottom > mapSize.y - Math.abs(paddingBR.y)) { // bottom overflow
				subtractY = containerHeight / 2 - anchor.y + containerBottom - mapSize.y + Math.abs(paddingBR.y);
			}						
		}
		
		// position the popup (order of preference is: top, left, bottom, right, centerOnMap)
		if(canGoTop) {
			containerPos = pos.subtract(L.point(subtractX, -anchor.y + containerHeight + offsetY, true));
			if(this.options.hasTip) {
				if(basePoint.x + anchor.x < paddingTL.x + containerRadius + tipWidth/2) {
					containerPos.x = pos.x + anchor.x;
					L.DomUtil.addClass(this._container, 'leaflet-resp-popup-north-east');
					this._tipContainer.style.top = containerHeight + 'px';
					this._tipContainer.style.left = '0px';
				}
				else if(basePoint.x + anchor.x > mapSize.x - paddingBR.x - containerRadius - tipWidth/2) {
					containerPos.x = pos.x + anchor.x - containerWidth;
					L.DomUtil.addClass(this._container, 'leaflet-resp-popup-north-west');	
					this._tipContainer.style.top = containerHeight + 'px';
					this._tipContainer.style.left = containerWidth + 'px';
				}
				else {
					L.DomUtil.addClass(this._container, 'leaflet-resp-popup-north');										
					this._tipContainer.style.top = containerHeight + 'px';
					this._tipContainer.style.left = (pos.x + anchor.x - containerPos.x) + 'px';
				}
			}
		}
		else if(canGoLeft) {
			containerPos = pos.subtract(L.point(-anchor.x + containerWidth + offsetX, subtractY, true));
			if(this.options.hasTip) {
				if(basePoint.y + anchor.y < paddingTL.y + containerRadius + tipWidth/2) {
					containerPos.y = pos.y + anchor.y;
					L.DomUtil.addClass(this._container, 'leaflet-resp-popup-west-south');
					this._tipContainer.style.top = '0px';
					this._tipContainer.style.left = containerWidth + 'px';
				}
				else if(basePoint.y + anchor.y > mapSize.y - paddingBR.y - containerRadius - tipWidth/2) {
					containerPos.y = pos.y + anchor.y - containerHeight;
					L.DomUtil.addClass(this._container, 'leaflet-resp-popup-west-north');					
					this._tipContainer.style.top = containerHeight + 'px';
					this._tipContainer.style.left = containerWidth + 'px';
				}
				else {
					L.DomUtil.addClass(this._container, 'leaflet-resp-popup-west');										
					this._tipContainer.style.top = (pos.y + anchor.y - containerPos.y) + 'px';
					this._tipContainer.style.left = containerWidth + 'px';
				}				
			}
		}
		else if(canGoBottom) {
			containerPos = pos.subtract(L.point(subtractX, -anchor.y - offsetY, true));
			if(this.options.hasTip) {
				if(basePoint.x + anchor.x < paddingTL.x + containerRadius + tipWidth/2) {
					containerPos.x = pos.x + anchor.x;
					L.DomUtil.addClass(this._container, 'leaflet-resp-popup-south-east');
					this._tipContainer.style.top = '0px';
					this._tipContainer.style.left = '0px';
				}
				else if(basePoint.x + anchor.x > mapSize.x - paddingBR.x - containerRadius - tipWidth/2) {
					containerPos.x = pos.x + anchor.x - containerWidth;
					L.DomUtil.addClass(this._container, 'leaflet-resp-popup-south-west');					
					this._tipContainer.style.top = '0px';
					this._tipContainer.style.left = containerWidth + 'px';
				}
				else {
					L.DomUtil.addClass(this._container, 'leaflet-resp-popup-south');										
					this._tipContainer.style.top = '0px';
					this._tipContainer.style.left = (pos.x + anchor.x - containerPos.x) + 'px';
				}
			}
		}
		else if(canGoRight) {
			containerPos = pos.subtract(L.point(-anchor.x - offsetX, subtractY, true));
			if(this.options.hasTip) {
				if(basePoint.y + anchor.y < paddingTL.y + containerRadius + tipWidth/2) {
					containerPos.y = pos.y + anchor.y;
					L.DomUtil.addClass(this._container, 'leaflet-resp-popup-east-south');
					this._tipContainer.style.top = '0px';
					this._tipContainer.style.left = '0px';
				}
				else if(basePoint.y + anchor.y > mapSize.y - paddingBR.y - containerRadius - tipWidth/2) {
					containerPos.y = pos.y + anchor.y - containerHeight;
					L.DomUtil.addClass(this._container, 'leaflet-resp-popup-east-north');					
					this._tipContainer.style.top = containerHeight + 'px';
					this._tipContainer.style.left = '0px';
				}
				else {
					L.DomUtil.addClass(this._container, 'leaflet-resp-popup-east');										
					this._tipContainer.style.top = (pos.y + anchor.y - containerPos.y) + 'px';
					this._tipContainer.style.left = '0px';
				}								
			}
		}
		else {
			var pos = this._map.latLngToLayerPoint(this._map.getCenter());
			containerPos = pos.subtract(L.point(containerWidth / 2, containerHeight / 2));
			if(this.options.hasTip) {
				// this._tipContainer.style.display = 'none'; // this does not work
			}
		}
		
			
		// if point is not visible, just hide the popup
		if(basePoint.x < 0 || basePoint.y < 0 || basePoint.x > mapSize.x || basePoint.y > mapSize.y) {
			// this._container.style.display = 'none';  // this does not work
		}
		
		// if container is too big, just hide the popup
		if(containerWidth - Math.abs(paddingTL.x) - Math.abs(paddingBR.x) > mapSize.x || containerHeight - Math.abs(paddingTL.y) - Math.abs(paddingBR.y) > mapSize.y) {
			// this._container.style.display = 'none'; // this does not work
		}
		
		L.DomUtil.setPosition(this._container, containerPos);
	}
	
});


//Instantiates a `ResponsivePopup` object given an optional `options` object that describes its appearance and location and an optional `source` object that is used to tag the popup with a reference to the Layer to which it refers.
L.responsivePopup = function (options, source) {
	return new L.ResponsivePopup(options, source);
};

//Adds Angular support
if( typeof exports === 'object' && typeof module !== 'undefined') {
	exports.responsivePopup = L.responsivePopup;
	exports.ResponsivePopup = L.ResponsivePopup;
}