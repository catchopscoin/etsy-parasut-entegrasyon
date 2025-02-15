import { useEffect } from 'react';
import DataTable from '../DataTable';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchProducts } from '../../store/slices/productSlice';

const columns = [
  { 
    id: 'title', 
    label: 'Ürün Adı', 
    minWidth: 170,
    maxWidth: 200 
  },
  { 
    id: 'price', 
    label: 'Fiyat', 
    minWidth: 100,
    maxWidth: 120,
    align: 'right' as const,
    format: (value: number) => value.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })
  },
  { 
    id: 'quantity', 
    label: 'Stok', 
    minWidth: 100,
    maxWidth: 100,
    align: 'right' as const 
  },
  { 
    id: 'etsyId', 
    label: 'Etsy ID', 
    minWidth: 130,
    hideOnMobile: true 
  },
  { 
    id: 'createdAt', 
    label: 'Tarih', 
    minWidth: 170,
    hideOnMobile: true,
    format: (value: string) => new Date(value).toLocaleDateString('tr-TR')
  }
];

const ProductTable = () => {
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <DataTable
      columns={columns}
      rows={items}
      loading={loading}
      onEdit={(row) => console.log('Edit:', row)}
      onDelete={(row) => console.log('Delete:', row)}
    />
  );
};

export default ProductTable; 