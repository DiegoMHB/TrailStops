"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const models_1 = __importDefault(require("./models"));
const port = 3001;
models_1.default.connection.once('open', () => {
    const app = (0, server_1.default)();
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
});
models_1.default.connection.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});
