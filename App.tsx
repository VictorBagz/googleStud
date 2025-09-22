
import React, { useEffect, Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, useLocation, Outlet, Navigate } from 'react-router-dom';
import AOS from 'aos';
import { Navbar, Footer } from './components';
import { AuthProvider, useAuth } from './AuthContext';

// Lazy load pages for better initial load performance
const HomePage = lazy(() => import('./pages/HomePage'));
const EventsPage = lazy(() => import('./pages/EventsPage'));
const WorkplanPage = lazy(() => import('./pages/WorkplanPage'));
const LeadershipPage = lazy(() => import('./pages/LeadershipPage'));

const MedicalFundPage = lazy(() => import('./pages/StaticPages').then(module => ({ default: module.MedicalFundPage })));
const PhotosPage = lazy(() => import('./pages/StaticPages').then(module => ({ default: module.PhotosPage })));
const RegistrationPage = lazy(() => import('./pages/AuthPages').then(module => ({ default: module.RegistrationPage })));
const SignInPage = lazy(() => import('./pages/AuthPages').then(module => ({ default: module.SignInPage })));
const DashboardPage = lazy(() => import('./pages/DashboardPage').then(module => ({ default: module.DashboardPage })));


const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center h-screen bg-light-gray">
        <div className="w-16 h-16 border-4 border-primary-red border-dashed rounded-full animate-spin"></div>
    </div>
);

const Layout: React.FC = () => (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Suspense fallback={<LoadingSpinner />}>
            <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
);

const ProtectedRouteWrapper: React.FC = () => {
    const { currentUser, loading } = useAuth();
    if (loading) return <LoadingSpinner />;
    return currentUser ? <Outlet /> : <Navigate to="/signin" replace />;
};

const AppContent: React.FC = () => {
    useEffect(() => {
        AOS.init({
          duration: 800,
          easing: 'ease-in-out',
          once: true,
          mirror: false
        });
    }, []);

    return (
      <>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="workplan" element={<WorkplanPage />} />
            <Route path="leadership" element={<LeadershipPage />} />
            <Route path="medical-fund" element={<MedicalFundPage />} />
            <Route path="photos" element={<PhotosPage />} />
            <Route path="registration" element={<RegistrationPage />} />
            <Route path="signin" element={<SignInPage />} />
            
            <Route element={<ProtectedRouteWrapper />}>
              <Route path="dashboard" element={<DashboardPage />} />
            </Route>
            
            <Route path="*" element={<HomePage />} />
          </Route>
        </Routes>
      </>
    );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </HashRouter>
  );
};

export default App;
