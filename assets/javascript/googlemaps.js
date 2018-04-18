//Global Variables
var placeSearch, autocomplete, marker;

function init () {
      var directionsDisplay = new google.maps.DirectionsRenderer;
      var directionsService = new google.maps.DirectionsService;
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: {lat: 34.251268, lng: -118.441183}
      });
      directionsDisplay.setMap(map);

      //Details Button click
      document.getElementById('detailsBtn').addEventListener('click', function () {
          //Display detail panel
          directionsDisplay.setPanel(document.getElementById('bottom-panel'));
          var control = document.getElementById('floating-panel');
          control.style.display = 'block';
          map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);
      });
      
      //Event Listener to change on start location and travel mode
      var onChangeHandler = function() {
          calculateAndDisplayRoute(directionsService, directionsDisplay);
      };
      //Invoke function calculateAndDisplayRoute on change of location and travel mode
      document.getElementById('start').addEventListener('change', onChangeHandler);
      document.getElementById('mode').addEventListener('change', onChangeHandler);
      
      // Create the autocomplete object, restricting the search to geographical
      // location types.
      autocomplete = new google.maps.places.Autocomplete(
              /** @type {!HTMLInputElement} */(document.getElementById('start')),
          { types: ['geocode'] });

      //Added Marker code
      marker = new google.maps.Marker({
            map: map,
            draggable: false,
            animation: google.maps.Animation.DROP,
            position: { lat: 34.251268, lng: -118.441183 },
            title: 'Vietnamese Evangelical Church (Hội Thánh Tin Lành Việt Nam) North Hollywood'
          });
          marker.addListener('click', toggleBounce);
        
        //Marker bounces on mouse click
        function toggleBounce() {
          if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
          } 
          else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
          }
        }//End of marker code
}//end of init function



// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());
    });
  }
}//end of geolocate()

//calculate and display route base on travel mode
function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    //Travel Mode value
    var selectedMode = document.getElementById('mode').value;
    //Start location value input
    var start = document.getElementById('start').value;
    //Assigned end location
    var end = "9936 Beachy Ave. Arleta, CA 91331";

    directionsService.route({
      origin: start, 
      destination: end,
      // Note that Javascript allows us to access the constant
      // using square brackets and a string value as its
      // "property."
      travelMode: google.maps.TravelMode[selectedMode]
    }, function(response, status) {
      if (status == 'OK') {
        directionsDisplay.setDirections(response);
      } 
      else {
        return;
      }
    });
  }//end of function calculateAndDisplayRoute