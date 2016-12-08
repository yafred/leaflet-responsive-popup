L.SoPopup = L.Popup.extend({
	
});


//Instantiates a `SoPopup` object given an optional `options` object that describes its appearance and location and an optional `source` object that is used to tag the popup with a reference to the Layer to which it refers.
L.soPopup = function (options, source) {
	return new L.SoPopup(options, source);
};
