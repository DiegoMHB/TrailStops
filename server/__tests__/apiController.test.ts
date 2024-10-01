import * as mockingoose from 'mockingoose';
import createServer from '../server';
import supertest from 'supertest';
import {getAccommodationPic} from '../controllers/apiController';
import { Request, Response } from 'express';

const request = supertest;

const databaseName = 'test';

const app = createServer();

const photoRef = 'AXCi2Q492N90TQKp2gO5m2GQ7dlb5LANxkl6oPW4RSe6lMyR74W8CSBkdCQIXVkJlf7PfM-GQp0-PSXxB060lmtAgbvP0bPsQR5Etqd1A0_I4NFnQcRKZmqkM-HkaW7uihhAYZBxWfg6Jeb9-sEI8rp8rjn8uC4YIFNMID0eQsaoRhH9S5qM';

const mockResponse = (): Partial<Response> => { // Returns type with optional properties
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res); 
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe('GET /accommodationPic', () => {

    describe('given a photo reference', () => {

      it('should return a valid image', async() => {
        const res: Partial<Response> = mockResponse() as Partial<Response>;
        const req: Partial<Request> = {
          query: {
            photo_reference: `${photoRef}`
          }
        };
        await getAccommodationPic(req as Request, res as Response);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({data: expect.anything()}))
        // Checks if the mock function was called with an object containing a data property, which can have any value except null or undefined.

      });

  });

  describe('GET /accommodation', () => {
    
})

    //     it('should save geographical markers to the database', async() => {

    //     const markers = {user_id: 'aidan@test.com', position: {lat: 56.046547415929844, lng: -4.400127729426957}, hotel: 'hotel', _id: '1234', nextDist: {dist: 1, time: 1}, prevDist: {dist: 2, time: 2}, order: 10, walkingSpeed: 3, distanceMeasure: 'km'};
        
    //     const response = await request.post('/mapMarkers', )
    //     .send(markers);
        
    //     const foundMarkers = await UserMarkers.findOne({position: markers.position});
    //     expect(foundMarkers.position).toBe(markers.position);
    // })

    // it('should return status 200 and the response object', async () => {
    //     const response = await request(router)
    //       .post('/mapMarkers')
    //       .send({
    //         _id: 1234,
    //         user_id: 'aidan@test.com',
    //         marker: { position: {lat: 56.046547415929844, lng: -4.400127729426957}, hotel: 'someHotel', nextDist: {dist: 1, time: 1}, prevDist: {dist: 2, time: 2}, order: 1 },
    //         updatedMarkers: { 'someKey': { prevDist: 3, nextDist: 3, order: 2 } },
    //         settings: { speed: 3, distance: 'km' }
    //       });
    
    //     expect(response.status).toBe(200);
    //     expect(response.body).toHaveProperty('_id');
    //   });
})


// try {
//     const _id = marker._id
//     const response = await fetch(`${BASE_URL}/mapMarkers`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({_id: _id, user_id: user_id, marker: marker, updatedMarkers: updatedMarkers, settings: settings}),
//   })
//   const data = await response.json();



    // beforeAll(async () => {
    //     const url = `mongodb://127.0.0.1/${databaseName}`;
    //     await mongoose.connect(url);
    // })
    //     afterEach(async () => {
    //     await mongoose.disconnect();
    // })