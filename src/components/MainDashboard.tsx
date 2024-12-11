import React from 'react'
import { Hero } from './Hero';
import { SearchSection } from './SearchSection';
import { StationMap } from './StationMap';
import { TrackingPage } from './TrackingPage';
import { ReportForm } from './ReportForm';
const MainDashboard = () => {
    const [showReportPage, setShowReportPage] = React.useState(false);
    const [showTrackingPage, setShowTrackingPage] = React.useState(false);
   
  if (showReportPage) {
    return <ReportForm />;
  }

  if (showTrackingPage) {
    return <TrackingPage onBack={() => setShowTrackingPage(false)} />;
  }

  return (
    <div>
         <Hero 
              onReport={() => setShowReportPage(true)}
              onTrack={() => setShowTrackingPage(true)}
            />
            <SearchSection />
            <StationMap />
    </div>
  )
}

export default MainDashboard