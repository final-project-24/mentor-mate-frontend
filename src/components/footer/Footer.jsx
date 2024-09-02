import "./Footer.css";
// import LanguageButton from "../language-button/LanguageButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons"; // Ensure these imports are correct
import iconUrl from "../../assets/images/mentormateLogo.svg"; // Update the path to your logo

export default function Footer() {
  return (
    <footer id="footer">
      <div className="main-flex-container">
        {/* Logo */}
        <div className="footer-section">
          <div className="icon-p">
          <a href="#" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <img src={iconUrl} alt="Logo" className="footer-logo" />
            </a>
            <p>
              Your trusted source to find highly-vetted mentors & industry
              professionals
              <br /> to move your career ahead.
            </p>
          </div>
        </div>

        <div className="footer-section">
          <a href="/about" className="footer-link">
            About
          </a>
          <a href="/terms" className="footer-link">
            Terms
          </a>
        </div>

        {/* Language Button */}
        <iv className="footer-section">
          {/* <LanguageButton /> */}
        </iv>

        {/* Social Media Icons */}
        <div className="footer-section footer-social-media">
          <FontAwesomeIcon icon={faFacebook} className="social-icon" />
          <FontAwesomeIcon icon={faInstagram} className="social-icon" />
          <FontAwesomeIcon icon={faLinkedin} className="social-icon" />
          <FontAwesomeIcon icon={faXTwitter} className="social-icon" />
        </div>
      </div>
    </footer>
  );
}
