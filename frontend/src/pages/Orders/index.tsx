import { useState } from 'react';
import { Box, Button, Typography, useTheme, useMediaQuery } from '@mui/material';
import SyncIcon from '@mui/icons-material/Sync';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { syncOrders } from '../../store/slices/orderSlice';
import OrderTable from '../../components/OrderTable';
import OrderForm from '../../components/OrderForm';

const Orders = () => {
  const dispatch = useAppDispatch();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { loading } = useAppSelector(state => state.orders);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSync = () => {
    dispatch(syncOrders());
  };

  return (
    <Box>
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'stretch', sm: 'center' },
          mb: 3,
          gap: 2
        }}
      >
        <Typography variant="h4">Siparişler</Typography>
        <Box 
          sx={{ 
            display: 'flex', 
            gap: 2,
            flexDirection: { xs: 'column', sm: 'row' }
          }}
        >
          <Button
            variant="contained"
            startIcon={<SyncIcon />}
            onClick={handleSync}
            disabled={loading}
            fullWidth={isMobile}
          >
            {loading ? 'Senkronize Ediliyor...' : 'Etsy\'den Senkronize Et'}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<ReceiptIcon />}
            disabled={loading}
            fullWidth={isMobile}
          >
            Toplu Fatura Oluştur
          </Button>
        </Box>
      </Box>
      <OrderTable />
      <OrderForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={(data) => {
          console.log('New Order:', data);
          setIsFormOpen(false);
        }}
      />
    </Box>
  );
};

export default Orders; 