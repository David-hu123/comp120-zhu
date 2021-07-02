var allVehicle;
var markers = [];
var v_pos = [];
var dis = [];
function myMap() {
var mapProp= {
  center:new google.maps.LatLng(42.352271,-71.05524200000001),
  zoom:2,
};
var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
const image = {
    url: "car.png",
    scaledSize: new google.maps.Size(15, 35)
};

Object.size = function(obj) {
  var size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

window.onload=function()
{
    //show current location
    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(showLocation);
    }
}
    //get nearby vehicle location
    var url = "https://fathomless-refuge-73113.herokuapp.com/rides";
    // var url = "http://localhost:5000/rides";
    var params = "username=DCEZBDzN&lat=52.3453&lng=-71.0464";

    var http = new XMLHttpRequest();
    http.open('POST', url, true);

    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.onreadystatechange = function() {//Call a function when the state changes.
       if(http.readyState == 4 && http.status == 200) {
            
            var allVehicle = JSON.parse(http.responseText)
            var number = Object.size(allVehicle);
            
            for (var i = 0; i < number; i++) {
                v_pos[i] = new google.maps.LatLng(allVehicle[i].lat, allVehicle[i].lng);
                markers[i] = new google.maps.Marker({
                    position: v_pos[i],
                    map: map,
                    icon: "car.png",
                    id: allVehicle[i].id
                    
                });
                var infowindow = new google.maps.InfoWindow({
                    content: allVehicle[i].username
                });
                // infowindow.open(map, markers[i]);
            }
            

       } 
    }
    http.send(params);
    


  

function showLocation(position) {
    
    const marker= new google.maps.Marker({
        position: { lat: position.coords.latitude, lng: position.coords.longitude },
        map,
      });

//get nearby vehicle location
    var url = "https://jordan-marsh.herokuapp.com/rides";
    var params = "username=DCEZBDzN&lat=42.3453&lng=-71.0464";

    var http = new XMLHttpRequest();
    http.open('POST', url, true);

    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.onreadystatechange = function() {//Call a function when the state changes.
       if(http.readyState == 4 && http.status == 200) {
            
            var allVehicle = JSON.parse(http.responseText)
            var number = Object.size(allVehicle);
            
            for (var i = 0; i < number; i++) {
                v_pos[i] = new google.maps.LatLng(allVehicle[i].lat, allVehicle[i].lng);
                markers[i] = new google.maps.Marker({
                    position: v_pos[i],
                    map: map,
                    icon: "car.png",
                    id: allVehicle[i].id,
                    
                });
                google.maps.event.addListener(markers[i], 'click', function() {
                    const infowindow_vehicle = new google.maps.InfoWindow({
                        content: "The distance from this vehicle and your location is " + Math.round(dis[i]) + "mile",
                    });
                    infowindow_vehicle.open({
                      anchor: markers[i],
                      map,
                      shouldFocus: false,
                    });
                });
                // infowindow.open(map, markers[i]);
            }
            

       } 
    }
    http.send(params);
    //calculate the min distance
    var minDistance=1000000;
    var vehicleIndex;
    for (var i = 0; i < Object.size(v_pos); i++) {
        var newDistance = google.maps.geometry.spherical.computeDistanceBetween(v_pos[i], marker.position)/1609.34
        
        if (newDistance<minDistance) {
            minDistance=newDistance;
            vehicleIndex=i;
        }
        dis[i]=newDistance;
    }
    const infowindow = new google.maps.InfoWindow({
        content: "The closet vehicle location is " + v_pos[vehicleIndex]+", and the distance from your current location is " + Math.round(minDistance) + "mile",
    });
    
    marker.addListener("click", () => {
        infowindow.open({
          anchor: marker,
          map,
          shouldFocus: false,
        });
    });


    var line = new google.maps.Polyline({path: [marker.position, v_pos[vehicleIndex]], map: map});

}
}