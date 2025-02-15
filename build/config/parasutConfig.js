"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parasutConfig = void 0;
exports.parasutConfig = {
    clientId: process.env.PARASUT_CLIENT_ID || '',
    clientSecret: process.env.PARASUT_CLIENT_SECRET || '',
    companyId: process.env.PARASUT_COMPANY_ID || '',
    baseUrl: 'https://api.parasut.com/v4',
    redirectUri: process.env.PARASUT_CALLBACK_URL || 'http://localhost:3001/api/parasut/callback'
};
