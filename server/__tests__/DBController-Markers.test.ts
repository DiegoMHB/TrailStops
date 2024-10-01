import * as mockingoose from 'mockingoose';
import { User, UserMarkers } from '../models/schema';
import { addUser, getUser, addMarker } from '../controllers/DBController';
import { Request, Response } from 'express';
import fetchMock from 'jest-fetch-mock';
import { Marker } from '../interfaces/marker-interfaces';
import {mockMarker, mockUpdatedMarkers, mockSettings, mockUserId} from '../__mocks__/mocks.ts'

// Please ignore the red underline under mockingoose as the tests work fine.

// const mockResponse = (): Partial<Response> => {
//     const res: Partial<Response> = {}; // Use Partial to allow optional properties
//     res.status = jest.fn().mockReturnValue(res); 
//     res.json = jest.fn().mockReturnValue(res);
//     res.send = jest.fn().mockReturnValue(res);
//     return res;
// };

const mockResponse = () => {
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
    json: jest.fn(),
  };
  return res;
};

const req: Partial<Request> = {body: {
  _id: mockMarker._id,
  user_id: mockUserId,
  marker: mockMarker,
  updatedMarkers: mockUpdatedMarkers,
  settings: mockSettings
}}

describe('POST /mapMarkers', () => {

      describe('given valid marker data', () => {

        test('should respond with a 200 status code', async () => {
          const res: Partial<Response> = mockResponse(); // This should include status and send methods

          // Mock the Mongoose save call with mockingoose
          mockingoose(UserMarkers).toReturn(req.body, 'save');
      
          // Call the function that handles the POST request
          await addMarker(req as Request, res as Response);
      
          // Check if the response status was set to 200
          expect(res.status).toHaveBeenCalledWith(200);
        })
        test('should save the new marker to the database', async () => {
            const res: Partial<Response> = mockResponse();
            mockingoose(UserMarkers).toReturn(req.body, 'save'); // mock save the marker
            await addMarker(req as Request, res as Response);
            mockingoose(UserMarkers).toReturn(req.body, 'find'); // find the mock marker
            const foundMarker = await UserMarkers.find({ user_id: req.body.user_id });
            expect(foundMarker).toEqual(expect.objectContaining({
              _id: req.body._id,
            }));
        })
      })
})

describe('GET /mapMarkers', () => {

      describe('given a valid user id', () => {
        test('should retrieve associated markers from the database', async () => {
          const res: Partial<Response> = mockResponse();
          mockingoose(UserMarkers).toReturn(req.body, 'save'); // mock save the marker
          mockingoose(UserMarkers).toReturn(req.body, 'find'); // find the mock marker
          const foundMarkers = await UserMarkers.find({ user_id: req.body.user_id });
          expect(foundMarkers).toHaveProperty('position');
        })
        test('should retrieve all associated markers from the database if multiple exist', async() => {
        

                    // foundMarkers.forEach(marker => {
          //   expect(marker).toHaveProperty('position');
          // });
        })
      })
})

describe('DELETE /mapMarkers', () => {

      describe('given a user id and marker id', () => {
        test('should remove the marker id from the database', async () => {

        })
      })

})

describe('PUT /updateAllMarkers', () => {

      describe('given valid markers', () => {
        test('update markers in the database', async () => {

        })
      })

})


describe('PUT /accommodation', () => {

      describe('given a marker id and accommodation', () => {
        test('should update user with selected accommodation', async () => {

        })
      })

})

describe('GET /accommodation', () => {

      describe('given a valid marker', () => {
        test('should get related accommodation info', async () => {

        })
      })

})


          // fetchMock.mockResponseOnce(JSON.stringify({
          //   _id: mockMarker._id,
          //   user_id: mockUserId,
          //   position: mockMarker.position,
          //   hotel: mockMarker.hotel,
          //   nextDist: mockMarker.nextDist,
          //   prevDist: mockMarker.prevDist,
          //   order: mockMarker.order
          // }));
          // mocks the response for a fetch request and converts to JSON