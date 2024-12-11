import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SearchSection } from './components/SearchSection';
import { StationMap } from './components/StationMap';
import { AdminDashboard } from './components/AdminDashboard';
import { ReportForm } from './components/ReportForm';
import { TrackingPage } from './components/TrackingPage';
import { AdminLogin } from './components/admin/AdminLogin';

function App() {
  const [isAdmin] = React.useState(false);
  const [showReportPage, setShowReportPage] = React.useState(false);
  const [showTrackingPage, setShowTrackingPage] = React.useState(false);
  const [showAdminLogin, setShowAdminLogin] = React.useState(false);

  if (showAdminLogin) {
    return <AdminLogin />;
  }

  if (showReportPage) {
    return <ReportForm />;
  }

  if (showTrackingPage) {
    return <TrackingPage onBack={() => setShowTrackingPage(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onReport={() => setShowReportPage(true)}
        onTrack={() => setShowTrackingPage(true)}
        onAdminLogin={() => setShowAdminLogin(true)}
      />
      <main>
        {isAdmin ? (
          <AdminDashboard />
        ) : (
          <>
            <Hero 
              onReport={() => setShowReportPage(true)}
              onTrack={() => setShowTrackingPage(true)}
            />
            <SearchSection />
            <StationMap />
          </>
        )}
      </main>
      
      <footer className="bg-orange-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Emergency Contacts</h3>
              <ul className="space-y-2">
                <li>Police Control Room: 100</li>
                <li>Missing Persons Helpline: 1094</li>
                <li>Command Center: 1800-123-4567</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
              <ul className="space-y-2">
                <li><button onClick={() => setShowReportPage(true)} className="hover:text-orange-300">File Missing Report</button></li>
                <li><button onClick={() => setShowTrackingPage(true)} className="hover:text-orange-300">Track Status</button></li>
                <li><a href="#" className="hover:text-orange-300">Emergency SOS</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">System Status</h3>
              <p className="text-orange-200">
                Facial Recognition System: Active<br />
                Connected Cameras: 156/160<br />
                Last System Update: 5 minutes ago
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-orange-800 text-center text-orange-300">
            <p>© 2024 Simhastha Police Department. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;