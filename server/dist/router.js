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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DB = __importStar(require("./controllers/DBController"));
const Accommodation = __importStar(require("./controllers/apiController"));
const router = express_1.default.Router();
router.get('/mapMarkers', DB.getMarkers);
router.post('/mapMarkers', DB.addMarker);
router.put('/updateAllMarkers', DB.updateAllMarkers);
router.delete('/mapMarkers', DB.removeMarker);
router.post('/user', DB.addUser);
router.get('/user', DB.getUser);
router.get('/accommodation', DB.getAccommodation);
router.put('/accommodation', DB.addAccommodation);
router.get('/getAccommodation', Accommodation.getAccommodation);
router.get('/accommodationPic', Accommodation.getAccommodationPic);
router.get('/getAccommodationDetails', Accommodation.getAccommodationDetails);
exports.default = router;
