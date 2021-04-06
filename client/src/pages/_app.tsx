import { ToastContainer } from 'react-toastify';
import api from '../services/api';

import '../styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  api.get('/csrf', { withCredentials: true }).then(response => {
    api.defaults.headers['X-CSRF-Token'] = response.data.csrfToken;
  });
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer 
        pauseOnHover={false} 
        pauseOnFocusLoss={false} 
        autoClose={2000} 
        style={{
          fontSize: '1.25rem'
        }}
      />
    </>
  )
}

export default MyApp
