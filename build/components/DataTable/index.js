"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const material_1 = require("@mui/material");
const Edit_1 = __importDefault(require("@mui/icons-material/Edit"));
const Delete_1 = __importDefault(require("@mui/icons-material/Delete"));
const react_1 = require("react");
const DataTable = ({ columns, rows, loading, onEdit, onDelete }) => {
    const [page, setPage] = (0, react_1.useState)(0);
    const [rowsPerPage, setRowsPerPage] = (0, react_1.useState)(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    if (loading) {
        return (<material_1.Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <material_1.CircularProgress />
      </material_1.Box>);
    }
    return (<material_1.Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <material_1.TableContainer sx={{ maxHeight: 440 }}>
        <material_1.Table stickyHeader aria-label="sticky table">
          <material_1.TableHead>
            <material_1.TableRow>
              {columns.map((column) => (<material_1.TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </material_1.TableCell>))}
              {(onEdit || onDelete) && (<material_1.TableCell align="right">İşlemler</material_1.TableCell>)}
            </material_1.TableRow>
          </material_1.TableHead>
          <material_1.TableBody>
            {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => {
            return (<material_1.TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                    const value = row[column.id];
                    return (<material_1.TableCell key={column.id} align={column.align}>
                          {column.format ? column.format(value) : value}
                        </material_1.TableCell>);
                })}
                    {(onEdit || onDelete) && (<material_1.TableCell align="right">
                        {onEdit && (<material_1.Tooltip title="Düzenle">
                            <material_1.IconButton onClick={() => onEdit(row)}>
                              <Edit_1.default />
                            </material_1.IconButton>
                          </material_1.Tooltip>)}
                        {onDelete && (<material_1.Tooltip title="Sil">
                            <material_1.IconButton onClick={() => onDelete(row)}>
                              <Delete_1.default />
                            </material_1.IconButton>
                          </material_1.Tooltip>)}
                      </material_1.TableCell>)}
                  </material_1.TableRow>);
        })}
          </material_1.TableBody>
        </material_1.Table>
      </material_1.TableContainer>
      <material_1.TablePagination rowsPerPageOptions={[10, 25, 100]} component="div" count={rows.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} labelRowsPerPage="Sayfa başına satır:" labelDisplayedRows={({ from, to, count }) => `${from}-${to} / ${count}`}/>
    </material_1.Paper>);
};
exports.default = DataTable;
