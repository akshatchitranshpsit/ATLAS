import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TravelProvider } from './context/TravelContext';
import AppLayout from './components/AppLayout';

import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import AIPlannerPage from './pages/AIPlannerPage';
import DestinationDiscoveryPage from './pages/DestinationDiscoveryPage';
import FlightComparisonPage from './pages/FlightComparisonPage';
import HotelComparisonPage from './pages/HotelComparisonPage';
import InteractiveItineraryPage from './pages/InteractiveItineraryPage';
import BudgetDashboardPage from './pages/BudgetDashboardPage';
import GroupTravelPage from './pages/GroupTravelPage';
import EmergencyAssistancePage from './pages/EmergencyAssistancePage';
import UserProfilePage from './pages/UserProfilePage';
import BookingManagementPage from './pages/BookingManagementPage';

export default function App() {
  return (
    <TravelProvider>
      <BrowserRouter>
        <Routes>
          {/* Standalone Public / Onboarding Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />

          {/* Platform Workspace Routes wrapped in AppLayout */}
          <Route
            path="/dashboard"
            element={
              <AppLayout>
                <DashboardPage />
              </AppLayout>
            }
          />
          <Route
            path="/planner"
            element={
              <AppLayout>
                <AIPlannerPage />
              </AppLayout>
            }
          />
          <Route
            path="/discover"
            element={
              <AppLayout>
                <DestinationDiscoveryPage />
              </AppLayout>
            }
          />
          <Route
            path="/flights"
            element={
              <AppLayout>
                <FlightComparisonPage />
              </AppLayout>
            }
          />
          <Route
            path="/hotels"
            element={
              <AppLayout>
                <HotelComparisonPage />
              </AppLayout>
            }
          />
          <Route
            path="/itinerary"
            element={
              <AppLayout>
                <InteractiveItineraryPage />
              </AppLayout>
            }
          />
          <Route
            path="/budget"
            element={
              <AppLayout>
                <BudgetDashboardPage />
              </AppLayout>
            }
          />
          <Route
            path="/group"
            element={
              <AppLayout>
                <GroupTravelPage />
              </AppLayout>
            }
          />
          <Route
            path="/emergency"
            element={
              <AppLayout>
                <EmergencyAssistancePage />
              </AppLayout>
            }
          />
          <Route
            path="/profile"
            element={
              <AppLayout>
                <UserProfilePage />
              </AppLayout>
            }
          />
          <Route
            path="/bookings"
            element={
              <AppLayout>
                <BookingManagementPage />
              </AppLayout>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </TravelProvider>
  );
}
