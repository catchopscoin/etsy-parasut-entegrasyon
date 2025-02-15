import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  CircularProgress,
  Box,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  maxWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: any) => string | JSX.Element;
  hideOnMobile?: boolean;
}

interface DataTableProps {
  columns: Column[];
  rows: any[];
  loading?: boolean;
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
}

const DataTable = ({ columns, rows, loading, onEdit, onDelete }: DataTableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  const visibleColumns = columns.filter(column => !isMobile || !column.hideOnMobile);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {visibleColumns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ 
                    minWidth: isMobile ? undefined : column.minWidth,
                    maxWidth: isMobile ? column.maxWidth : undefined
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
              {(onEdit || onDelete) && (
                <TableCell 
                  align="right"
                  sx={{ 
                    minWidth: isMobile ? 80 : 120,
                    width: isMobile ? 80 : 120 
                  }}
                >
                  İşlemler
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {visibleColumns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell 
                        key={column.id} 
                        align={column.align}
                        sx={{
                          maxWidth: isMobile ? column.maxWidth : undefined,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {column.format ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                  {(onEdit || onDelete) && (
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                        {onEdit && (
                          <Tooltip title="Düzenle">
                            <IconButton 
                              onClick={() => onEdit(row)}
                              size={isMobile ? 'small' : 'medium'}
                            >
                              <EditIcon fontSize={isMobile ? 'small' : 'medium'} />
                            </IconButton>
                          </Tooltip>
                        )}
                        {onDelete && (
                          <Tooltip title="Sil">
                            <IconButton 
                              onClick={() => onDelete(row)}
                              size={isMobile ? 'small' : 'medium'}
                            >
                              <DeleteIcon fontSize={isMobile ? 'small' : 'medium'} />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Box>
                    </TableCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={isMobile ? [5, 10] : [10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
        labelRowsPerPage={isMobile ? "Satır:" : "Sayfa başına satır:"}
      />
    </Paper>
  );
};

export default DataTable; 