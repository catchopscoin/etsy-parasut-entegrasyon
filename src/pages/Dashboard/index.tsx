import { Box, Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Dashboard = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <Item>
            <Typography variant="h6">Toplam Sipariş</Typography>
            <Typography variant="h4">150</Typography>
          </Item>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Item>
            <Typography variant="h6">Toplam Ürün</Typography>
            <Typography variant="h4">45</Typography>
          </Item>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Item>
            <Typography variant="h6">Bekleyen Faturalar</Typography>
            <Typography variant="h4">12</Typography>
          </Item>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Item>
            <Typography variant="h6">Günlük Ciro</Typography>
            <Typography variant="h4">₺2,450</Typography>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 