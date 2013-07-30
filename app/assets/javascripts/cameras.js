function initialize() {
  $.getJSON('/cameras.json', function(data) {
    console.log(data);
  });