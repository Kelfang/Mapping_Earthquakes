// Add console.log to check to see if our code is working. 
console.log("working");

// Create the map object with a center and zoom level. 
// let map = L.map('mapid', {
//     center: [40.7, -94.5],
//     zoom: 4
// });

// Create the tile layer that will be the street background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a dark view tile layer that will be an alternative to the street background of our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        accessToken: API_KEY
    });

// Create a base layer that holds both dark + street maps.
let baseMaps = {
    Street: streets,
    Dark: dark
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
    center: [30, 30],
    zoom: 2,
    layers: [streets]
});
// Pass map layers into our layer control and add the layer control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the airport GeoJSON URL.
let airportData = "https://raw.githubusercontent.com/Kelfang/Mapping_Earthquakes/main/majorAirports.json";

// Getting the GeoJSON data.
d3.json(airportData).then(function(data){
    console.log(data);
    L.geoJSON(data, {
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h2>" + "Airport code: " + feature.properties.faa + "</h2>" + "<hr>" + "<h3>" + "Airport name: " +
            feature.properties.name + "</h3>")
        }
    }).addTo(map);
});