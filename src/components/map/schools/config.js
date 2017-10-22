export const appConfig = {
    carto_user: 'erick-otenyo'
};

export const mapLayers = {
    schools: {
        type: 'circle',
        paint: {
            "circle-color": {
                property: 'present_devices',
                stops: [
                    [
                        0, '#ff6a00'
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
