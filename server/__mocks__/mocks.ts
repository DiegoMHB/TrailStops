import { Marker, UpdatedMarkers, Settings } from '../interfaces/marker-interfaces';

export const mockMarkers: Marker[] = [
    { _id: '1234', user_id: 'tester@test.com', position: {lat: 50, lng: -50}, hotel: "Some Hotel", prevDist: { dist: 3, time: 1 }, nextDist: { dist: 6, time: 2 }, order: 1, walkingSpeed: 3, distanceMeasure: 'km'},
    { _id: '2345', user_id: 'othertester@test.com', position: {lat: 60, lng: -60}, hotel: "Some Other Hotel", prevDist: { dist: 9, time: 3 }, nextDist: { dist: 6, time: 2 }, order: 3, walkingSpeed: 3, distanceMeasure: 'km'},
    { _id: '3456', user_id: 'anothertester@test.com', position: {lat: 70, lng: -70}, hotel: "Some Other Other Hotel", prevDist: { dist: 15, time: 5 }, nextDist: { dist: 6, time: 2 }, order: 4, walkingSpeed: 3, distanceMeasure: 'km'}
]

export const mockUpdatedMarkers: UpdatedMarkers[] = [
    {position: {lat: 25, lng: -25}, prevDist: { dist: 18, time: 6 }, nextDist: { dist: 12, time: 4 }, order: 2},
    {position: {lat: 35, lng: -35}, prevDist: { dist: 21, time: 7 }, nextDist: { dist: 24, time: 8 }, order: 5}
]
  
export const mockSettings: Settings = {speed: 3, distance: "km"};

export const photoRef: string = 'AXCi2Q492N90TQKp2gO5m2GQ7dlb5LANxkl6oPW4RSe6lMyR74W8CSBkdCQIXVkJlf7PfM-GQp0-PSXxB060lmtAgbvP0bPsQR5Etqd1A0_I4NFnQcRKZmqkM-HkaW7uihhAYZBxWfg6Jeb9-sEI8rp8rjn8uC4YIFNMID0eQsaoRhH9S5qM';