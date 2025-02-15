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
import { SelectChangeEvent } from '@mui/material/Select';

interface OrderFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (order: Partial<Order>) => void;
  initialData?: Order;
}

interface FormErrors {
  etsyOrderId?: string;
  totalAmount?: string;
  status?: string;
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

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.etsyOrderId?.trim()) {
      newErrors.etsyOrderId = 'Etsy sipariş numarası zorunludur';
      isValid = false;
    }

    if (!formData.totalAmount || formData.totalAmount <= 0) {
      newErrors.totalAmount = 'Geçerli bir tutar giriniz';
      isValid = false;
    }

    if (!formData.status) {
      newErrors.status = 'Durum seçimi zorunludur';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'totalAmount' ? Number(value) : value
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name as string]: value
    }));
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
                onChange={handleTextChange}
                error={!!errors.etsyOrderId}
                helperText={errors.etsyOrderId}
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
                onChange={handleTextChange}
                error={!!errors.totalAmount}
                helperText={errors.totalAmount}
                inputProps={{ min: 0, step: "0.01" }}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth error={!!errors.status}>
                <InputLabel>Durum</InputLabel>
                <Select
                  name="status"
                  value={formData.status}
                  label="Durum"
                  onChange={handleSelectChange}
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