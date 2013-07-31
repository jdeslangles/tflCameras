// $(function(){
//   var mapOptions,
//       canvas,
//       map;

//   mapOptions = {
//     zoom:13,
//     center:new google.maps.LatLng(51.508742, -0.120850),
//     mapTypeId:google.maps.MapTypeId.ROADMAP
//   };
//   canvas = document.getElementById("googleMap");
//   map = new google.maps.Map(canvas, mapOptions);

//   var cameras = $.getJSON('/cameras.json', function(data) {
//     cameras = data
//     var markers = []

//     for(var i=0; i < cameras.length; i++) {
//       var marker = new google.maps.Marker({
//           position: new google.maps.LatLng(parseFloat(cameras[i].lat), parseFloat(cameras[i].lng)),
//           map: map,
//           title: 'text',
//           camera_id: i
//       });
//       markers[i] = marker;
//       google.maps.event.addListener(markers[i], 'click', function() {
//         camera = cameras[this.camera_id]
//         var contentString = '<div id="content"><img src="http://www.tfl.gov.uk/tfl/livetravelnews/trafficcams/cctv/' +
//         cameras[this.camera_id].file + '"><p>' + cameras[this.camera_id].location + ", " + cameras[this.camera_id].postcode + '</p></div>';

//         var infowindow = new google.maps.InfoWindow({
//           content: contentString
//         });
//         infowindow.open(map,markers[this.camera_id])
//       });
//     }
//   });
// });









$(function(){
  var mapOptions,
      canvas,
      map;

  mapOptions = {
    zoom:13,
    center:new google.maps.LatLng(51.508742, -0.120850),
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  canvas = document.getElementById("googleMap");
  map = new google.maps.Map(canvas, mapOptions);

  var cameras = $.getJSON('/cameras.json', function(data) {
    cameras = data
    var markers = []

   var infowindow = new google.maps.InfoWindow({
          content: "",
        });

   function put_points(i, cameras) {
         var marker = new google.maps.Marker({
          position: new google.maps.LatLng(parseFloat(cameras[i].lat), parseFloat(cameras[i].lng)),
          map: map,
          title: 'text',
          camera_id: i,
          animation: google.maps.Animation.DROP
      });
      markers[i] = marker;
      google.maps.event.addListener(markers[i], 'click', function() {
        camera = cameras[this.camera_id];
        var contentString = '<div id="content"><img src="http://www.tfl.gov.uk/tfl/livetravelnews/trafficcams/cctv/' + cameras[this.camera_id].file + '"><p>' + cameras[this.camera_id].location + ", " + cameras[this.camera_id].postcode + '</p></div>';

        infowindow.content = contentString;
        infowindow.open(map,markers[this.camera_id]);

        // setTimeout(function(){
        //     infowindow.close(map, markers[this.camera_id])
        //   }, 5000);
      });
   }
   cameras = _.shuffle(cameras)
    for(var i=0; i < cameras.length; i++) {
      (function(index){
        setTimeout(function(){put_points(index, cameras);}, index*40);
      })(i);
    }
  });
});