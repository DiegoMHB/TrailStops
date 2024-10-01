"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMarkers = exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});
const userMarkersSchema = new mongoose_1.Schema({
    _id: { type: String, required: true },
    user_id: { type: String, required: true },
    position: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
    },
    hotel: { type: String },
    prevDist: {
        dist: { type: Number, required: true },
        time: { type: Number, required: true },
    },
    nextDist: {
        dist: { type: Number, required: true },
        time: { type: Number, required: true },
    },
    order: { type: Number },
    walkingSpeed: { type: Number, required: true },
    distanceMeasure: { type: String, required: true },
});
const User = mongoose_1.default.model('User', userSchema);
exports.User = User;
const UserMarkers = mongoose_1.default.model('UserMarkers', userMarkersSchema);
exports.UserMarkers = UserMarkers;
