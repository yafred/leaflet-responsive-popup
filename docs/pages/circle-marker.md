---
layout: default
permalink: /circle-marker
---

<div style="float: left; margin-right: 20px">
    <h2>Standard L.Popup</h2>
    <p>Click on the map to show a standard leaflet popup.</p>
    <div id="map1" style="height:400px; width:400px; margin-bottom: 20px;"></div>
    <script type="text/javascript">
        var map1 = L.map('map1').setView([48.850258, 2.351074], 11);
    	// create the tile layer with correct attribution
    	L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    	}).addTo(map1);
    	
    	map1.on('click',function(e) {
            L.popup({ autoPan: false}).setContent(e.latlng.lat.toFixed(6) + ', ' + e.latlng.lng.toFixed(6))
                     .setLatLng(e.latlng)
                     .openOn(map1);
        });
    	
    	map1.on('popupopen',function(e) {
    		e.popup.marker1 = L.circleMarker(e.popup.getLatLng(), { radius: 2 , color: "#0000ff" }).addTo(map1);
    		e.popup.marker2 = L.circleMarker(e.popup.getLatLng(), { radius: 10 , color: "#ff0000" }).addTo(map1);
        });
    	
    	map1.on('popupclose',function(e) {
    		map1.removeLayer(e.popup.marker1);
    		map1.removeLayer(e.popup.marker2);
        });
    </script>
 </div>
    
<div style="float: left; margin-right: 20px">
    <h2>Responsive Popup - No tip</h2>
    <p>Click on the map to show a responsive popup.</p>
    <div id="map2" style="height:400px; width:400px; margin-bottom: 20px;"></div>
    <script type="text/javascript">
        var map2 = L.map('map2').setView([48.850258, 2.351074], 11);
    	// create the tile layer with correct attribution
    	L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    	}).addTo(map2);
    	
    	map2.on('click',function(e) {
            L.responsivePopup({ autoPan: false, offset: [11, 11]}).setContent(e.latlng.lat.toFixed(6) + ', ' + e.latlng.lng.toFixed(6))
                     .setLatLng(e.latlng)
                     .openOn(map2);
        });
    	
    	map2.on('popupopen',function(e) {
    		e.popup.marker1 = L.circleMarker(e.popup.getLatLng(), { radius: 2 , color: "#0000ff" }).addTo(map2);
    		e.popup.marker2 = L.circleMarker(e.popup.getLatLng(), { radius: 10 , color: "#ff0000" }).addTo(map2);
        });
    	
    	map2.on('popupclose',function(e) {
    		map2.removeLayer(e.popup.marker1);
    		map2.removeLayer(e.popup.marker2);
        });
    </script>
</div>

<div style="float: left; margin-right: 20px">
    <h2>Responsive Popup - Landscape</h2>
    <p>Click on the map to show a responsive popup.</p>
    <div id="map3" style="height:400px; width:400px; margin-bottom: 20px;"></div>
    <script type="text/javascript">
        var map3 = L.map('map3').setView([48.850258, 2.351074], 11);
    	// create the tile layer with correct attribution
    	L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    	}).addTo(map3);
    	
    	map3.on('click',function(e) {
            L.responsivePopup({ autoPan: false, offset: [11, 11]}).setContent('<div style="text-align: center; height: 160px; width: 300px">' + e.latlng.lat.toFixed(6) + ', ' + e.latlng.lng.toFixed(6) + '</div>')
                     .setLatLng(e.latlng)
                     .openOn(map3);
        });
    	
    	map3.on('popupopen',function(e) {
    		e.popup.marker1 = L.circleMarker(e.popup.getLatLng(), { radius: 2 , color: "#0000ff" }).addTo(map3);
    		e.popup.marker2 = L.circleMarker(e.popup.getLatLng(), { radius: 10 , color: "#ff0000" }).addTo(map3);
        });
    	
    	map3.on('popupclose',function(e) {
    		map3.removeLayer(e.popup.marker1);
    		map3.removeLayer(e.popup.marker2);
        });
    </script>
</div>


<div style="float: left; margin-right: 20px">
    <h2>Responsive Popup - Portrait</h2>
    <p>Click on the map to show a responsive popup.</p>
    <div id="map4" style="height:300px; width:500px; margin-bottom: 20px;"></div>
    <script type="text/javascript">
        var map4 = L.map('map4').setView([48.850258, 2.351074], 11);
    	// create the tile layer with correct attribution
    	L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    	}).addTo(map4);
    	
    	map4.on('click',function(e) {
            L.responsivePopup({ autoPan: false, offset: [11, 11]}).setContent('<div style="text-align: center; height: 200px; width: 100px">' + e.latlng.lat.toFixed(6) + ', ' + e.latlng.lng.toFixed(6) + '</div>')
                     .setLatLng(e.latlng)
                     .openOn(map4);
        });
    	
    	map4.on('popupopen',function(e) {
    		e.popup.marker1 = L.circleMarker(e.popup.getLatLng(), { radius: 2 , color: "#0000ff" }).addTo(map4);
    		e.popup.marker2 = L.circleMarker(e.popup.getLatLng(), { radius: 10 , color: "#ff0000" }).addTo(map4);
        });
    	
    	map4.on('popupclose',function(e) {
    		map4.removeLayer(e.popup.marker1);
    		map4.removeLayer(e.popup.marker2);
        });
    </script>
</div>