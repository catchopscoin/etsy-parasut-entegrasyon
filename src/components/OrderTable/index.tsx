import { useEffect } from 'react';
import DataTable from '../DataTable';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchOrders } from '../../store/slices/orderSlice';
import { Chip } from '@mui/material';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'PENDING':
      return 'warning';
    case 'COMPLETED':
      return 'success';
    case 'CANCELLED':
      return 'error';
    default:
      return 'default';
  }
};

const columns = [
  { id: 'etsyOrderId', label: 'Etsy Sipariş No', minWidth: 130 },
  { 
    id: 'totalAmount', 
    label: 'Tutar', 
    minWidth: 100, 
    align: 'right' as const,
    format: (value: number) => value.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })
  },
  { 
    id: 'status', 
    label: 'Durum', 
    minWidth: 100,
    format: (value: string) => (
      <Chip 
        label={value} 
        color={getStatusColor(value) as any}
        size="small"
      />
    )
  },
  { id: 'parasutInvoiceId', label: 'Parasut Fatura No', minWidth: 130 },
  { 
    id: 'createdAt', 
    label: 'Tarih', 
    minWidth: 170,
    format: (value: string) => new Date(value).toLocaleDateString('tr-TR')
  }
];

const OrderTable = () => {
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector(state => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <DataTable
      columns={columns}
      rows={items}
      loading={loading}
      onEdit={(row) => console.log('Edit:', row)}
    />
  );
};

export default OrderTable; 