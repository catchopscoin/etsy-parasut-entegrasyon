"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const material_1 = require("@mui/material");
const styles_1 = require("@mui/material/styles");
const Item = (0, styles_1.styled)(material_1.Paper)(({ theme }) => (Object.assign(Object.assign({ backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff' }, theme.typography.body2), { padding: theme.spacing(2), textAlign: 'center', color: theme.palette.text.secondary })));
const Dashboard = () => {
    return (<material_1.Box>
      <material_1.Typography variant="h4" gutterBottom>
        Dashboard
      </material_1.Typography>
      <material_1.Grid container spacing={3}>
        <material_1.Grid item xs={12} md={6} lg={3}>
          <Item>
            <material_1.Typography variant="h6">Toplam Sipariş</material_1.Typography>
            <material_1.Typography variant="h4">150</material_1.Typography>
          </Item>
        </material_1.Grid>
        <material_1.Grid item xs={12} md={6} lg={3}>
          <Item>
            <material_1.Typography variant="h6">Toplam Ürün</material_1.Typography>
            <material_1.Typography variant="h4">45</material_1.Typography>
          </Item>
        </material_1.Grid>
        <material_1.Grid item xs={12} md={6} lg={3}>
          <Item>
            <material_1.Typography variant="h6">Bekleyen Faturalar</material_1.Typography>
            <material_1.Typography variant="h4">12</material_1.Typography>
          </Item>
        </material_1.Grid>
        <material_1.Grid item xs={12} md={6} lg={3}>
          <Item>
            <material_1.Typography variant="h6">Günlük Ciro</material_1.Typography>
            <material_1.Typography variant="h4">₺2,450</material_1.Typography>
          </Item>
        </material_1.Grid>
      </material_1.Grid>
    </material_1.Box>);
};
exports.default = Dashboard;
