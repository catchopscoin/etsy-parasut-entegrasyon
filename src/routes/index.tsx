import { Routes as RouterRoutes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Orders from '../pages/Orders';
import Products from '../pages/Products';
import Settings from '../pages/Settings';

const Routes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/products" element={<Products />} />
      <Route path="/settings" element={<Settings />} />
    </RouterRoutes>
  );
};

export default Routes; 