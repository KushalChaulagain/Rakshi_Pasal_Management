import React, { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MainLayout } from './components/Layout/MainLayout';
import { LoadingSpinner } from './components/LoadingSpinner';

// Lazy load pages for better performance
const Dashboard = React.lazy(() => 
  import('./pages/Dashboard/Dashboard').then(module => ({ default: module.Dashboard }))
);
const PointOfSale = React.lazy(() => 
  import('./pages/POS/PointOfSale').then(module => ({ default: module.PointOfSale }))
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner message="Loading application..." />}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="pos" element={<PointOfSale />} />
            <Route path="*" element={
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h2>
                  <p className="text-gray-600">This feature is coming soon.</p>
                </div>
              </div>
            } />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
