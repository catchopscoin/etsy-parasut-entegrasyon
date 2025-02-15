import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './config/theme';
import { store } from './store';
import Layout from './components/Layout';
import Snackbar from './components/Snackbar';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout />
          <Snackbar />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
