import './App.css';
import Navbar from './Components/Nav/Navbar';
import { Route, Routes } from 'react-router-dom';
import { Home } from './Components/Screen/Home';
import { About } from './Components/Screen/About';
import { ContactUs } from './Components/Screen/ContactUs';
import { OurPackage } from './Components/Screen/OurPackage';
import { Places } from './Components/Screen/Places';
import Footer from './Components/Footer/Footer';
import ScrollToTop from './Components/Reuseable/ScrollToTop';
import NotFound from './Components/Reuseable/Notfound';

function App() {
  return (
    <div className="App relative min-h-screen w-full overflow-x-hidden bg-cream flex flex-col">
      <div className="site-grain" aria-hidden="true" />
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 w-full overflow-x-hidden pb-[calc(5.25rem+env(safe-area-inset-bottom))] lg:pb-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/our-tour-packages" element={<OurPackage />} />
          <Route path="/packages" element={<OurPackage />} />
          <Route path="/places-to-visit" element={<Places />} />
          <Route path="/placetovisit" element={<Places />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
