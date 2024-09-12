import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./store/authentication-context/AuthenticationContext.jsx";
import { LanguageProvider } from "./store/language-context/LanguageContext.jsx";
import { BookingProvider } from "./store/booking-context/BookingContext";
import { DarkModeProvider } from "./store/dark-mode-context/DarkModeContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/home-page/HomePage.jsx";
import Authentication from "./pages/authentication/Authentication.jsx";
import DashboardLayout from "./components/dashboard-layout/DashboardLayout";
import DashboardHome from "./pages/dashboard-home/DashboardHome.jsx";
import AdminTools from "./pages/admin-tools/AdminTools.jsx";
import Settings from "./pages/settings/Settings.jsx";
import Search from "./pages/search/Search.jsx";
import Schedule from "./pages/schedule/Schedule.jsx";
import DeleteSessions from "./pages/delete-sessions/DeleteSessions.jsx";
import Booking from "./pages/booking/Booking.jsx";
import Terms from "./pages/terms/Terms.jsx";
import SessionPreview from "./pages/session-preview/SessionPreview.jsx";
import Session from "./pages/session/Session.jsx";
import SessionHistory from "./pages/session-history/SessionHistory.jsx";
import Feedback from "./pages/feedback/Feedback.jsx";
import Playground from "./pages/playground/Playground.jsx";
import WhyWe from "./pages/why-we/WhyWe.jsx";
import NotFound from "./pages/not-found/NotFound.jsx";
import ManageSkills from "./components/skills/manage-skills/ManageSkills.jsx"
import Pricing from "./pages/pricing/Pricing.jsx";
import AboutUs from "./pages/about-us/AboutUs.jsx";


export default function App() {
  return (
    <>
      <ToastContainer theme="colored" />
      <Router>
        <AuthProvider>
          <LanguageProvider>
            <BookingProvider>
              <DarkModeProvider>
                <Routes>
                  {/* <Route path="/" element={<HomePage />} /> */}
                  <Route path="/" element={<WhyWe />} />
                  <Route path="/authentication" element={<Authentication />} />
                  <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route  index element={<DashboardHome />} />
                    <Route path="search" element={<Search />} />
                    <Route path="schedule" element={<Schedule />} />
                    <Route path="delete-sessions" element={<DeleteSessions />} />
                    <Route path="session" element={<Session />} />
                    <Route path="session-history" element={<SessionHistory />} />
                    {/* <Route path="past-sessions" element={<PastSessions />} /> */}
                    <Route path="settings" element={<Settings />} />
                    <Route path="admin-tools" element={<AdminTools />}>
                      {/* <Route index element={<AdminTools />} /> */}
                      <Route path="admin-skills" element={<ManageSkills />} />
                    </Route>
                    <Route path="mentor-skills" element={<ManageSkills />} />
                    {/* <Route path="feedback" element={<Feedback />} /> */}
                  </Route>
                  <Route path="/search" element={<Search />} />
                  <Route path="/schedule" element={<Schedule />} />
                  <Route path="/booking/:id" element={<Booking />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/session-preview" element={<SessionPreview />} />
                  <Route path="/feedback" element={<Feedback />} />
                  {/* <Route path="/settings" element={<Settings />} /> */}
                  {/* <Route path="/search" element={<Search />} /> */}
                  {/* <Route path="/session" element={<Session />} /> */}
                  <Route path="/playground" element={<Playground />} />
                  <Route path="*" element={<NotFound />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/about-us" element={<AboutUs />} />
                </Routes>
              </DarkModeProvider>
            </BookingProvider>
          </LanguageProvider>
        </AuthProvider>
      </Router>
    </>
  );
}
