import { Request, Response } from 'express';
import dotenv from 'dotenv'; 
import fetch from 'node-fetch';

dotenv.config({path: '.env'});

const apiKey: string | undefined = process.env.REACT_APP_GOOGLE_API_KEY;

export const getAccommodation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { lon, lat } = req.query;
    if (!lon || !lat) {
      res.status(400).json({ error: 'Longitude and latitude are required' });
      return;
    }
    const response = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${apiKey}&location=${lat},${lon}&radius=500&type=lodging`);
    const data = await response.json();
    res.status(200).json(data)
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
}

export const getAccommodationPic = async (req: Request, res: Response): Promise<void> => {
  try {
    const { photo_reference } = req.query;
    if (!photo_reference) {
      res.status(400).json({ error: 'Photo reference is required' });
      return;
    }
    const imageUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo_reference}&key=${apiKey}`;
    const response = await fetch(imageUrl);
    if (response.ok) {
      res.status(200).json({data: response.url}); 
    } else {
      const errorMessage = await response.text();
      console.log("Error fetching image:", errorMessage);
      res.status(404).send("Image not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
}

export const getAccommodationDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const { place_id } = req.query as { place_id: string };
    const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?key=${apiKey}&place_id=${place_id}`);
    const data = await response.json();
    res.status(200).json(data)
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
}