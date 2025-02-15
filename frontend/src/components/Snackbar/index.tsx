import { Snackbar as MuiSnackbar, Alert, AlertColor } from '@mui/material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

// Snackbar State ve Slice
interface SnackbarState {
  open: boolean;
  message: string;
  severity: AlertColor;
}

const initialState: SnackbarState = {
  open: false,
  message: '',
  severity: 'info'
};

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showSnackbar: (state, action: PayloadAction<{ message: string; severity: AlertColor }>) => {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity;
    },
    hideSnackbar: (state) => {
      state.open = false;
    }
  }
});

// Snackbar Component
const Snackbar = () => {
  const dispatch = useAppDispatch();
  const { open, message, severity } = useAppSelector(state => state.snackbar);

  const handleClose = () => {
    dispatch(snackbarSlice.actions.hideSnackbar());
  };

  return (
    <MuiSnackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert onClose={handleClose} severity={severity} variant="filled">
        {message}
      </Alert>
    </MuiSnackbar>
  );
};

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;
export default Snackbar; 