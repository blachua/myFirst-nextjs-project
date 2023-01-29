import MainLayout from '../src/components/layout/main-layout';
import '@/styles/globals.css';
import '@/styles/general.sass';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
    <MainLayout> 
      <Component {...pageProps} />
    </MainLayout>    
    </>
  );  
}

