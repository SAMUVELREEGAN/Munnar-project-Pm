import { lazy, Suspense } from 'react';
import './App.css';
import Navbar from './Components/Nav/Navbar';
import { Route, Routes } from 'react-router-dom';
import { Home } from './Components/Screen/Home';
import Footer from './Components/Footer/Footer';
import ScrollToTop from './Components/Reuseable/ScrollToTop';

// Code-split secondary routes to shrink the initial JS bundle and optimize main-thread INP
const About = lazy(() => import('./Components/Screen/About').then((m) => ({ default: m.About })));
const ContactUs = lazy(() => import('./Components/Screen/ContactUs').then((m) => ({ default: m.ContactUs })));
const OurPackage = lazy(() => import('./Components/Screen/OurPackage').then((m) => ({ default: m.OurPackage })));
const Places = lazy(() => import('./Components/Screen/Places').then((m) => ({ default: m.Places })));
const NotFound = lazy(() => import('./Components/Reuseable/Notfound'));

function App() {
  return (
    <div className="App relative min-h-screen w-full overflow-x-hidden bg-white flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 w-full overflow-x-hidden pb-[calc(5.25rem+env(safe-area-inset-bottom))] lg:pb-0">
        <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center" aria-hidden="true" />}>
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
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
