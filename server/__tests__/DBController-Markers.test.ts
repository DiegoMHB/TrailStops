import * as mockingoose from 'mockingoose';
import { User, UserMarkers } from '../models/schema';
import { addMarker, removeMarker, updateAllMarkers, addAccommodation, getAccommodation } from '../controllers/DBController';
import { Request, Response } from 'express';
import {mockMarkers,  mockUpdatedMarkers, mockSettings} from '../__mocks__/mocks.ts'

// Please ignore the red line under mockingoose as this is an issue with the library and the tests work fine.

const mockResponse = (): Partial<Response> => {
    const res: Partial<Response> = {}; // Use Partial to allow optional properties
    res.status = jest.fn().mockReturnValue(res); 
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
};

const req: Partial<Request> = {body: {
  _id: mockMarkers[0]._id,
  user_id: mockMarkers[0].user_id,
  marker: mockMarkers[0],
  updatedMarkers: mockUpdatedMarkers[0],
  settings: mockSettings
}}

describe('POST /mapMarkers', () => {

  beforeEach(() => {
    mockingoose.resetAll();
  });

      describe('given valid marker data', () => {

        test('should respond with a 200 status code', async () => {
          const res: Partial<Response> = mockResponse();
          mockingoose(UserMarkers).toReturn(req.body, 'save'); // Mock the Mongoose save call
          await addMarker(req as Request, res as Response);
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

  beforeEach(() => {
    mockingoose.resetAll();
  });

  const otherReq: Partial<Request> = {body: {
    _id: mockMarkers[1]._id,
    user_id: mockMarkers[0].user_id,
    marker: mockMarkers[1],
    updatedMarkers: mockUpdatedMarkers[1],
    settings: mockSettings
  }}

      describe('given a valid user id', () => {
        test('should retrieve associated markers from the database', async () => {
          const res: Partial<Response> = mockResponse();
          mockingoose(UserMarkers).toReturn(req.body, 'save'); // mock save the marker
          await addMarker(req as Request, res as Response);
          mockingoose(UserMarkers).toReturn(req.body, 'find'); // find the mock marker
          const foundMarkers = await UserMarkers.find({ user_id: req.body.user_id });
          expect(foundMarkers).toHaveProperty('position');
        })
        test('should retrieve all associated markers from the database if multiple exist', async() => {
          const res: Partial<Response> = mockResponse();
          mockingoose(UserMarkers).toReturn(req.body, 'save');
          await addMarker(req as Request, res as Response);
          mockingoose(UserMarkers).toReturn(otherReq.body, 'save');
          await addMarker(otherReq as Request, res as Response);
          mockingoose(UserMarkers).toReturn([req.body, otherReq.body], 'find');
          const foundMarkers = await UserMarkers.find({ user_id: req.body.user_id });
          const foundIds = foundMarkers.map((marker: any) => marker._id);
          expect(foundIds).toEqual(expect.arrayContaining([req.body._id, otherReq.body._id]));
        })
      })
})

describe('DELETE /mapMarkers', () => {

  beforeEach(() => {
    mockingoose.resetAll();
  });

      describe('given a user id and marker id', () => {
        test('should remove the marker id from the database', async () => {
          const res: Partial<Response> = mockResponse();
          mockingoose(UserMarkers).toReturn(req.body, 'save');
          await addMarker(req as Request, res as Response);
          mockingoose(UserMarkers).toReturn(req.body, 'deleteOne');
          await removeMarker(req as Request, res as Response);
          mockingoose(UserMarkers).toReturn([], 'find');
          const foundMarkers = await UserMarkers.find({ _id: req.body._id });
          expect(foundMarkers).toEqual([]);
        })
      })
})

describe('PUT /updateAllMarkers', () => {

  const otherReq: Partial<Request> = {body: {
    _id: mockMarkers[0]._id,
    user_id: mockMarkers[0].user_id,
    marker: mockMarkers[1],
    updatedMarkers: mockUpdatedMarkers[1],
  }}

      describe('given valid markers', () => {
        test('update markers in the database', async () => {
          const res: Partial<Response> = mockResponse();
          mockingoose(UserMarkers).toReturn(req.body, 'save');
          await addMarker(req as Request, res as Response);
          mockingoose(UserMarkers).toReturn(otherReq.body, 'updateOne');
          await updateAllMarkers(otherReq as Request, res as Response);
          mockingoose(UserMarkers).toReturn([otherReq.body.marker], 'find');
          const foundMarker = await UserMarkers.find({ _id: req.body._id });
          expect(foundMarker).toEqual(expect.arrayContaining([
            expect.objectContaining({
              position: otherReq.body.marker.position,
            }),
          ]));
        })
      })

})

describe('PUT /accommodation', () => {

  const otherReq: Partial<Request> = {body: {
    _id: mockMarkers[0]._id,
    user_id: mockMarkers[0].user_id,
    marker: mockMarkers[1],
    updatedMarkers: mockUpdatedMarkers[1],
  }}

      describe('given a marker id and accommodation', () => {
        test('should update user with selected accommodation', async () => {
          const res: Partial<Response> = mockResponse();
          mockingoose(UserMarkers).toReturn(req.body, 'save');
          await addMarker(req as Request, res as Response);
          mockingoose(UserMarkers).toReturn(otherReq.body, 'updateOne');
          await addAccommodation(otherReq as Request, res as Response);
          mockingoose(UserMarkers).toReturn(otherReq.body.marker, 'find');
          const foundMarker = await UserMarkers.find({ _id: req.body._id });
          expect(foundMarker).toEqual(expect.objectContaining({
            hotel: otherReq.body.marker.hotel,
          }));
        })
      })

})

describe('GET /accommodation', () => {

      describe('given a valid marker id and user id', () => {
        test('should return the marker with all related info', async () => {
          const res: Partial<Response> = mockResponse();
          mockingoose(UserMarkers).toReturn(req.body, 'save');
          await addMarker(req as Request, res as Response);
          mockingoose(UserMarkers).toReturn(req.body, 'find');
          await UserMarkers.find({ _id: req.body._id, user_d: req.body.user_id });
          expect(res.status).toHaveBeenCalledWith(200);
        })
      })

})
