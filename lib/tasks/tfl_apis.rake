require "open-uri"
namespace :tfl_apis do
  desc "fetching tfl camera api and saving data into camera table"
  task :cameras => :environment do
    url = "http://www.tfl.gov.uk/tfl/livetravelnews/trafficcams/cctv/jamcams-camera-list.xml"
    doc = Nokogiri::XML(open(url))
    # puts doc --> gets you info in console when you rake tfl_apis:cameras
    Camera.delete_all # since we get 800 new items every time, that clears the db before saving the new ones
    doc.xpath("//syndicatedFeed/cameraList/camera").each do |camera|
      # puts "--------------"
      # puts camera
      attributes = {
        available: camera.attribute("available").to_s, # to_s will render it true instead of hash sign in the console puts
        file: camera.xpath("file").text,
        lat: camera.xpath("lat").text,
        lng: camera.xpath("lng").text,
        postcode: camera.xpath("postCode").text,
        location: camera.xpath("location").text
      }
      # puts attributes
      Camera.create(attributes)
    end
  end
end
