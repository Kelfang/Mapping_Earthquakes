// Add console.log to check to see if our code is working. 
console.log("working");

// Create the map object with a center and zoom level. 
let map = L.map('mapid').setView([34.0522, -118.2437], 14);

// Add a marker to the map for Los Angeles, CA. 
let circle = L.circleMarker([34.0522, -118.2437],{
    color: 'black',
    fillColor: '#FFFF00',
    fillOpacity: 0.2,
    radius: 300
}).addTo(map);

// Create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Add the 'graymap' tile layer to the map. 
streets.addTo(map);
