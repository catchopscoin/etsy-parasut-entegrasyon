import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { Order } from '../../store/types';

interface OrderFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (order: Partial<Order>) => void;
  initialData?: Order;
}

const OrderForm = ({ open, onClose, onSubmit, initialData }: OrderFormProps) => {
  const [formData, setFormData] = useState<Partial<Order>>(
    initialData || {
      etsyOrderId: '',
      totalAmount: 0,
      currency: 'TRY',
      status: 'PENDING'
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
          {initialData ? 'Sipariş Düzenle' : 'Yeni Sipariş'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                name="etsyOrderId"
                label="Etsy Sipariş No"
                fullWidth
                required
                value={formData.etsyOrderId}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="totalAmount"
                label="Tutar"
                type="number"
                fullWidth
                required
                value={formData.totalAmount}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Durum</InputLabel>
                <Select
                  name="status"
                  value={formData.status}
                  label="Durum"
                  onChange={handleChange as any}
                >
                  <MenuItem value="PENDING">Bekliyor</MenuItem>
                  <MenuItem value="COMPLETED">Tamamlandı</MenuItem>
                  <MenuItem value="CANCELLED">İptal Edildi</MenuItem>
                </Select>
              </FormControl>
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

export default OrderForm; 