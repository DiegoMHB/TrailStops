import { Marker, Settings } from '../interfaces/marker-interfaces';

export const mockMarker: Marker = {
    _id: '1234',
    user_id: 'tester@test.com',
    position: {lat: 50, lng: -50},
    hotel: "Some Hotel",
    prevDist: { dist: 3, time: 1 },
    nextDist: { dist: 6, time: 2 },
    order: 1,
    walkingSpeed: 3,
    distanceMeasure: 'km'
}

export const mockUpdatedMarkers = {
    markerId1: {
      position: {lat: 25, lng: -25},
      prevDist: { dist: 9, time: 3 },
      nextDist: { dist: 12, time: 4 },
      order: 2
    }
  };
  
export const mockSettings: Settings = {speed: 3, distance: "km"};

export const mockUserId: string = 'tester@test.com';