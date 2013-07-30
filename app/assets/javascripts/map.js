$(function(){
  var mapOptions,
      canvas,
      map;

  // create an options hash
  mapOptions = {
    zoom:13,
    center:new google.maps.LatLng(51.508742, -0.120850),
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };

  //grab our DOM element "googleMap" an assign it to the canvas variable
  canvas = document.getElementById("googleMap");

  //create a new map, passing the canvas and mapOptions as arguments.
  map = new google.maps.Map(canvas, mapOptions);

});
