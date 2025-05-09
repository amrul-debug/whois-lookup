import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import IpLookupPage from './pages/IpLookupPage';
import DomainLookupPage from './pages/DomainLookupPage';
import MyIpPage from './pages/MyIpPage';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-white transition-colors duration-300">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/ip-lookup" element={<IpLookupPage />} />
              <Route path="/domain-lookup" element={<DomainLookupPage />} />
              <Route path="/my-ip" element={<MyIpPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;