
mapboxgl.accessToken = 'pk.eyJ1IjoiZ2xvZXIiLCJhIjoiY2l2cm4ya3hxMDAyYTJ6bHU5MzZjcHNnbSJ9.PmFpGo0iUpws5YtIBnzVBQ';

const url = "https://api.openweathermap.org/data/2.5/weather?appid=f4b38696b19fb1462d4ed1cf3e4e2365";

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  zoom: 3,
  center: [12.492285, 41.890466]
});


async function showPosition(lat, lon) {
  
  const api = `${url}&lon=${lon}&lat=${lat}`;
  const response = await fetch(api);
  const json = await response.json();
  
  console.log(json);
  
  const div = document.createElement("a");
  div.href = "https://mcdonalds.no";
  div.target = "_blank";  
  div.innerHTML = `<img src="http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png" />`
  
  const mcMarker = new mapboxgl.Marker(div);
  mcMarker.setLngLat([lon, lat]);
  mcMarker.addTo(map);
  map.jumpTo({
    center: [lon, lat]
  });
  
}

function findPosition(pos) {
  const lat = pos.coords.latitude;
  const lon = pos.coords.longitude;
  
  showPosition(lat, lon);
  
}

map.on("load", () => {
  
  navigator.geolocation.getCurrentPosition(findPosition);
  
});



//flag -'Berlin', 'London', 'Moscow', 'Mountain View', 'Mumbai', 'San Francisco', 'Shanghai', 'Såo Paulo', 'Tokyo
mapboxgl.accessToken = 'pk.eyJ1IjoiZ2xvZXIiLCJhIjoiY2l2cm4ya3hxMDAyYTJ6bHU5MzZjcHNnbSJ9.PmFpGo0iUpws5YtIBnzVBQ';
const geojson = {
'type': 'FeatureCollection',
'features': [
{
'type': 'Feature',
'properties': {
'message': 'Oslo',
'iconSize': [40, 40],
'icon' : 'Norway-flag-waving-250.png'
},
'geometry': {
'type': 'Point',
'coordinates': [ 10.757645, 59.917193]
}
},
{
'type': 'Feature',
'properties': {
'message': 'Berlin',
'iconSize': [40, 40],
'icon' : 'Germany-Flag-icon.png'
},
'geometry': {
'type': 'Point',
'coordinates': [13.404106, 52.515707]
}
},
{
'type': 'Feature',
'properties': {
'message': 'London',
'iconSize': [40, 40],
'icon' : 'london.png'
},
'geometry': {
'type': 'Point',
'coordinates': [-0.085813, 51.474274]
}
},
{
'type': 'Feature',
'properties': {
'message': 'Moscow',
'iconSize': [40, 40],
'icon' : 'Russia-512.png'
},
'geometry': {
'type': 'Point',
'coordinates': [37.540570, 55.748421]
}
},
{
'type': 'Feature',
'properties': {
'message': 'Mountain View',
'iconSize': [40, 40],
'icon' : 'Russia.png'
},
'geometry': {
'type': 'Point',
'coordinates': [-122.073029, 37.390120]
}
},
{
'type': 'Feature',
'properties': {
'message': 'Mumbai',
'iconSize': [40, 40],
'icon' : 'India_Country_flag-512.png'
},
'geometry': {
'type': 'Point',
'coordinates': [72.884609, 19.080900]
}
},
{
'type': 'Feature',
'properties': {
'message': 'San Francisco',
'iconSize': [40, 40],
'icon' : 'mosko-usa.png'
},
'geometry': {
'type': 'Point',
'coordinates': [-122.420779, 37.776406]
}
},
{
'type': 'Feature',
'properties': {
'message': 'Shanghai',
'iconSize': [40, 40],
'icon' : 'China.png'
},
'geometry': {
'type': 'Point',
'coordinates': [ 121.487584, 31.267750]
}
},
{
'type': 'Feature',
'properties': {
'message': 'Såo Paulo',
'iconSize': [40, 40],
'icon' : 'mosko-usa.png'
},
'geometry': {
'type': 'Point',
'coordinates': [-46.573368, -23.643168]
}
},
{
'type': 'Feature',
'properties': {
'message': 'Tokyo',
'iconSize': [40, 40],
'icon' : 'japan-512.png'
 },
'geometry': {
'type': 'Point',
'coordinates': [139.813172, 35.847646]
}
}
]
};

 // add markers to map
geojson.features.forEach(function(marker) {
// create a DOM element for the marker
console.log(marker.properties.icon);
const el = document.createElement('div');
el.className = 'marker';
el.style.backgroundImage =
`url("./img/${marker.properties.icon}")`;
el.style.width = marker.properties.iconSize[0] + 'px';
el.style.height = marker.properties.iconSize[1] + 'px';
 
el.addEventListener('click', function() {
window.alert(marker.properties.message);
});
 
// add marker to map
new mapboxgl.Marker(el)
.setLngLat(marker.geometry.coordinates)
.addTo(map);
});