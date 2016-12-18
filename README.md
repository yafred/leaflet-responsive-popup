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

### autoPanPadding

This option defines how much space we allow between the popup and the border of the map before we consider the popup is overflowing. `offset.x` is used to prevent left and right overflows, `offset.y` is used to prevent top and bottom overflows.


```javascript
var popup = L.responsivePopup({ offset: [10,10] }).setContent('A pretty CSS3 responsive popup.<br> Easily customizable.');
L.marker([48.850258, 2.351074], { icon: myIcon }).addTo(map).bindPopup(popup);
```

## Notes
Needs at least Leaflet 1.0

This was inspired by [Rrose: A Leaflet Plugin for Edge Cases](https://github.com/erictheise/rrose).

