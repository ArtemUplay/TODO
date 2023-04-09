import { CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { Router } from 'router/index';

export function App() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  );
}
