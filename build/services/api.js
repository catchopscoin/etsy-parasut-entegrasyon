"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const api_1 = require("../config/api");
const api = axios_1.default.create({
    baseURL: api_1.API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});
// Response interceptor
api.interceptors.response.use(response => response, error => {
    var _a;
    if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 401) {
        // Handle unauthorized
        console.error('Unauthorized access');
    }
    return Promise.reject(error);
});
exports.default = api;
