## Leaflet Responsive Popup

This plugin overrides [L.Popup](http://leafletjs.com/reference-1.0.2.html#popup) to remove the need to move the map to be able to see the content of the popup. This happens when opening a popup near an edge of the map.

![Leaflet L.Popup](https://yafred.github.io/leaflet-responsive-popup/assets/images/leaflet-popup.png)
![Leaflet L.ResponsivePopup](https://yafred.github.io/leaflet-responsive-popup/assets/images/leaflet-responsive-popup.png)

Here is a [Demo](https://yafred.github.io/leaflet-responsive-popup/default-marker).

## Usage

### include leaflet.responsive.popup-src.js

Download `leaflet.responsive.popup-src.js` (from the root of this repository) and load it in your html page.

```html
<script src="https://unpkg.com/leaflet@1.0.2/dist/leaflet.js"></script>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.2/dist/leaflet.css" />
	
<script src="leaflet.responsive.popup-src.js"></script>
```

### bind a L.ResponsivePopup to your markers

```javascript
var popup = L.responsivePopup().setContent('A pretty CSS3 responsive popup.<br> Easily customizable.');
L.marker([48.850258, 2.351074], { icon: myIcon }).addTo(map).bindPopup(popup);
```

## Options

### offset

The offset of the popup position. 

As the position of the popup is not always above, it is slightly different from the L.Popup option.

`offset.x` is used when the popup is either left or right. `offset.y` is used when the popup is either top or bottom.

```javascript
var popup = L.responsivePopup({ offset: [10,10] }).setContent('A pretty CSS3 responsive popup.<br> Easily customizable.');
L.marker([48.850258, 2.351074], { icon: myIcon }).addTo(map).bindPopup(popup);
```

### autoPanPadding

Space (in pixels) we allow between the popup and the border of the map before we consider the popup is overflowing. `autoPanPadding.x` is used to prevent left and right overflows, `autoPanPadding.y` is used to prevent top and bottom overflows.

```javascript
var popup = L.responsivePopup({ autoPanPadding: [10,10] }).setContent('A pretty CSS3 responsive popup.<br> Easily customizable.');
L.marker([48.850258, 2.351074], { icon: myIcon }).addTo(map).bindPopup(popup);
```

## Limitations

This first implementation does not show the popup tips.

It is advised to highlight the popup position.

![Leaflet L.ResponsivePopup](https://yafred.github.io/leaflet-responsive-popup/assets/images/leaflet-responsive-popup.png)

```javascript
map.on('popupopen',function(e) {
  e.popup.highlight = L.circleMarker(e.popup.getLatLng(), { radius: 15 , opacity: 0, fillColor: "#000000", fillOpacity: .3 }).addTo(map);
});
    	
map.on('popupclose',function(e) {
  map.removeLayer(e.popup.highlight);
});
```


## Notes
Needs at least Leaflet 1.0

This was inspired by [Rrose: A Leaflet Plugin for Edge Cases](https://github.com/erictheise/rrose).

