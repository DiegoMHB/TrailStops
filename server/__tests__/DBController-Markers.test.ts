import * as mockingoose from 'mockingoose';
import { User, UserMarkers } from '../models/schema';
import { addUser, getUser, addMarker } from '../controllers/DBController';
import { Request, Response } from 'express';
import fetchMock from 'jest-fetch-mock';

// Please ignore the red underline under mockingoose as the tests work fine. For a detailed overview, run 'npx jest --verbose'

const mockResponse = (): Partial<Response> => {
    const res: Partial<Response> = {}; // Use Partial to allow optional properties
    res.status = jest.fn().mockReturnValue(res); 
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
};

describe('POST /mapMarkers', () => {

      describe('given valid marker data', () => {

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
          const mockSettings = {speed: 3, distance: "km"};
          const mockUserId = 'tester@test.com';

          fetchMock.mockResponseOnce(JSON.stringify({
            _id: mockMarker._id,
            user_id: mockUserId,
            position: mockMarker.position,
            hotel: mockMarker.hotel,
            nextDist: mockMarker.nextDist,
            prevDist: mockMarker.prevDist,
            order: mockMarker.order
          }));

          const req: Partial<Request> = {body: {
            _id: mockMarker._id,
            user_id: mockUserId,
            marker: mockMarker,
            updatedMarkers: mockUpdatedMarkers,
            settings: mockSettings
          }}

        test('should respond with a 200 status code', async () => {
            const res: Partial<Response> = mockResponse();
            mockingoose(UserMarkers).toReturn(req.body, 'save');
            await addMarker(req as Request, res as Response);
            expect(res.status).toHaveBeenCalledWith(200);
        })
        test('should save the new marker to the database', async () => {
            const res: Partial<Response> = mockResponse();
            mockingoose(UserMarkers).toReturn(req.body, 'save'); // mock save the marker
            await addMarker(req as Request, res as Response);
            mockingoose(UserMarkers).toReturn(req.body, 'find'); // find the mock marker
            const foundMarker = await UserMarkers.find({ _id: req.body._id });
            expect(foundMarker).toEqual(expect.objectContaining({
              _id: req.body._id,
            })); // should return an object containing the saved marker's id
        })
      })
})

describe('GET /mapMarkers', () => {

      describe('given a valid user id', () => {
        test('should retrieve all associated markers from the database', async () => {

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
    beforeEach(() => {
      mockingoose.resetAll();
      });

      describe('given valid markers', () => {
        test('update markers in the database', async () => {

        })
      })

})


describe('PUT /accommodation', () => {
    beforeEach(() => {
      mockingoose.resetAll();
      });

      describe('given a marker id and accommodation', () => {
        test('should update user with selected accommodation', async () => {

        })
      })

})

describe('GET /accommodation', () => {
    beforeEach(() => {
      mockingoose.resetAll();
      });

      describe('given a valid marker', () => {
        test('should get related accommodation info', async () => {

        })
      })

})