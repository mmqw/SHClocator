function initMap() {
  var map = new google.maps.Map(document.getElementById('map1'), {
    //center: {lat: -34.397, lng: 150.644},
    center: {lat: 43.1653, lng: -77.383},
    zoom: 9
  });
  var infoWindow = new google.maps.InfoWindow({map: map});

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('You are here.');
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  //location 1
  var STD_Clinic = {lat: 43.150322, lng: -77.635749};

  var contentString = '<div id="content">'+
      '<h3 id="firstHeading" class="firstHeading">STD Clinic - University of Rochester</h3>'+
      '<p>Bullshead Plaza 855 West Main St. Rochester, NY 14611 </p>'
      '</div>'
      '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  var marker = new google.maps.Marker({
    position: STD_Clinic,
    map: map,
    title: 'STD Clinic'
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });

  //location 2
  var RochesterHC = {lat: 43.160749, lng: -77.599558};

  var contentString2 = '<div id="content">'+
      '<h3 id="firstHeading" class="firstHeading">Rochester Health Center</h3>'+
      '<p>114 University Avenue Rochester, NY 14605</p>'
      '</div>'
      '</div>';

  var infowindow2 = new google.maps.InfoWindow({
    content: contentString2
  });

  var marker2 = new google.maps.Marker({
    position: RochesterHC,
    map: map,
    title: 'Rochester Health Center'
  });
  marker2.addListener('click', function() {
    infowindow2.open(map, marker2);
  });

  //location 3
  var RochesterHC = {lat: 43.160749, lng: -77.599558};

  var contentString2 = '<div id="content">'+
      '<h3 id="firstHeading" class="firstHeading">Rochester Health Center - Planned Parenthood</h3>'+
      '<p>114 University Avenue Rochester, NY 14605</p>'
      '</div>'
      '</div>';

  var infowindow2 = new google.maps.InfoWindow({
    content: contentString2
  });

  var marker2 = new google.maps.Marker({
    position: RochesterHC,
    map: map,
    title: 'Rochester Health Center'
  });
  marker2.addListener('click', function() {
    infowindow2.open(map, marker2);
  });


}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}
