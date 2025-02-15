"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const material_1 = require("@mui/material");
const redux_1 = require("../../hooks/redux");
const settingsSlice_1 = require("../../store/slices/settingsSlice");
const Settings = () => {
    const dispatch = (0, redux_1.useAppDispatch)();
    const settings = (0, redux_1.useAppSelector)(state => state.settings);
    const [showSuccess, setShowSuccess] = (0, react_1.useState)(false);
    // Etsy form state
    const [etsyForm, setEtsyForm] = (0, react_1.useState)({
        apiKey: settings.etsyApiKey,
        apiSecret: settings.etsyApiSecret
    });
    // Parasut form state
    const [parasutForm, setParasutForm] = (0, react_1.useState)({
        clientId: settings.parasutClientId,
        clientSecret: settings.parasutClientSecret,
        companyId: settings.parasutCompanyId
    });
    const handleEtsySubmit = (e) => {
        e.preventDefault();
        dispatch((0, settingsSlice_1.updateEtsySettings)(etsyForm));
        setShowSuccess(true);
    };
    const handleParasutSubmit = (e) => {
        e.preventDefault();
        dispatch((0, settingsSlice_1.updateParasutSettings)(parasutForm));
        setShowSuccess(true);
    };
    return (<material_1.Box>
      <material_1.Typography variant="h4" gutterBottom>
        Ayarlar
      </material_1.Typography>

      {/* Etsy Settings */}
      <material_1.Card sx={{ mb: 3 }}>
        <material_1.CardContent>
          <form onSubmit={handleEtsySubmit}>
            <material_1.Typography variant="h6" gutterBottom>
              Etsy API Ayarları
            </material_1.Typography>
            <material_1.TextField fullWidth label="API Key" margin="normal" value={etsyForm.apiKey} onChange={(e) => setEtsyForm(prev => (Object.assign(Object.assign({}, prev), { apiKey: e.target.value })))}/>
            <material_1.TextField fullWidth label="API Secret" type="password" margin="normal" value={etsyForm.apiSecret} onChange={(e) => setEtsyForm(prev => (Object.assign(Object.assign({}, prev), { apiSecret: e.target.value })))}/>
            <material_1.Button type="submit" variant="contained" sx={{ mt: 2 }}>
              Kaydet
            </material_1.Button>
          </form>
        </material_1.CardContent>
      </material_1.Card>

      {/* Parasut Settings */}
      <material_1.Card>
        <material_1.CardContent>
          <form onSubmit={handleParasutSubmit}>
            <material_1.Typography variant="h6" gutterBottom>
              Parasut API Ayarları
            </material_1.Typography>
            <material_1.TextField fullWidth label="Client ID" margin="normal" value={parasutForm.clientId} onChange={(e) => setParasutForm(prev => (Object.assign(Object.assign({}, prev), { clientId: e.target.value })))}/>
            <material_1.TextField fullWidth label="Client Secret" type="password" margin="normal" value={parasutForm.clientSecret} onChange={(e) => setParasutForm(prev => (Object.assign(Object.assign({}, prev), { clientSecret: e.target.value })))}/>
            <material_1.TextField fullWidth label="Company ID" margin="normal" value={parasutForm.companyId} onChange={(e) => setParasutForm(prev => (Object.assign(Object.assign({}, prev), { companyId: e.target.value })))}/>
            <material_1.Button type="submit" variant="contained" sx={{ mt: 2 }}>
              Kaydet
            </material_1.Button>
          </form>
        </material_1.CardContent>
      </material_1.Card>

      {/* Success Snackbar */}
      <material_1.Snackbar open={showSuccess} autoHideDuration={3000} onClose={() => setShowSuccess(false)}>
        <material_1.Alert severity="success" onClose={() => setShowSuccess(false)}>
          Ayarlar başarıyla kaydedildi
        </material_1.Alert>
      </material_1.Snackbar>
    </material_1.Box>);
};
exports.default = Settings;
