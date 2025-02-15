import { Box, Grid, Paper, Typography, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReceiptIcon from '@mui/icons-material/Receipt';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[4],
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  borderRadius: '50%',
  padding: theme.spacing(2),
  color: theme.palette.primary.contrastText,
  marginBottom: theme.spacing(1),
}));

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const stats = [
    {
      title: 'Toplam Sipariş',
      value: '150',
      icon: <ShoppingCartIcon fontSize={isMobile ? 'medium' : 'large'} />,
      color: theme.palette.primary.main,
    },
    {
      title: 'Toplam Ürün',
      value: '45',
      icon: <InventoryIcon fontSize={isMobile ? 'medium' : 'large'} />,
      color: theme.palette.success.main,
    },
    {
      title: 'Bekleyen Faturalar',
      value: '12',
      icon: <ReceiptIcon fontSize={isMobile ? 'medium' : 'large'} />,
      color: theme.palette.warning.main,
    },
    {
      title: 'Günlük Ciro',
      value: '₺2,450',
      icon: <TrendingUpIcon fontSize={isMobile ? 'medium' : 'large'} />,
      color: theme.palette.info.main,
    },
  ];

  return (
    <Box>
      <Typography 
        variant="h4" 
        gutterBottom
        sx={{ 
          mb: 4,
          fontSize: { xs: '1.5rem', sm: '2rem' },
          textAlign: { xs: 'center', sm: 'left' }
        }}
      >
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} lg={3} key={index}>
            <Item>
              <IconWrapper sx={{ backgroundColor: stat.color }}>
                {stat.icon}
              </IconWrapper>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontSize: { xs: '1rem', sm: '1.25rem' },
                  color: theme.palette.text.primary 
                }}
              >
                {stat.title}
              </Typography>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontSize: { xs: '1.5rem', sm: '2rem' },
                  color: stat.color,
                  fontWeight: 'bold'
                }}
              >
                {stat.value}
              </Typography>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard; 