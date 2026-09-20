import './App.css';
import Navbar from './Components/Nav/Navbar';
import { Route, Routes } from 'react-router-dom';
import { Home } from './Components/Screen/Home';
import { About } from './Components/Screen/About';
import { ContactUs } from './Components/Screen/ContactUs';
import { OurPackage } from './Components/Screen/OurPackage';
import Footer from './Components/Footer/Footer';
import ScrollToTop from './Components/Reuseable/ScrollToTop';
import NotFound from './Components/Reuseable/Notfound';

function App() {
  return (
    <div className="App bg-[#f7f9f6]">
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact-us' element={<ContactUs />} />
          <Route path='/our-tour-packages' element={<OurPackage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </main>
    </div>
  );
}

export default App;
