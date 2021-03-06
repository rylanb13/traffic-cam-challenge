// List of Seattle Traffic Cameras
// http://data.seattle.gov/resource/65fc-btcc.json

"use strict";

$(document).ready(function() {
    var mapElem = document.getElementById('map');
    var center = {
        lat: 47.6,
        lng: -122.3
    };

    var map = new google.maps.Map(mapElem, {
        center: center,
        zoom: 12
    });

    var infoWindow = new google.maps.InfoWindow();

    $.getJSON('http://data.seattle.gov/resource/65fc-btcc.json')
        .done(function (data) {
            data.forEach(function (cam) {
                var marker = new google.maps.Marker({
                    position: {
                        lat: Number(cam.location.latitude),
                        lng: Number(cam.location.longitude)
                    },
                    map: map
                });

                google.maps.event.addListener(marker, 'click', function () {
                    var html = '<h2>' + cam.cameralabel + '</h2>' +
                        '<img src="' + cam.imageurl.url + '"/>';
                    infoWindow.setContent(html);
                    infoWindow.open(map, this);
                    map.panTo(this.getPosition());
                });

                $("#search").bind("search keyup", function () {
                    var name = cam.cameralabel.toLowerCase();
                    if (name.indexOf($('#search').val().toLowerCase()) > -1) {
                        marker.setMap(map);
                    } else {
                        marker.setMap(null);
                    }
                })
            });
        })
        .fail(function (error) {
            console.log(error);
        });
});