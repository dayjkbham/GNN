mapboxgl.accessToken = 'pk.eyJ1IjoiaWFndyIsImEiOiJja3g0dWd6MDkwdjNoMm9ueHhvank3cHFnIn0.BGjIRENbnIB5gU4Nrx-huA';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    // style: 'mapbox://styles/mapbox/streets-v11',
    center: [-1.8040, 52.4766],
    zoom: 11,
});

var draw = new MapboxDraw({
    displayControlsDefault: false,
    // boxSelect: true,
    controls: {
        polygon: true,
        trash: true
    }
});

map.addControl(draw, 'top-left');

map.addControl(new mapboxgl.NavigationControl(), 'bottom-left');

map.addControl(
    new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,

// Limit seach results to the UK.
        countries: 'gb',
// Use a bounding box to further limit results
// to the geographic bounds representing East Birmingham
        bbox: [-1.901035, 52.377688, -1.667387, 52.524273],
        mapboxgl: mapboxgl
    })
);

map.on('load', () => {
    map.addSource('points', {
        'type': 'geojson',
        'data': './data/EBNS_epcs_compact_4326_part.geojson'
    });

    map.addSource('wards', {
        'type': 'geojson',
        'data': './data/CLP-wards_4326.geojson'
    });

    map.addSource('lsoas', {
        'type': 'geojson',
        'data': './data/LSOAs_4326.geojson'
    });
    // from https://docs.mapbox.com/mapbox-gl-js/example/change-building-color-based-on-zoom-level/
    map.setPaintProperty('building', 'fill-color', [
        'interpolate',
        // Set the exponential rate of change to 0.5
        ['exponential', 0.5],
        ['zoom'],
        // When zoom is 15, buildings will be darker.
        15,
        // '#7d807d',
        '#D9D3C9',
        // When zoom is 18 or higher, buildings will be lighter.
        18,
        '#f8f3eb'
    ]);

    map.setPaintProperty('building', 'fill-opacity', [
        'interpolate',
        // Set the exponential rate of change to 0.5
        ['exponential', 0.5],
        ['zoom'],
        // When zoom is 10, buildings will be 100% transparent.
        10,
        0.5,
        // When zoom is 18 or higher, buildings will be 100% opaque.
        18,
        0.7
    ]);

//         map.addLayer(
//             {
//                 'id': 'id1',
//                 'type': 'heatmap',
//                 'source': 'points',
//                 'maxzoom': 20,
//                 'paint': {
// // // increase weight as diameter breast height increases
// //                     'heatmap-weight': {
// //                         'property': 'dbh',
// //                         'type': 'exponential',
// //                         'stops': [
// //                             [1, 0],
// //                             [62, 1]
// //                         ]
// //                     },
// // increase intensity as zoom level increases
//                     'heatmap-intensity': {
//                         'stops': [
//                             [11, 1],
//                             [15, 3]
//                         ]
//                     },
// // use sequential color palette to use exponentially as the weight increases
//                     'heatmap-color': [
//                         'interpolate',
//                         ['linear'],
//                         ['heatmap-density'],
//                         0,
//                         'rgba(236,222,239,0)',
//                         0.2,
//                         'rgb(208,209,230)',
//                         0.4,
//                         'rgb(166,189,219)',
//                         0.6,
//                         'rgb(103,169,207)',
//                         0.8,
//                         'rgb(28,144,153)'
//                     ],
// // increase radius as zoom increases
//                     'heatmap-radius': {
//                         'stops': [
//                             [11, 25],
//                             [15, 40]
//                         ]
//                     },
// // decrease opacity to transition into the circle layer
//                     'heatmap-opacity': {
//                         'default': 1,
//                         'stops': [
//                             [14, 1],
//                             [15, 0]
//                         ]
//                     }
//                 }
//             },
//         );

    map.addLayer(
        {
            "id": "data-driven-circles-labels",
            "type": "symbol",
            "source": "points",
            "minzoom": 16,
            "filter": ["has", "current_energy_rating"],
            "layout": {
                "text-field": ["get", "current_energy_rating"],
                "text-size": 12,
                "text-padding": 10,
                "text-variable-anchor": [
                    "top-right",
                    "bottom-right",
                    "right",
                    "top-left",
                    "bottom-left"
                ],
                "text-justify": "auto",
                "text-radial-offset": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    1,
                    0.09,
                    5,
                    0.15,
                    10,
                    0.24,
                    22,
                    0.3
                ]
            },
            "paint": {
                "text-color": "hsl(0, 0%, 0%)",
                "text-halo-color": "hsl(0, 0%, 100%)",
                "text-halo-width": 1,
                "text-halo-blur": 0.5
            }
        }
    );


    map.addLayer(
        {
            'id': 'id2',
            'type': 'circle',
            'source': 'points',
            'minzoom': 11,
            'paint': {
                // 'circle-radius': 8,
                'circle-radius': {
                    'type': 'exponential',
                    'stops': [
                        [11, 3],
                        [16, 8],
                        [22, 15],
                    ]
                },
                'circle-color': [
                    "match",
                    [
                        "get",
                        "current_energy_rating"
                    ],

                    "A",
                    "hsl(214,45%,49%)",
                    // "hsl(214,45%,49%)", // previous

                    "B",
                    "hsl(150,86%,28%)",
                    // "hsl(195,59%,79%)", // previous

                    "C",
                    "hsl(87,53%,56%)",
                    // "hsl(30,98%,69%)", // previous

                    "D",
                    "hsl(58,87%,58%)",
                    // "hsl(14,89%,61%)", // previous

                    "E",
                    "hsl(38,91%,59%)",
                    // "hsl(3,69%,50%)", // previous
                    // "hsl(14,89%,61%)",

                    "F",
                    "hsl(20,87%,56%)",
                    // "hsl(3,69%,50%)", // previous

                    "G",
                    "hsl(357,82%,53%)",
                    // "hsl(346,100%,32%)", // previous
                    "hsla(0, 0%, 0%, 0)",
                ],


                'circle-stroke-color': '#7d807d', //'white'
                // 'circle-stroke-width': 1,
                'circle-stroke-width': {
                    'type': 'exponential',
                    'stops': [
                        [11, 0],
                        [18, 2],
                    ]
                },
                'circle-opacity': 0.8,
            }
        },
    );

    map.addLayer({
        'id': 'Ward boundaries',
        'type': 'line',
        'source': 'wards', // reference the data source
        'layout': {
            // Make the layer non-visible by default.
            'visibility': 'none',
            'line-join': 'round',
            'line-cap': 'round'
        },
        'minzoom': 10,
        'maxzoom': 15,
        'paint': {
            'line-color': '#385dce', // blue color fill
            // 'fill-opacity': 1,
            // 'line-width': 3
            'line-width': {
                'type': 'exponential',
                'stops': [
                    [11, 2],
                    [15, 3],
                ]
            },
        }
    });

    map.addLayer({
        'id': 'LSOA boundaries',
        'type': 'line',
        'source': 'lsoas', // reference the data source
        'layout': {
            // Make the layer non-visible by default.
            'visibility': 'none',
            'line-join': 'round',
            'line-cap': 'round'
        },
        'minzoom': 10,
        'maxzoom': 18,
        'paint': {
            'line-color': '#341309',
            // 'fill-opacity': 1,
            // 'line-width': 2
            'line-width': {
                'type': 'exponential',
                'stops': [
                    [11, 1],
                    [15, 3],
                ]
            },
        }
    });
    map.on('draw.create', function(e){

        const userPolygon = e.features[0];

        // if (userPolygon) {
        //     console.log(userPolygon)
        // }

        // var features = map.queryRenderedFeatures([southWestPointPixel, northEastPointPixel], { layers: ['id2'] });
        // var ptsWithin = map.queryRenderedFeatures(userPolygon, { layers: ['id2'] });

        var ptsWithin = turf.pointsWithinPolygon('id2', userPolygon.toGeoJSON);
        console.log(ptsWithin)



        // var filter = features.reduce(function(memo, feature) {
        //
        //     if (! (undefined === turf.intersect(feature, userPolygon))) {
        //         // only add the property, if the feature intersects with the polygon drawn by the user
        //
        //         memo.push(feature.properties.uprn);
        //     }
        //     return memo;
        // }, ['in', 'uprn']);

        // map.setFilter("counties-highlighted", filter);

    });


});

// var toggleableLayerIds = [ 'Ward boundaries', 'LSOA boundaries' ];
//
// for (var i = 0; i < toggleableLayerIds.length; i++) {
//     var id = toggleableLayerIds[i];
//
//     var link = document.createElement('a');
//     link.href = '#';
//     link.className = 'active';
//     link.textContent = id;
//
//     link.onclick = function (e) {
//         var clickedLayer = this.textContent;
//         e.preventDefault();
//         e.stopPropagation();
//
//         var visibility = map.getLayoutProperty(clickedLayer, 'visibility');
//
//         if (visibility === 'visible') {
//             map.setLayoutProperty(clickedLayer, 'visibility', 'none');
//             this.className = '';
//         } else {
//             this.className = 'active';
//             map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
//         }
//     };
//
//     var layers = document.getElementById('menu');
//     layers.appendChild(link);
// }

// map.on("click", "id2", function(e) {
//     map.setFilter("id2", ['in', 'current_energy_rating', getRandomCurrentEnergyRating()]);
// });


// function getRandomCurrentEnergyRating() {
//     const randomElement = currentEnergyRatingArray[Math.floor(Math.random() * currentEnergyRatingArray.length)];
//     return randomElement;
// }

switchlayer = function (lname) {
    if (document.getElementById(lname + "CB").checked) {
        map.setLayoutProperty(lname, 'visibility', 'visible');
    } else {
        map.setLayoutProperty(lname, 'visibility', 'none');
    }
}

let currentEnergyRatingArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'no epc'];

switchvis = function (lname) {
    if (document.getElementById(lname + "CB").checked) {
        currentEnergyRatingArray.push(lname);
        map.setFilter('id2', ['in', 'current_energy_rating', ...currentEnergyRatingArray]);
        map.setFilter('data-driven-circles-labels', ['in', 'current_energy_rating', ...currentEnergyRatingArray]);
        // alert(currentEnergyRatingArray.filter(e => e !== lname));
    } else {
        currentEnergyRatingArray = currentEnergyRatingArray.filter(e => e !== lname);
        map.setFilter('id2', ['in', 'current_energy_rating', ...currentEnergyRatingArray]);
        map.setFilter('data-driven-circles-labels', ['in', 'current_energy_rating', ...currentEnergyRatingArray]);
        // alert(currentEnergyRatingArray.filter(e => e !== lname));
    }
}
let currentTenureArray = ['owner-occupied',
    'rental (social)',
    'rental (private)',
    'unknown',
    'not defined new build',
    'no epc',
    'no data'];

switchvisTenure = function (lname) {
    if (document.getElementById(lname + "Tenure").checked) {
        currentTenureArray.push(lname);
        map.setFilter('id2', ['in', 'tenure', ...currentTenureArray]);
        map.setFilter('data-driven-circles-labels', ['in', 'tenure', ...currentTenureArray]);
        // alert(currentEnergyRatingArray.filter(e => e !== lname));
    } else {
        currentTenureArray = currentTenureArray.filter(e => e !== lname);
        map.setFilter('id2', ['in', 'tenure', ...currentTenureArray]);
        map.setFilter('data-driven-circles-labels', ['in', 'tenure', ...currentTenureArray]);
        // alert(currentEnergyRatingArray.filter(e => e !== lname));
    }
}

// let currentBromfordArray = ['0', 'bromford'];

switchBromford = function (lname) {
    if (document.getElementById(lname + "CB").checked) {
        // currentBromfordArray.push(lname);
        map.setFilter('id2', ['in', 'bromford', 'bromford']);
        map.setFilter('data-driven-circles-labels', ['in', 'bromford', 'bromford']);
        // alert(currentEnergyRatingArray.filter(e => e !== lname));
    } else {
        // currentBromfordArray = currentBromfordArray.filter(e => e !== lname);
        map.setFilter('id2', ['in', 'bromford', ...['0', 'bromford']]);
        map.setFilter('data-driven-circles-labels', ['in', 'bromford', ...['0', 'bromford']]);
        // alert(currentEnergyRatingArray.filter(e => e !== lname));
    }
}

// function arrayRemove(arr, value) {
//     return arr.filter(function(ele){
//         return ele !== value;
//     });
//                             alert(result)
// }
// var result = arrayRemove(array, 6);

// Bind function to onclick event for checkbox
// document.getElementById('DCB').onclick = function() {
//     // access properties using this keyword
//     if ( this.checked ) {
//             map.setFilter('id2', ['in', 'current_energy_rating', ...['A', 'B', 'C', 'D', 'E', 'F', 'G']]);
//         alert( currentEnergyRatingArray.value );
//     } else {
//             map.setFilter('id2', ['in', 'current_energy_rating', ...['A', 'B', 'C', 'E', 'F', 'G']]);
//     }
// };

// map.on('click', function(e) {
//   var features = map.queryRenderedFeatures(e.point, {
//     layers: ['id2'] // replace this with the name of the layer
//   });
//
//   if (!features.length) {
//     return;
//   }
//
//   var feature = features[0];
//
//   var popup = new mapboxgl.Popup({ offset: [0, -15] })
//     .setLngLat(e.lngLat)
//     .setHTML('' +
//         '<h3>'+ feature.properties.current_energy_rating + '</h3>' +
//         '<p>' + feature.properties.tenure + '</p>' +
//         '<p>' + feature.properties.WD21NM + '</p>')
//        .addTo(map);
// });
