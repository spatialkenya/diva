export const appConfig = {
    carto_user: 'erick-otenyo'
};

export const mapLayers = {
    schools_received: {
        type: 'circle',
        paint: {
            "circle-color": {
                property: 'present_de',
                stops: [
                    [
                        0, '#f1f075'
                    ],
                    [1, '#e55e5e']
                ]
            },
            "circle-radius": 5,
            "circle-stroke-width": 1,
            "circle-stroke-color": "#fff"
        }
    }
}
