"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateParasutSettings = exports.updateEtsySettings = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    etsyApiKey: '',
    etsyApiSecret: '',
    parasutClientId: '',
    parasutClientSecret: '',
    parasutCompanyId: ''
};
const settingsSlice = (0, toolkit_1.createSlice)({
    name: 'settings',
    initialState,
    reducers: {
        updateEtsySettings: (state, action) => {
            state.etsyApiKey = action.payload.apiKey;
            state.etsyApiSecret = action.payload.apiSecret;
        },
        updateParasutSettings: (state, action) => {
            state.parasutClientId = action.payload.clientId;
            state.parasutClientSecret = action.payload.clientSecret;
            state.parasutCompanyId = action.payload.companyId;
        }
    }
});
_a = settingsSlice.actions, exports.updateEtsySettings = _a.updateEtsySettings, exports.updateParasutSettings = _a.updateParasutSettings;
exports.default = settingsSlice.reducer;
