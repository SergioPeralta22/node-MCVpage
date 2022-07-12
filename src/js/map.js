(function () {
    const lat = 20.67444163271174;
    const lng = -103.38739216304566;
    const map = L.map('map').setView([lat, lng], 16);
    let marker;

    //!use provider & geocoder

    const geocodeService = L.esri.Geocoding.geocodeService();

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    //*spot location
    marker = new L.marker([lat, lng], {
        draggable: true,
        autoPan: true,
    }).addTo(map);

    //* detect pin movement
    marker.on('moveend', function (e) {
        marker = e.target;
        const position = marker.getLatLng();
        map.panTo(new L.LatLng(position.lat, position.lng));

        //* get the address from the pin

        geocodeService
            .reverse()
            .latlng(position, 13)
            .run(function (error, result) {
                if (error) {
                    console.log(error);
                } else {
                    marker.bindPopup(result.address.Match_addr).openPopup();
                }
            });
    });
})();
