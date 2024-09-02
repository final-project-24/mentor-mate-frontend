import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./store/authentication-context/AuthenticationContext.jsx";
import { LanguageProvider } from "./store/language-context/LanguageContext.jsx";
import { BookingProvider } from "./store/booking-context/BookingContext";
import { DarkModeProvider } from "./store/dark-mode-context/DarkModeContext";
import HomePage from "./pages/home-page/HomePage.jsx";
import Authentication from "./pages/authentication/Authentication.jsx";
import DashboardLayout from "./components/dashboard-layout/DashboardLayout";
import DashboardHome from "./components/dashboard-home/DashboardHome";
import AdminTools from "./pages/admin-tools/AdminTools.jsx";
import Settings from "./pages/settings/Settings.jsx";
import Search from "./pages/search/Search.jsx";
import Schedule from "./pages/schedule/Schedule.jsx";
import Booking from "./pages/booking/Booking.jsx";
import Payment from "./components/payment-details/payment/Payment.jsx";
import Terms from "./pages/terms/Terms.jsx";
import Session from "./pages/session/Session.jsx";
import Feedback from "./pages/feedback/Feedback.jsx";
import Playground from "./pages/playground/Playground.jsx";
import WhyWe from "./pages/why-we/WhyWe.jsx";
import NotFound from "./pages/not-found/NotFound.jsx";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <LanguageProvider>
          <BookingProvider>
            <DarkModeProvider>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/authentication" element={<Authentication />} />
                <Route path="/dashboard" element={<DashboardLayout />}>
                  <Route index element={<DashboardHome />} />
                  <Route path="search" element={<Search />} />
                  <Route path="schedule" element={<Schedule />} />
                  <Route path="session" element={<Session />} />
                  {/* <Route path="past-sessions" element={<PastSessions />} /> */}
                  <Route path="settings" element={<Settings />} />
                  <Route path="admin-tools" element={<AdminTools />} />
                  {/* <Route path="feedback" element={<Feedback />} /> */}
                </Route>
                <Route path="/booking/:id" element={<Booking />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/feedback" element={<Feedback />} />
                {/* <Route path="/settings" element={<Settings />} /> */}
                {/* <Route path="/search" element={<Search />} /> */}
                {/* <Route path="/schedule" element={<Schedule />} /> */}
                <Route path="/session" element={<Session />} />
                <Route path="/playground" element={<Playground />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </DarkModeProvider>
          </BookingProvider>
        </LanguageProvider>
      </AuthProvider>
    </Router>
  );
}
