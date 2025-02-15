import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SettingsState } from '../types';

const initialState: SettingsState = {
  etsyApiKey: '',
  etsyApiSecret: '',
  parasutClientId: '',
  parasutClientSecret: '',
  parasutCompanyId: ''
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateEtsySettings: (state, action: PayloadAction<{
      apiKey: string;
      apiSecret: string;
    }>) => {
      state.etsyApiKey = action.payload.apiKey;
      state.etsyApiSecret = action.payload.apiSecret;
    },
    updateParasutSettings: (state, action: PayloadAction<{
      clientId: string;
      clientSecret: string;
      companyId: string;
    }>) => {
      state.parasutClientId = action.payload.clientId;
      state.parasutClientSecret = action.payload.clientSecret;
      state.parasutCompanyId = action.payload.companyId;
    }
  }
});

export const { updateEtsySettings, updateParasutSettings } = settingsSlice.actions;
export default settingsSlice.reducer; 