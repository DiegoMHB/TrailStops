import supertest from 'supertest';
import * as mockingoose from 'mockingoose';
import createServer from '../server';
import { User, UserMarkers } from '../models/schema';
import { addUser, getUser, addMarker } from '../controllers/DBController';
import { Request, Response } from 'express';
import {mockMarkers,  mockUpdatedMarkers, mockSettings} from '../__mocks__/mocks.ts'

const request = supertest;
const app = createServer();

// Please ignore the red line under mockingoose as this is an issue with the library and the tests work fine.

const mockResponse = (): Partial<Response> => {
    const res: Partial<Response> = {}; // Use Partial to allow optional properties
    res.status = jest.fn().mockReturnValue(res); 
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
};

describe('POST /user', () => {

    describe('given a name, email, and password', () => {
        const req: Partial<Request> = {
            body: {
              name: 'tester',
              email: mockMarkers[0].user_id,
              password: 'test',
            },
          } as Partial<Request>;

        test('should respond with a 200 status code', async() => {
            const res: Partial<Response> = mockResponse() as Partial<Response>; 
            await addUser(req as Request, res as Response);
            expect(res.status).toHaveBeenCalledWith(200);
        });

        test('should save user to the database', async() => {
            const res: Partial<Response> = mockResponse() as Partial<Response>; 
            mockingoose(User).toReturn(req.body, 'save');
            await addUser(req as Request, res as Response);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
              }));
        });
        test('should not save user if the email already exists', async() => {
            const res: Partial<Response> = mockResponse() as Partial<Response>; 
            mockingoose(User).toReturn(req.body, 'findOne'); // Mock findOne and simulate existing user
            await addUser(req as Request, res as Response);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'User with this email already exists' });

            mockingoose(User).toReturn(req.body, 'save'); // Ensure that save is not called again
            await addUser(req as Request, res as Response);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'User with this email already exists' });
      });
        
    })

    describe('given no name, email, or password', () => {
        const req: Partial<Request> = { body: {} } as Partial<Request>;

        test('should respond with a 400 status code', async () => {
            const res: Partial<Response> = mockResponse() as Partial<Response>;
            await addUser(req as Request, res as Response);
            expect(res.status).toHaveBeenCalledWith(400);
        });
        test('should not save anything to the database', async () => {
            const res: Partial<Response> = mockResponse() as Partial<Response>;
            mockingoose(User).toReturn(req.body, 'save');
            await addUser(req as Request, res as Response);
            expect(res.json).not.toHaveBeenCalledWith(expect.objectContaining({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            }));
        });
    })
})

describe('GET /user', () => {

      describe('given valid user credentials', () => {
        test('should access all associated markers', async () => {
            const res: Partial<Response> = mockResponse() as Partial<Response>;
            const req: Partial<Request> = {
                body: { name: 'tester', email: 'tester@testing.com', password: 'test'},
              } as Partial<Request>;
              mockingoose(User).toReturn(req.body, 'save');
              await addUser(req as Request, res as Response);

        })
      })

      describe('given invalid user credentials', () => {
        test('should respond with a 400 status code', async () => {
          const res: Partial<Response> = mockResponse() as Partial<Response>;
          const req: Partial<Request> = {
            body: { 
                name: '', 
                email: '', 
                password: '' 
            }
        } as Partial<Request>; 
        await addUser(req as Request, res as Response);
        expect(res.status).toHaveBeenCalledWith(400);
        })
      })
})