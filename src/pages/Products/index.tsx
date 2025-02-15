import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SyncIcon from '@mui/icons-material/Sync';
import { useAppDispatch } from '../../hooks/redux';
import { syncProducts } from '../../store/slices/productSlice';
import ProductTable from '../../components/ProductTable';
import ProductForm from '../../components/ProductForm';

const Products = () => {
  const dispatch = useAppDispatch();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSync = () => {
    dispatch(syncProducts());
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Ürünler</Typography>
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
            startIcon={<AddIcon />}
            onClick={() => setIsFormOpen(true)}
          >
            Yeni Ürün
          </Button>
        </Box>
      </Box>
      <ProductTable />
      <ProductForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={(data) => {
          console.log('New Product:', data);
          setIsFormOpen(false);
        }}
      />
    </Box>
  );
};

export default Products; 