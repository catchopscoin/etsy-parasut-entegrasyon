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

interface FormErrors {
  title?: string;
  price?: string;
  quantity?: string;
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

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.title?.trim()) {
      newErrors.title = 'Ürün adı zorunludur';
      isValid = false;
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Geçerli bir fiyat giriniz';
      isValid = false;
    }

    if (!formData.quantity || formData.quantity < 0) {
      newErrors.quantity = 'Geçerli bir stok miktarı giriniz';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'quantity' ? Number(value) : value
    }));
    // Hata varsa temizle
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
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
                error={!!errors.title}
                helperText={errors.title}
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
                error={!!errors.price}
                helperText={errors.price}
                inputProps={{ min: 0, step: "0.01" }}
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
                error={!!errors.quantity}
                helperText={errors.quantity}
                inputProps={{ min: 0 }}
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