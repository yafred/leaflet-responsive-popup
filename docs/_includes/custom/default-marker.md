
<script>
var myIcon = new L.Icon.Default({ popupAnchor: [1, -20] });
</script>

<div class="callout secondary" style="margin-top: 20px">
<h3>Move the maps and click on the markers to open a popup (Popup has tip: {{ page.hasTip }}).</h3>
</div>

<div style="float: left; margin-right: 20px">
    <h3>Standard L.Popup</h3>
    <p>Click on the marker when it is near an edge or in a corner.</p>
    <div id="map1" style="height:400px; width:400px; margin-bottom: 20px;"></div>
    <script type="text/javascript">
        var map1 = L.map('map1').setView([48.850258, 2.351074], 11);
    	// create the tile layer with correct attribution
    	L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    	}).addTo(map1);
    	
    	var popup1 = L.popup({ autoPan: true, keepInView: true }).setContent('A pretty CSS3 popup.<br> Easily customizable.');   	
    	L.marker([48.850258, 2.351074]).addTo(map1).bindPopup(popup1);
    </script>
 </div>
 
 <div style="float: left; margin-right: 20px">
    <h3>Responsive Popup</h3>
    <p>Click on the marker when it is near an edge or in a corner.</p>
    <div id="map2" style="height:400px; width:400px; margin-bottom: 20px;"></div>
    <script type="text/javascript">
        var map2 = L.map('map2').setView([48.850258, 2.351074], 11);
    	// create the tile layer with correct attribution
    	L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    	}).addTo(map2);
    	
    	var popup2 = L.responsivePopup({ hasTip: {{ page.hasTip }}, autoPan: false, offset: [15, 25]}).setContent('A pretty CSS3 responsive popup.<br> Easily customizable.');
    	L.marker([48.850258, 2.351074], { icon: myIcon }).addTo(map2).bindPopup(popup2);
    	
    	map2.on('popupopen',function(e) {
    		e.popup.marker1 = L.circleMarker(e.popup.getLatLng(), { radius: 15 , opacity: 0, fillColor: "#000000", fillOpacity: .3 }).addTo(map2);
         });
    	
    	map2.on('popupclose',function(e) {
    		map2.removeLayer(e.popup.marker1);
        });
    </script>
 </div>
 
 <div style="float: left; margin-right: 20px">
    <h3>Landscape</h3>
    <p>Landscape popup on a Portrait map.</p>
    <div id="map3" style="height:500px; width:300px; margin-bottom: 20px;"></div>
    <script type="text/javascript">
        var map3 = L.map('map3').setView([48.850258, 2.351074], 11);
    	// create the tile layer with correct attribution
    	L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    	}).addTo(map3);
    	
    	var popup3 = L.responsivePopup({ hasTip: {{ page.hasTip }}, autoPan: false, offset: [15, 25]}).setContent('<div style="text-align: center; height: 100px; width: 200px">A pretty CSS3 responsive popup.<br> Easily customizable.</div>');
     	L.marker([48.850258, 2.351074], { icon: myIcon }).addTo(map3).bindPopup(popup3);

    	map3.on('popupopen',function(e) {
    		e.popup.marker1 = L.circleMarker(e.popup.getLatLng(), { radius: 15 , opacity: 0, fillColor: "#000000", fillOpacity: .3 }).addTo(map3);
         });
    	
    	map3.on('popupclose',function(e) {
    		map3.removeLayer(e.popup.marker1);
    	 });	
    </script>
</div>

<div style="float: left; margin-right: 20px">
    <h3>Portrait</h3>
    <p>Portrait popup on a Landscape map.</p>
    <div id="map4" style="height:300px; width:500px; margin-bottom: 20px;"></div>
    <script type="text/javascript">
        var map4 = L.map('map4').setView([48.850258, 2.351074], 11);
    	// create the tile layer with correct attribution
    	L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    	}).addTo(map4);
    	
    	var popup4 = L.responsivePopup({ hasTip: {{ page.hasTip }}, autoPan: false, offset: [15, 25]}).setContent('<div style="text-align: center; height: 200px; width: 100px">A pretty CSS3 responsive popup.<br> Easily customizable.</div>');
      	L.marker([48.850258, 2.351074], { icon: myIcon }).addTo(map4).bindPopup(popup4);
      	
    	map4.on('popupopen',function(e) {
    		e.popup.marker1 = L.circleMarker(e.popup.getLatLng(), { radius: 15 , opacity: 0, fillColor: "#000000", fillOpacity: .3 }).addTo(map4);
         });
    	
    	map4.on('popupclose',function(e) {
    		map4.removeLayer(e.popup.marker1);
    	 });	      	
    </script>
