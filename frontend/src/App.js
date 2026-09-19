import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Nav/Navbar';
import { Route, Routes } from 'react-router-dom';
import { Home } from './Components/Screen/Home';
import { About } from './Components/Screen/About';
import { ContactUs } from './Components/Screen/ContactUs';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact-us' element={<ContactUs />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
