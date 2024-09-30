var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
const getAccommodation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { lon, lat } = req.query;
        const response = yield fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${apiKey}&location=${lat},${lon}&radius=800&type=lodging`); //modify the radius 500=>800
        const data = yield response.json();
        res.status(200).json(data);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
});
const getAccommodationPic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { photo_reference } = req.query;
        const imageUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo_reference}&key=${apiKey}`;
        const response = yield fetch(imageUrl);
        if (response.ok) {
            res.status(200).json({ data: response.url });
        }
        else {
            const errorMessage = yield response.text();
            console.log("Error fetching image:", errorMessage);
            res.status(404).send("Image not found");
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
});
const getAccommodationDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { place_id } = req.query;
        const response = yield fetch(`https://maps.googleapis.com/maps/api/place/details/json?key=${apiKey}&place_id=${place_id}`);
        const data = yield response.json();
        res.status(200).json(data);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
});
const Accommodation = { getAccommodation, getAccommodationDetails, getAccommodationPic };
export default Accommodation;
