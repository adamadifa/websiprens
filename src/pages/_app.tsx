import type { AppProps } from 'next/app';
import '../styles/globals.css';
import '../styles/ripple.css';
import { Toaster } from 'react-hot-toast';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Toaster position="top-center" />
      <Component {...pageProps} />
    </>
  );
}
