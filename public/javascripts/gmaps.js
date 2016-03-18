var map;

console.log("hiiii");
function initMap() {
  console.log('hi');
  var myLatLng = {lat: 43.4729398, lng: -80.5418122};

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: myLatLng,
    streetViewControl: false,
    overviewMapControl: false,
    scrollwheel: false,
    mapTypeControl: false,
    zoomControl: false,
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'DC Library'
  });
}

google.maps.event.addDomListener(window, 'load', initMap);
