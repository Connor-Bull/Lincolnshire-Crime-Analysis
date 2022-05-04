
(async function () {
    let mapData = await fetch('/map').then(dataG => dataG.json())
    mapboxgl.accessToken =
        'pk.eyJ1IjoiMTk3MDI4NDUiLCJhIjoiY2wycnk5ZHZkMDBxODNjb2JpNmZubHNqMiJ9.4Fd-52wvMYZgiKLdJr9p0w';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v10',
        center: [-79.999732, 40.4374],
        zoom: 11
    });
    map.on('load', () => {
        map.addSource('map', {
            type: 'geojson',
            data: mapData
        });

        map.addLayer(
            {
                id: 'crime-heat',
                type: 'heatmap',
                source: mapData,
                maxzoom: 15,
                paint: {
                    'heatmap-weight': {
                        property: 'Crime type',
                        type: 'exponential',
                        stops: [
                            [1, 0],
                            [62, 1]
                        ]
                    },
                    'heatmap-intensity': {
                        stops: [
                            [11, 1],
                            [15, 3]
                        ]
                    },
                    'heatmap-color': [
                        'interpolate',
                        ['linear'],
                        ['heatmap-density'],
                        0,
                        'rgba(236,222,239,0)',
                        0.2,
                        'rgb(208,209,230)',
                        0.4,
                        'rgb(166,189,219)',
                        0.6,
                        'rgb(103,169,207)',
                        0.8,
                        'rgb(28,144,153)'
                    ],
                    'heatmap-radius': {
                        stops: [
                            [11, 15],
                            [15, 20]
                        ]
                    },
                    'heatmap-opacity': {
                        default: 1,
                        stops: [
                            [14, 1],
                            [15, 0]
                        ]
                    }
                }
            },
            'waterway-label'
        );

        map.addLayer(
            {
                'id': 'crime-point',
                'type': 'circle',
                'source': mapData,
                'minzoom': 14,
                'paint': {
                    // increase the radius of the circle as the zoom level and dbh value increases
                    'circle-radius': {
                        'property': 'Crime type',
                        'type': 'exponential',
                        'stops': [
                            [{ zoom: 15, value: 1 }, 5],
                            [{ zoom: 15, value: 62 }, 10],
                            [{ zoom: 22, value: 1 }, 20],
                            [{ zoom: 22, value: 62 }, 50]
                        ]
                    },
                    'circle-color': {
                        'property': 'dbh',
                        'type': 'exponential',
                        'stops': [
                            [0, 'rgba(236,222,239,0)'],
                            [10, 'rgb(236,222,239)'],
                            [20, 'rgb(208,209,230)'],
                            [30, 'rgb(166,189,219)'],
                            [40, 'rgb(103,169,207)'],
                            [50, 'rgb(28,144,153)'],
                            [60, 'rgb(1,108,89)']
                        ]
                    },
                    'circle-stroke-color': 'white',
                    'circle-stroke-width': 1,
                    'circle-opacity': {
                        'stops': [
                            [14, 0],
                            [15, 1]
                        ]
                    }
                }
            },
            'waterway-label'
        );
    });

})


