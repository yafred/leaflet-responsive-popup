---
layout: default
permalink: /default-marker
---

<script>
var myIcon = new L.Icon.Default({ popupAnchor: [1, -20] });
</script>

<div style="float: left; margin-right: 20px">
    <h2>Standard L.Popup</h2>
    <p>Move the map. Click on the marker.</p>
    <div id="map1" style="height:400px; width:400px; margin-bottom: 20px;"></div>
    <script type="text/javascript">
        var map1 = L.map('map1').setView([48.850258, 2.351074], 11);
    	// create the tile layer with correct attribution
    	L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    	}).addTo(map1);
    	
    	L.marker([48.850258, 2.351074]).addTo(map1).bindPopup('A pretty CSS3 popup.<br> Easily customizable.');
    </script>
 </div>
 
 <div style="float: left; margin-right: 20px">
    <h2>Responsive Popup</h2>
    <p>Move the map. Click on the marker.</p>
    <div id="map2" style="height:400px; width:400px; margin-bottom: 20px;"></div>
    <script type="text/javascript">
        var map2 = L.map('map2').setView([48.850258, 2.351074], 11);
    	// create the tile layer with correct attribution
    	L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    	}).addTo(map2);
    	
    	var popup2 = L.responsivePopup({ autoPan: false, offset: [15, 25]}).setContent('A pretty CSS3 responsive popup.<br> Easily customizable.');
    	L.marker([48.850258, 2.351074], { icon: myIcon }).addTo(map2).bindPopup(popup2);
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
    	
    	var popup3 = L.responsivePopup({ autoPan: false, offset: [15, 25]}).setContent('<div style="text-align: center; height: 160px; width: 300px">A pretty CSS3 responsive popup.<br> Easily customizable.</div>');
     	L.marker([48.850258, 2.351074], { icon: myIcon }).addTo(map3).bindPopup(popup3);
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
    	
    	var popup4 = L.responsivePopup({ autoPan: false, offset: [15, 25]}).setContent('<div style="text-align: center; height: 200px; width: 100px">A pretty CSS3 responsive popup.<br> Easily customizable.</div>');
      	L.marker([48.850258, 2.351074], { icon: myIcon }).addTo(map4).bindPopup(popup4);
    </script>