import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid
} from '@mui/material';
import { Product } from '../../store/types';

interface ProductFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (product: Partial<Product>) => void;
  initialData?: Product;
}

const ProductForm = ({ open, onClose, onSubmit, initialData }: ProductFormProps) => {
  const [formData, setFormData] = useState<Partial<Product>>(
    initialData || {
      title: '',
      description: '',
      price: 0,
      quantity: 0,
      currency: 'TRY'
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {initialData ? 'Ürün Düzenle' : 'Yeni Ürün'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                name="title"
                label="Ürün Adı"
                fullWidth
                required
                value={formData.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label="Açıklama"
                fullWidth
                multiline
                rows={4}
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="price"
                label="Fiyat"
                type="number"
                fullWidth
                required
                value={formData.price}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="quantity"
                label="Stok"
                type="number"
                fullWidth
                required
                value={formData.quantity}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>İptal</Button>
          <Button type="submit" variant="contained">
            {initialData ? 'Güncelle' : 'Oluştur'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ProductForm; 