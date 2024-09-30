import dotenv from 'dotenv';
import { Request, Response } from 'express';
import {NearbySearchResponse} from '../interfaces/google_interfaces';

dotenv.config({ path: '.env' });
const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

const getAccommodation = async (req: Request, res:Response) : Promise<void> => {
  try {
    const { lon, lat } = req.query;
    const response  = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${apiKey}&location=${lat},${lon}&radius=800&type=lodging`);//modify the radius 500=>800
    const data : NearbySearchResponse = await response.json();
    res.status(200).json(data)
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
}

const getAccommodationPic = async (req: Request, res:Response) : Promise<void> => {
  try {
    const { photo_reference } = req.query;
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

const getAccommodationDetails = async (req: Request, res:Response) : Promise<void> => {
  try {
    const { place_id } = req.query;
    const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?key=${apiKey}&place_id=${place_id}`);
    const data = await response.json();
    res.status(200).json(data)
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
}

const Accommodation = {getAccommodation,getAccommodationDetails,getAccommodationPic};
export default Accommodation;