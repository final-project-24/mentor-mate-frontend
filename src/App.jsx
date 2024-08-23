import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./store/authentication-context/AuthenticationContext.jsx";
import { LanguageProvider } from "./store/language-context/LanguageContext.jsx";
import { BookingProvider } from "./store/booking-context/BookingContext";
import HomePage from "./pages/home-page/HomePage.jsx";
import Authentication from "./pages/authentication/Authentication.jsx";
import Settings from "./pages/settings/Settings.jsx";
import MatchMaking from "./pages/match-making/MatchMaking.jsx";
import Schedule from "./pages/schedule/Schedule.jsx";
import Booking from "./pages/booking/Booking.jsx";
import Payment from "./components/payment-details/payment/Payment.jsx";
import Terms from "./pages/terms/Terms.jsx";
import Session from "./pages/session/Session.jsx";
import Feedback from "./pages/feedback/Feedback.jsx";
import Playground from "./pages/playground/Playground.jsx";
import NotFound from "./pages/not-found/NotFound.jsx";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <LanguageProvider>
          <BookingProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/authentication" element={<Authentication />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/match-making" element={<MatchMaking />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/booking/:id" element={<Booking />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/session" element={<Session />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/playground" element={<Playground />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BookingProvider>
        </LanguageProvider>
      </AuthProvider>
    </Router>
  );
}
