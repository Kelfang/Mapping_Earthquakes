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
    center: [43.7, -79.3],
    zoom: 11,
    layers: [streets]
});
// Pass map layers into our layer control and add the layer control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the Toronto neighborhoods GeoJSON URL.
let torontoHoods = "https://raw.githubusercontent.com/Kelfang/Mapping_Earthquakes/main/torontoNeighborhoods.json";

// Create a style for the lines.
let hoodStyle = {
    color: "#0000FF",
    weight: 1,
    fillColor: "#ffff00",
    opacity: 0.2
}

// Getting the GeoJSON data.
d3.json(torontoHoods).then(function(data){
    console.log(data);
    L.geoJSON(data, {
        style: hoodStyle,
        onEachFeature: function(feature, layer){
            layer.bindPopup("<h2>" + "Neighborhood: " + feature.properties.AREA_NAME + "</h2>");
        }
    }).addTo(map);
})





// d3.json(torontoHoods).then(function(data){
//     console.log(data);
//     L.geoJSON(data).addTo(map);
//     });
//       //L.geoJSON(data,{
//     //     style: myStyle,
//     //     onEachFeature: function(feature,layer) {
//     //     layer.bindPopup("<h2>" + "Airline code: " + feature.properties.airline + "</h2>" + "<hr>" + "<h3>" + "Destination: " + feature.properties.dst + "</h3>" );
//     // }}).addTo(map);

        

