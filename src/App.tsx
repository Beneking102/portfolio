import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AnimatedBackground from './components/background';
import Navbar from './components/navbar';

const Home = lazy(() => import('./Pages/home'));
const About = lazy(() => import('./Pages/about'));
const Portfolio = lazy(() => import('./Pages/portofolio'));
const ContactPage = lazy(() => import('./Pages/contact'));
const WelcomeScreen = lazy(() => import('./Pages/welcome-screen'));
const ProjectDetails = lazy(() => import('./components/ProjectDetail'));

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="mt-8">
      <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6" />
      <div className="text-center text-sm text-gray-500 dark:text-gray-400 pb-4">
        © {currentYear} <span className="font-semibold">Benedikt Pankratz™</span>. All Rights Reserved.
      </div>
    </footer>
  );
};

const LandingPage = ({ showWelcome, setShowWelcome }) => (
  <>
    <Suspense fallback={null}>
      {showWelcome && <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />}
    </Suspense>

    {!showWelcome && (
      <Suspense fallback={<div>Und wir warten... und wir warten...</div>}>
        <Navbar />
        <AnimatedBackground />
        <main>
          <Home />
          <About />
          <Portfolio />
          <ContactPage />
        </main>
        <Footer />
      </Suspense>
    )}
  </>
);

const ProjectPageLayout = () => (
  <>
    <Suspense fallback={<div>Lade Projekte...</div>}>
      <ProjectDetails />
      <Footer />
    </Suspense>
  </>
);

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage showWelcome={showWelcome} setShowWelcome={setShowWelcome} />} />
        <Route path="/project/:id" element={<ProjectPageLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
