import {getAccommodationPic, getAccommodation, getAccommodationDetails} from '../controllers/apiController';
import { Request, Response } from 'express';
import {photoRef, placeId} from '../__mocks__/mocks.ts'

jest.mock('node-fetch');

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
<<<<<<< HEAD

=======
})
>>>>>>> 36dca246d71af1128a6f2bbf686e304961f664ea

describe('GET /accommodation', () => {

  describe('given a longitude and latitude', () => {
      it ('should return all accommodation options in the vicinity', async() => {
        const res: Partial<Response> = mockResponse() as Partial<Response>;
        const req: Partial<Request> = {
          query: {
            lon: String(55.8645356), // req.params must hold strings, so convert first
            lat: String(-4.2543874),
          }
        };
        await getAccommodation(req as Request, res as Response);
        expect(res.json).toEqual(expect.objectContaining({name: expect.anything()}))
        // Expects an object with a name property, i.e. an accommodation name
      })
    });

});

// describe('GET /accommodationDetails', () => {

//   describe('given a place id', () => {
//     it('should return details of the associated accommodation', async () => {
//       const res: Partial<Response> = mockResponse() as Partial<Response>;
//       const req: Partial<Request> = {
//         query: {
//           place_id: `${placeId}`,
//         }
//       };

//       await getAccommodationDetails(req as Request, res as Response);

//       expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
//         address_components: expect.anything(),
//       }));
//     })

//   });
// });