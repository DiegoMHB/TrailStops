"use strict";
const mockMarker = {
    _id: "1234",
    position: { lat: 56.046547415929844, lng: -4.400127729426957 },
    hotel: "Some Hotel",
    nextDist: { dist: 6, time: 2 },
    prevDist: { dist: 3, time: 1 },
    order: 1
};
const mockUpdatedMarkers = {
    markerId1: {
        prevDist: { dist: 9, time: 3 },
        nextDist: { dist: 12, time: 4 },
        order: 2
    }
};
const mockSettings = { speed: 3, distance: "km" };
const mockUserId = 'tester@test.com';
module.exports = { mockMarker, mockUpdatedMarkers, mockSettings, mockUserId };
