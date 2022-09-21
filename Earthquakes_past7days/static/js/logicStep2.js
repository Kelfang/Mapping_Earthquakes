// Add console.log to check to see if our code is working. 
console.log("working");

// Create the tile layer that will be the street background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a dark view tile layer that will be an alternative to the street background of our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        accessToken: API_KEY
    });

// Create a base layer that holds both dark + street maps.
let baseMaps = {
    "Streets": streets,
    "Satellite Streets": satelliteStreets
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
});
// Pass map layers into our layer control and add the layer control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the Toronto neighborhoods GeoJSON URL.
//let torontoHoods = "https://raw.githubusercontent.com/Kelfang/Mapping_Earthquakes/main/torontoNeighborhoods.json";

// Create a style for the lines.
//let myStyle = {
  //  color: "#0000FF",
  //  weight: 1,
  //  fillColor: "#ffff00",
  //  opacity: 0.2
//}

// Getting the GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data){
    function styleInfo(feature) {
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: "#ffae42",
            color: "#000000",
            radius: getRadius(feature.properties.mag),
            stroke: true,
            weight: 0.5
        };
    }
    // Create function to determine the radius of earthquake markers based on magnitude.
    // Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
    function getRadius(magnitude){
        if (magnitude === 0) {
            return 1;
        }
        return magnitude * 4;
    };
    // Create a GeoJSON layer with the retrieved data.
    L.geoJSON(data, {
    // Turn each feature into a circleMarker on the map.
        pointToLayer: function(feature, latlng){
        console.log(data);
        return L.circleMarker(latlng);
    },
    // Set the style for each circleMarker using our styleInfo function.
        style: styleInfo
        }).addTo(map);
});
