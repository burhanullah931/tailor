function mr_murphy_googlemap_init(dom_obj, coords) {
	"use strict";
	if (typeof MR_MURPHY_STORAGE['googlemap_init_obj'] == 'undefined') mr_murphy_googlemap_init_styles();
	MR_MURPHY_STORAGE['googlemap_init_obj'].geocoder = '';
	try {
		var id = dom_obj.id;
		MR_MURPHY_STORAGE['googlemap_init_obj'][id] = {
			dom: dom_obj,
			markers: coords.markers,
			geocoder_request: false,
			opt: {
				zoom: coords.zoom,
				center: null,
				scrollwheel: false,
				scaleControl: false,
				disableDefaultUI: false,
				panControl: true,
				zoomControl: true, //zoom
				mapTypeControl: false,
				streetViewControl: false,
				overviewMapControl: false,
				styles: MR_MURPHY_STORAGE['googlemap_styles'][coords.style ? coords.style : 'default'],
				mapTypeId: google.maps.MapTypeId.ROADMAP
			}
		};
		
		mr_murphy_googlemap_create(id);

	} catch (e) {
		
		dcl(MR_MURPHY_STORAGE['strings']['googlemap_not_avail']);

	};
}

function mr_murphy_googlemap_create(id) {
	"use strict";

	// Create map
	MR_MURPHY_STORAGE['googlemap_init_obj'][id].map = new google.maps.Map(MR_MURPHY_STORAGE['googlemap_init_obj'][id].dom, MR_MURPHY_STORAGE['googlemap_init_obj'][id].opt);

	// Add markers
	for (var i in MR_MURPHY_STORAGE['googlemap_init_obj'][id].markers)
		MR_MURPHY_STORAGE['googlemap_init_obj'][id].markers[i].inited = false;
	mr_murphy_googlemap_add_markers(id);
	
	// Add resize listener
	jQuery(window).resize(function() {
		if (MR_MURPHY_STORAGE['googlemap_init_obj'][id].map)
			MR_MURPHY_STORAGE['googlemap_init_obj'][id].map.setCenter(MR_MURPHY_STORAGE['googlemap_init_obj'][id].opt.center);
	});
}

function mr_murphy_googlemap_add_markers(id) {
	"use strict";
	for (var i in MR_MURPHY_STORAGE['googlemap_init_obj'][id].markers) {
		
		if (MR_MURPHY_STORAGE['googlemap_init_obj'][id].markers[i].inited) continue;
		
		if (MR_MURPHY_STORAGE['googlemap_init_obj'][id].markers[i].latlng == '') {
			
			if (MR_MURPHY_STORAGE['googlemap_init_obj'][id].geocoder_request!==false) continue;
			
			if (MR_MURPHY_STORAGE['googlemap_init_obj'].geocoder == '') MR_MURPHY_STORAGE['googlemap_init_obj'].geocoder = new google.maps.Geocoder();
			MR_MURPHY_STORAGE['googlemap_init_obj'][id].geocoder_request = i;
			MR_MURPHY_STORAGE['googlemap_init_obj'].geocoder.geocode({address: MR_MURPHY_STORAGE['googlemap_init_obj'][id].markers[i].address}, function(results, status) {
				"use strict";
				if (status == google.maps.GeocoderStatus.OK) {
					var idx = MR_MURPHY_STORAGE['googlemap_init_obj'][id].geocoder_request;
					if (results[0].geometry.location.lat && results[0].geometry.location.lng) {
						MR_MURPHY_STORAGE['googlemap_init_obj'][id].markers[idx].latlng = '' + results[0].geometry.location.lat() + ',' + results[0].geometry.location.lng();
					} else {
						MR_MURPHY_STORAGE['googlemap_init_obj'][id].markers[idx].latlng = results[0].geometry.location.toString().replace(/\(\)/g, '');
					}
					MR_MURPHY_STORAGE['googlemap_init_obj'][id].geocoder_request = false;
					setTimeout(function() { 
						mr_murphy_googlemap_add_markers(id); 
						}, 200);
				} else
					dcl(MR_MURPHY_STORAGE['strings']['geocode_error'] + ' ' + status);
			});
		
		} else {
			
			// Prepare marker object
			var latlngStr = MR_MURPHY_STORAGE['googlemap_init_obj'][id].markers[i].latlng.split(',');
			var markerInit = {
				map: MR_MURPHY_STORAGE['googlemap_init_obj'][id].map,
				position: new google.maps.LatLng(latlngStr[0], latlngStr[1]),
				clickable: MR_MURPHY_STORAGE['googlemap_init_obj'][id].markers[i].description!=''
			};
			if (MR_MURPHY_STORAGE['googlemap_init_obj'][id].markers[i].point) markerInit.icon = MR_MURPHY_STORAGE['googlemap_init_obj'][id].markers[i].point;
			if (MR_MURPHY_STORAGE['googlemap_init_obj'][id].markers[i].title) markerInit.title = MR_MURPHY_STORAGE['googlemap_init_obj'][id].markers[i].title;
			MR_MURPHY_STORAGE['googlemap_init_obj'][id].markers[i].marker = new google.maps.Marker(markerInit);
			
			// Set Map center
			if (MR_MURPHY_STORAGE['googlemap_init_obj'][id].opt.center == null) {
				MR_MURPHY_STORAGE['googlemap_init_obj'][id].opt.center = markerInit.position;
				MR_MURPHY_STORAGE['googlemap_init_obj'][id].map.setCenter(MR_MURPHY_STORAGE['googlemap_init_obj'][id].opt.center);				
			}
			
			// Add description window
			if (MR_MURPHY_STORAGE['googlemap_init_obj'][id].markers[i].description!='') {
				MR_MURPHY_STORAGE['googlemap_init_obj'][id].markers[i].infowindow = new google.maps.InfoWindow({
					content: MR_MURPHY_STORAGE['googlemap_init_obj'][id].markers[i].description
				});
				google.maps.event.addListener(MR_MURPHY_STORAGE['googlemap_init_obj'][id].markers[i].marker, "click", function(e) {
					var latlng = e.latLng.toString().replace("(", '').replace(")", "").replace(" ", "");
					for (var i in MR_MURPHY_STORAGE['googlemap_init_obj'][id].markers) {
						if (latlng == MR_MURPHY_STORAGE['googlemap_init_obj'][id].markers[i].latlng) {
							MR_MURPHY_STORAGE['googlemap_init_obj'][id].markers[i].infowindow.open(
								MR_MURPHY_STORAGE['googlemap_init_obj'][id].map,
								MR_MURPHY_STORAGE['googlemap_init_obj'][id].markers[i].marker
							);
							break;
						}
					}
				});
			}
			
			MR_MURPHY_STORAGE['googlemap_init_obj'][id].markers[i].inited = true;
		}
	}
}

function mr_murphy_googlemap_refresh() {
	"use strict";
	for (id in MR_MURPHY_STORAGE['googlemap_init_obj']) {
		mr_murphy_googlemap_create(id);
	}
}

function mr_murphy_googlemap_init_styles() {
	// Init Google map
	MR_MURPHY_STORAGE['googlemap_init_obj'] = {};
	MR_MURPHY_STORAGE['googlemap_styles'] = {
		'default': []
	};
	if (window.mr_murphy_theme_googlemap_styles!==undefined)
		MR_MURPHY_STORAGE['googlemap_styles'] = mr_murphy_theme_googlemap_styles(MR_MURPHY_STORAGE['googlemap_styles']);
}