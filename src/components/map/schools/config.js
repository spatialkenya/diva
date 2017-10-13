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
                        0, '#e55e5e'
                    ],
                    [1, '#11b4da']
                ]
            },
            "circle-radius": 5,
            "circle-stroke-width": 1,
            "circle-stroke-color": "#fff"
        }
    }
}
