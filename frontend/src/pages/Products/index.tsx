import { useState } from 'react';
import { Box, Button, Typography, useTheme, useMediaQuery } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SyncIcon from '@mui/icons-material/Sync';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { syncProducts } from '../../store/slices/productSlice';
import ProductTable from '../../components/ProductTable';
import ProductForm from '../../components/ProductForm';

const Products = () => {
  const dispatch = useAppDispatch();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { loading } = useAppSelector(state => state.products);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSync = () => {
    dispatch(syncProducts());
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
        <Typography variant="h4">Ürünler</Typography>
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
            startIcon={<AddIcon />}
            onClick={() => setIsFormOpen(true)}
            disabled={loading}
            fullWidth={isMobile}
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