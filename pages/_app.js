
import { SnackbarProvider } from 'notistack';
import { useEffect } from 'react';
import '../styles/globals.css';
import { StoreProvider } from '../Utils/Store';


function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if(jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <SnackbarProvider anchororigin={{vertcial:'top',
  horizontal: 'center'}}><StoreProvider><Component {...pageProps} /></StoreProvider></SnackbarProvider>
  
  ) 
}

export default MyApp
