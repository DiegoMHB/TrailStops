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
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAccommodation = exports.getAccommodation = exports.getUser = exports.addUser = exports.removeMarker = exports.updateAllMarkers = exports.addMarker = exports.getMarkers = void 0;
const schema_1 = require("../models/schema");
const getMarkers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.query;
        const response = yield schema_1.UserMarkers.find({ user_id: user_id });
        const positions = response.map(marker => marker);
        res.status(200).json(positions);
    }
    catch (error) {
        res.status(500).send(`Server Error0: ${error}`);
    }
});
exports.getMarkers = getMarkers;
const addMarker = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, user_id, marker, updatedMarkers, settings } = req.body;
        const newMarker = new schema_1.UserMarkers({
            user_id: user_id,
            position: marker.position,
            hotel: marker.hotel,
            _id: _id,
            nextDist: marker.nextDist,
            prevDist: marker.prevDist,
            order: marker.order,
            walkingSpeed: settings.speed,
            distanceMeasure: settings.distance,
        });
        let response = yield newMarker.save();
        for (const key in updatedMarkers) {
            response = yield schema_1.UserMarkers.findOneAndUpdate({ _id: key }, {
                prevDist: updatedMarkers[key].prevDist,
                nextDist: updatedMarkers[key].nextDist,
                order: updatedMarkers[key].order,
            });
        }
        res.status(200).json(response);
    }
    catch (error) {
        res.status(500).send(`Server Error1: ${error}`);
    }
});
exports.addMarker = addMarker;
const updateAllMarkers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const { markers } = req.body;
        const { markers } = req.body;
        const updatePromises = Object.keys(markers).map((key) => __awaiter(void 0, void 0, void 0, function* () {
            const marker = markers[key];
            return yield schema_1.UserMarkers.updateOne({ _id: marker._id }, marker);
        }));
        yield Promise.all(updatePromises);
        res.status(200).json('Markers updated successfully');
    }
    catch (error) {
        res.status(500).send(`Server Error2: ${error}`);
    }
});
exports.updateAllMarkers = updateAllMarkers;
const removeMarker = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, _id } = req.body;
        const response = yield schema_1.UserMarkers.deleteOne({ user_id: user_id, _id: _id });
        res.status(200).json(response);
    }
    catch (error) {
        res.status(500).send(`Server Error3: ${error}`);
    }
});
exports.removeMarker = removeMarker;
// TODO: add password hashing
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400).json({ message: 'All fields required ' });
        return;
    }
    try {
        const existingUser = yield schema_1.User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ error: 'User with this email already exists' });
            return;
        }
        const newUser = new schema_1.User({ name, email, password });
        const response = yield newUser.save();
        res.status(200).json(response);
    }
    catch (error) {
        res.status(500).send(`Server Error4: ${error}`);
    }
});
exports.addUser = addUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.query.email;
    try {
        const user = yield schema_1.User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).send(`Server Error: ${error}`);
    }
});
exports.getUser = getUser;
const getAccommodation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, markerId } = req.query;
        const accommodation = yield schema_1.UserMarkers.findOne({ user_id: user_id, _id: markerId });
        res.status(200).json(accommodation);
    }
    catch (error) {
        res.status(500).send(`Server Error5: ${error}`);
    }
});
exports.getAccommodation = getAccommodation;
const addAccommodation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, hotel, markerId } = req.body;
        const response = yield schema_1.UserMarkers.updateOne({ user_id: user_id, _id: markerId }, { hotel: hotel });
        res.status(200).json(response);
    }
    catch (error) {
        res.status(500).send(`Server Error6: ${error}`);
    }
});
exports.addAccommodation = addAccommodation;
// Delete accommodation when unselected
