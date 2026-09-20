import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Nav/Navbar';
import { Route, Routes } from 'react-router-dom';
import { Home } from './Components/Screen/Home';
import { About } from './Components/Screen/About';
import { ContactUs } from './Components/Screen/ContactUs';
import { OurPackage } from './Components/Screen/OurPackage';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact-us' element={<ContactUs />} />
          <Route path='/our-tour-packages' element={<OurPackage />} />
        </Routes>
        <Footer />
      </main>
    </div>
  );
}

export default App;
