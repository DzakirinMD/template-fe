import '../app/globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function MyApp({ Component, pageProps }) {
  return (
      <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
              <Component {...pageProps} />
          </main>
          <Footer />
      </div>
  );
}

export default MyApp;