import { useState } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  TextField, 
  Button, 
  Snackbar, 
  Alert,
  Grid,
  useTheme,
  useMediaQuery,
  Divider
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updateEtsySettings, updateParasutSettings } from '../../store/slices/settingsSlice';

const Settings = () => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector(state => state.settings);
  const [showSuccess, setShowSuccess] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
      <Typography 
        variant="h4" 
        gutterBottom
        sx={{ 
          mb: 4,
          fontSize: { xs: '1.5rem', sm: '2rem' },
          textAlign: { xs: 'center', sm: 'left' }
        }}
      >
        Ayarlar
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card 
            elevation={2}
            sx={{ 
              height: '100%',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: theme.shadows[4],
              },
            }}
          >
            <CardContent>
              <Typography 
                variant="h5" 
                gutterBottom
                sx={{ 
                  fontSize: { xs: '1.25rem', sm: '1.5rem' },
                  mb: 3
                }}
              >
                Etsy API Ayarları
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <form onSubmit={handleEtsySubmit}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    label="API Key"
                    value={etsyForm.apiKey}
                    onChange={(e) => setEtsyForm({ ...etsyForm, apiKey: e.target.value })}
                    fullWidth
                    required
                  />
                  <TextField
                    label="API Secret"
                    value={etsyForm.apiSecret}
                    onChange={(e) => setEtsyForm({ ...etsyForm, apiSecret: e.target.value })}
                    fullWidth
                    required
                    type="password"
                  />
                  <Button 
                    type="submit" 
                    variant="contained" 
                    fullWidth={isMobile}
                    sx={{ mt: 2, alignSelf: isMobile ? 'stretch' : 'flex-start' }}
                  >
                    Etsy Ayarlarını Kaydet
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card 
            elevation={2}
            sx={{ 
              height: '100%',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: theme.shadows[4],
              },
            }}
          >
            <CardContent>
              <Typography 
                variant="h5" 
                gutterBottom
                sx={{ 
                  fontSize: { xs: '1.25rem', sm: '1.5rem' },
                  mb: 3
                }}
              >
                Paraşüt API Ayarları
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <form onSubmit={handleParasutSubmit}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    label="Client ID"
                    value={parasutForm.clientId}
                    onChange={(e) => setParasutForm({ ...parasutForm, clientId: e.target.value })}
                    fullWidth
                    required
                  />
                  <TextField
                    label="Client Secret"
                    value={parasutForm.clientSecret}
                    onChange={(e) => setParasutForm({ ...parasutForm, clientSecret: e.target.value })}
                    fullWidth
                    required
                    type="password"
                  />
                  <TextField
                    label="Company ID"
                    value={parasutForm.companyId}
                    onChange={(e) => setParasutForm({ ...parasutForm, companyId: e.target.value })}
                    fullWidth
                    required
                  />
                  <Button 
                    type="submit" 
                    variant="contained" 
                    fullWidth={isMobile}
                    sx={{ mt: 2, alignSelf: isMobile ? 'stretch' : 'flex-start' }}
                  >
                    Paraşüt Ayarlarını Kaydet
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Snackbar 
        open={showSuccess} 
        autoHideDuration={6000} 
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setShowSuccess(false)} severity="success" variant="filled">
          Ayarlar başarıyla kaydedildi
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Settings; 