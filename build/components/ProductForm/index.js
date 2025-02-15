"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const material_1 = require("@mui/material");
const ProductForm = ({ open, onClose, onSubmit, initialData }) => {
    const [formData, setFormData] = (0, react_1.useState)(initialData || {
        title: '',
        description: '',
        price: 0,
        quantity: 0,
        currency: 'TRY'
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
          {initialData ? 'Ürün Düzenle' : 'Yeni Ürün'}
        </material_1.DialogTitle>
        <material_1.DialogContent>
          <material_1.Grid container spacing={2} sx={{ mt: 1 }}>
            <material_1.Grid item xs={12}>
              <material_1.TextField name="title" label="Ürün Adı" fullWidth required value={formData.title} onChange={handleChange}/>
            </material_1.Grid>
            <material_1.Grid item xs={12}>
              <material_1.TextField name="description" label="Açıklama" fullWidth multiline rows={4} value={formData.description} onChange={handleChange}/>
            </material_1.Grid>
            <material_1.Grid item xs={6}>
              <material_1.TextField name="price" label="Fiyat" type="number" fullWidth required value={formData.price} onChange={handleChange}/>
            </material_1.Grid>
            <material_1.Grid item xs={6}>
              <material_1.TextField name="quantity" label="Stok" type="number" fullWidth required value={formData.quantity} onChange={handleChange}/>
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
exports.default = ProductForm;
