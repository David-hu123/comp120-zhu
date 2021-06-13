
function myMap() {
var mapProp= {
  center:new google.maps.LatLng(42.352271,-71.05524200000001),
  zoom:15,
};
var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
const image = {
    url: "car.png",
    // size: new google.maps.Size(15, 35),
    scaledSize: new google.maps.Size(15, 35)
};

const myLatLng = [
{ lat: 42.3453, lng: -71.0464 },
{ lat: 42.3662, lng: -71.0621 },
{ lat: 42.3603, lng: -71.0547 },
{ lat: 42.3472, lng: -71.0802 },
{ lat: 42.3663, lng: -71.0544 },
{ lat: 42.3542, lng: -71.0704 }
];
new google.maps.Marker({
    position: myLatLng[0],
    map,
    icon: "car.png",
  });
new google.maps.Marker({
    position: myLatLng[1],
    map,
    icon: "car.png",
  });
new google.maps.Marker({
    position: myLatLng[2],
    map,
    icon: "car.png",
  });
new google.maps.Marker({
    position: myLatLng[3],
    map,
    icon: "car.png",
  });
new google.maps.Marker({
    position: myLatLng[4],
    map,
    icon: "car.png",
  });
new google.maps.Marker({
    position: myLatLng[5],
    map,
    icon: "car.png",
  });
}