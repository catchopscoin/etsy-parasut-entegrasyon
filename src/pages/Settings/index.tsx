import { useState } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updateEtsySettings, updateParasutSettings } from '../../store/slices/settingsSlice';

const Settings = () => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector(state => state.settings);
  const [showSuccess, setShowSuccess] = useState(false);

  // Etsy form state
  const [etsyForm, setEtsyForm] = useState({
    apiKey: settings.etsyApiKey,
    apiSecret: settings.etsyApiSecret
  });

  // Parasut form state
  const [parasutForm, setParasutForm] = useState({
    clientId: settings.parasutClientId,
    clientSecret: settings.parasutClientSecret,
    companyId: settings.parasutCompanyId
  });

  const handleEtsySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateEtsySettings(etsyForm));
    setShowSuccess(true);
  };

  const handleParasutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateParasutSettings(parasutForm));
    setShowSuccess(true);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Ayarlar
      </Typography>

      {/* Etsy Settings */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <form onSubmit={handleEtsySubmit}>
            <Typography variant="h6" gutterBottom>
              Etsy API Ayarları
            </Typography>
            <TextField
              fullWidth
              label="API Key"
              margin="normal"
              value={etsyForm.apiKey}
              onChange={(e) => setEtsyForm(prev => ({ ...prev, apiKey: e.target.value }))}
            />
            <TextField
              fullWidth
              label="API Secret"
              type="password"
              margin="normal"
              value={etsyForm.apiSecret}
              onChange={(e) => setEtsyForm(prev => ({ ...prev, apiSecret: e.target.value }))}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 2 }}
            >
              Kaydet
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Parasut Settings */}
      <Card>
        <CardContent>
          <form onSubmit={handleParasutSubmit}>
            <Typography variant="h6" gutterBottom>
              Parasut API Ayarları
            </Typography>
            <TextField
              fullWidth
              label="Client ID"
              margin="normal"
              value={parasutForm.clientId}
              onChange={(e) => setParasutForm(prev => ({ ...prev, clientId: e.target.value }))}
            />
            <TextField
              fullWidth
              label="Client Secret"
              type="password"
              margin="normal"
              value={parasutForm.clientSecret}
              onChange={(e) => setParasutForm(prev => ({ ...prev, clientSecret: e.target.value }))}
            />
            <TextField
              fullWidth
              label="Company ID"
              margin="normal"
              value={parasutForm.companyId}
              onChange={(e) => setParasutForm(prev => ({ ...prev, companyId: e.target.value }))}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 2 }}
            >
              Kaydet
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
      >
        <Alert severity="success" onClose={() => setShowSuccess(false)}>
          Ayarlar başarıyla kaydedildi
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Settings; 