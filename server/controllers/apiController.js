"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccomodationDetails = exports.getAccommodationPic = exports.getAccommodation = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
require('dotenv').config({ path: '.env' });
const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
const getAccommodation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { lon, lat } = req.query;
        if (!lon || !lat) {
            res.status(400).json({ error: 'Longitude and latitude are required' });
            return;
        }
        const response = yield (0, node_fetch_1.default)(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${apiKey}&location=${lat},${lon}&radius=500&type=lodging`);
        const data = yield response.json();
        res.status(200).json(data);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
});
exports.getAccommodation = getAccommodation;
const getAccommodationPic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { photo_reference } = req.query;
        if (!photo_reference) {
            res.status(400).json({ error: 'Photo reference is required' });
            return;
        }
        const imageUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo_reference}&key=${apiKey}`;
        const response = yield (0, node_fetch_1.default)(imageUrl);
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
exports.getAccommodationPic = getAccommodationPic;
const getAccomodationDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const { place_id } = req.query;
        const { place_id } = req.query;
        const response = yield (0, node_fetch_1.default)(`https://maps.googleapis.com/maps/api/place/details/json?key=${apiKey}&place_id=${place_id}`);
        const data = yield response.json();
        res.status(200).json(data);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
});
exports.getAccomodationDetails = getAccomodationDetails;
