import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import SyncIcon from '@mui/icons-material/Sync';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { useAppDispatch } from '../../hooks/redux';
import { syncOrders } from '../../store/slices/orderSlice';
import OrderTable from '../../components/OrderTable';
import OrderForm from '../../components/OrderForm';

const Orders = () => {
  const dispatch = useAppDispatch();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSync = () => {
    dispatch(syncOrders());
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Siparişler</Typography>
        <Box>
          <Button
            variant="contained"
            startIcon={<SyncIcon />}
            onClick={handleSync}
            sx={{ mr: 2 }}
          >
            Etsy'den Senkronize Et
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<ReceiptIcon />}
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