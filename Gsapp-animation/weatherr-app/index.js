// api key : 82005d27a116c2880c8f0fcb866998a0


//SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value P");
const descElement = document.querySelector(".temperature-description P");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

//App data
const weather = {};

weather.temperature = {
    unit : "celsius"
}

//APP CONSTS AND VARS
const KELVIN = 273;
//API KEY
const key = "82005d27a116c2880c8f0fcb866998a0";

// CHECK IF BROWSERR SUPPORTS GEOLOCATION
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);

} else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";

}

//SET USER'S POSITION
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    //getWeather(latitude, longitude);
    getWeather(latitude, longitude);
        
}

//SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = '<p> ${error.message}</p>';
}

//GET WEATHER FROM API PROVIDER
function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    //console.log(api);

    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })

        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;

        })

        .then(function(){
            displayWeather();
        });
    }

        //DISPLAY WEATHER TO UI
        function displayWeather(){
            iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
            tempElement.innerHTML = `${weather.temperature.value}° <span>C</span>`;
            descElement.innerHTML = weather.description;
            locationElement.innerHTML = `${weather.city}, ${weather.country}`;
        }
        //C TO F CONVERSION

        function celsiusToFahrenheit(temperature){
            return (temperature *9/5) + 32;
        }

        //WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENET
        tempElement.addEventListener("click", function(){
            if(weather.temperature.value === undefined) return;

            if(weather.temperature.unit == "celsius") {
                let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
                fahrenheit = Math.floor(fahrenheit);

                tempElement.innerHTML = `${fahrenheit}° <span>F</span>`;
                weather.temperature.unit ="fahrenheit";

            } else{
                tempElement.innerHTML = `${weather.temperature.value}° <span>C</span>`;
                weather.temperature.unit = "celsius"

            }
        });

        //rtbox

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2xvZXIiLCJhIjoiY2l2cm4ya3hxMDAyYTJ6bHU5MzZjcHNnbSJ9.PmFpGo0iUpws5YtIBnzVBQ';

const url = "https://api.openweathermap.org/data/2.5/weather?appid=f4b38696b19fb1462d4ed1cf3e4e2365";

const map = new mapboxgl.Map({
  container: 'kartet',
  style: 'mapbox://styles/mapbox/streets-v11',
  zoom: 2,
  center: [12.492285, 41.890466]
});


async function showPosition(lat, lon) {
  
  const api = `${url}&lon=${lon}&lat=${lat}`;
  const response = await fetch(api);
  const json = await response.json();
  
 // console.log(json);
  
  const div = document.createElement("a");
  div.href = "https://mcdonalds.no";
  div.target = "_blank";  
  //div.innerHTML = `<img src="http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png" />`
  div.innerHTML = `<img src="icons/${weather.iconId}.png" />`
  
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
//find and Set a point after Geocoder result
const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    marker: {
    color: 'orange'
    },
    mapboxgl: mapboxgl
    });
     
    map.addControl(geocoder);

    
// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

//mybar
// const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

const url2 = "http://api.openweathermap.org/data/2.5/group?id=6545310,2643741,524901,4122986,6619347,5391959,1796236,3448439,1850147&appid=82005d27a116c2880c8f0fcb866998a0";

const showWeather = async () => {
    const response = await fetch(url2);
    const json = await response.json();

    const data = json.list.map( sted => sted.main.temp);
    const kategorier = json.list.map( sted => sted.name);

    console.log(data);

    const options = {
    chart: {
        renderTo: "chart",
        type: "bar"
        },
        title: {
            text: "Today Wethers"
        },
        xAxis: {
            categories: kategorier,
            //categories: ['Berlin', 'London', 'Moscow', 'Mountain View', 'Mumbai', 'San Francisco', 'Shanghai', 'Såo Paulo', 'Tokyo']
            title: {
            text: null
            }
        },
        series: [
            {
                name: "Popularity-land",
                data: data
            }
        ]
    }

const chart = new Highcharts.Chart(options);
}

showWeather();


//color
map.on("load", () =>{ 
map.addLayer({
    id: "allierte",
    type: "fill",
    paint: {
        "fill-color": "green",
        'fill-opacity': 0.7
    },
    source: {
        type: "vector",
        url: "mapbox://byfrost-articles.74qv0xp0"
    },
    "source-layer":"ne_10m_admin_0_countries-76t9ly"
})

map.setFilter('allierte', ['in', 'ADM0_A3_IS'].concat("NOR"));

map.addLayer({
    id: "sentrale",
    type: "fill",
    paint: {
        "fill-color": "red",
        'fill-opacity': 0.7
    },
    source: {
        type: "vector",
        url: "mapbox://byfrost-articles.74qv0xp0"
    },
    "source-layer":"ne_10m_admin_0_countries-76t9ly"
})

map.setFilter('sentrale', ['in', 'ADM0_A3_IS'].concat("IND"));

map.addLayer({
    id: "germen",
    type: "fill",
    paint: {
        "fill-color": "yellow",
        'fill-opacity': 0.7
    },
    source: {
        type: "vector",
        url: "mapbox://byfrost-articles.74qv0xp0"
    },
    "source-layer":"ne_10m_admin_0_countries-76t9ly"
})

map.setFilter('germen', ['in', 'ADM0_A3_IS'].concat("DEU"));

map.addLayer({
    id: "London",
    type: "fill",
    paint: {
        "fill-color": "orange",
        'fill-opacity': 0.7
    },
    source: {
        type: "vector",
        url: "mapbox://byfrost-articles.74qv0xp0"
    },
    "source-layer":"ne_10m_admin_0_countries-76t9ly"
})

map.setFilter('London', ['in', 'ADM0_A3_IS'].concat("GBR"));

map.addLayer({
    id: "Moscowww",
    type: "fill",
    paint: {
        "fill-color": "blue",
        'fill-opacity': 0.7
    },
    source: {
        type: "vector",
        url: "mapbox://byfrost-articles.74qv0xp0"
    },
    "source-layer":"ne_10m_admin_0_countries-76t9ly"
})

map.setFilter('Moscowww', ['in', 'ADM0_A3_IS'].concat("USA"));

map.addLayer({
    id: "Såo Paulo",
    type: "fill",
    paint: {
        "fill-color": "gray",
        'fill-opacity': 0.7
    },
    source: {
        type: "vector",
        url: "mapbox://byfrost-articles.74qv0xp0"
    },
    "source-layer":"ne_10m_admin_0_countries-76t9ly"
})

map.setFilter('Såo Paulo', ['in', 'ADM0_A3_IS'].concat("BRA"));

map.addLayer({
    id: "Shanghai",
    type: "fill",
    paint: {
        "fill-color": "purple",
        'fill-opacity': 0.7
    },
    source: {
        type: "vector",
        url: "mapbox://byfrost-articles.74qv0xp0"
    },
    "source-layer":"ne_10m_admin_0_countries-76t9ly"
})

map.setFilter('Shanghai', ['in', 'ADM0_A3_IS'].concat("CHN"));

map.addLayer({
    id: "Tokyo",
    type: "fill",
    paint: {
        "fill-color": "pink",
        'fill-opacity': 0.7
    },
    source: {
        type: "vector",
        url: "mapbox://byfrost-articles.74qv0xp0"
    },
    "source-layer":"ne_10m_admin_0_countries-76t9ly"
})

map.setFilter('Tokyo', ['in', 'ADM0_A3_IS'].concat("JPN"));

map.addLayer({
    id: "Moscow",
    type: "fill",
    paint: {
        "fill-color": "darkblue",
        'fill-opacity': 0.7
    },
    source: {
        type: "vector",
        url: "mapbox://byfrost-articles.74qv0xp0"
    },
    "source-layer":"ne_10m_admin_0_countries-76t9ly"
})

map.setFilter('Moscow', ['in', 'ADM0_A3_IS'].concat("RUS"));
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
'icon' : 'såo-brizil.png'
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
