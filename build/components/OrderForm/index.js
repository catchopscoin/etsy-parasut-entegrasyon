"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const material_1 = require("@mui/material");
const OrderForm = ({ open, onClose, onSubmit, initialData }) => {
    const [formData, setFormData] = (0, react_1.useState)(initialData || {
        etsyOrderId: '',
        totalAmount: 0,
        currency: 'TRY',
        status: 'PENDING'
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => (Object.assign(Object.assign({}, prev), { [name]: value })));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };
    return (<material_1.Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <material_1.DialogTitle>
          {initialData ? 'Sipariş Düzenle' : 'Yeni Sipariş'}
        </material_1.DialogTitle>
        <material_1.DialogContent>
          <material_1.Grid container spacing={2} sx={{ mt: 1 }}>
            <material_1.Grid item xs={12}>
              <material_1.TextField name="etsyOrderId" label="Etsy Sipariş No" fullWidth required value={formData.etsyOrderId} onChange={handleChange}/>
            </material_1.Grid>
            <material_1.Grid item xs={6}>
              <material_1.TextField name="totalAmount" label="Tutar" type="number" fullWidth required value={formData.totalAmount} onChange={handleChange}/>
            </material_1.Grid>
            <material_1.Grid item xs={6}>
              <material_1.FormControl fullWidth>
                <material_1.InputLabel>Durum</material_1.InputLabel>
                <material_1.Select name="status" value={formData.status} label="Durum" onChange={handleChange}>
                  <material_1.MenuItem value="PENDING">Bekliyor</material_1.MenuItem>
                  <material_1.MenuItem value="COMPLETED">Tamamlandı</material_1.MenuItem>
                  <material_1.MenuItem value="CANCELLED">İptal Edildi</material_1.MenuItem>
                </material_1.Select>
              </material_1.FormControl>
            </material_1.Grid>
          </material_1.Grid>
        </material_1.DialogContent>
        <material_1.DialogActions>
          <material_1.Button onClick={onClose}>İptal</material_1.Button>
          <material_1.Button type="submit" variant="contained">
            {initialData ? 'Güncelle' : 'Oluştur'}
          </material_1.Button>
        </material_1.DialogActions>
      </form>
    </material_1.Dialog>);
};
exports.default = OrderForm;
