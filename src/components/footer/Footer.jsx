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
    <footer id="footer" className="sm:bottom-0 left-0 w-full sticky">
      <div className="main-flex-container border border-red-600 h-auto">
        {/* Logo */}
        <div className="footer-section border border-red-600 ">
          <div className="icon-p border border-red-600">
            <a
              href="#"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <img
                src={iconUrl}
                alt="Logo"
                className="footer-logo border border-blue-600 w-48 mx-auto"
              />
            </a>
            <p className="text-center text-sm pt-2">
              Your trusted source to find highly-vetted mentors & industry
              professionals
              <br /> to move your career ahead.
            </p>
          </div>
        </div>

        <div className="footer-section text-center text-sm pt-4 ">
          <a href="/about" className="footer-link px-2 ">
            About
          </a>
          <a href="/terms" className="footer-link px-2">
            Terms
          </a>
        </div>

        {/* Language Button */}
        <iv className="footer-section">{/* <LanguageButton /> */}</iv>

        {/* Social Media Icons */}
        <div className="footer-section footer-social-media flex justify-center pt-4 pb-4 ">
          <FontAwesomeIcon icon={faFacebook} className="social-icon  text-lg" />
          <FontAwesomeIcon icon={faInstagram} className="social-icon text-lg" />
          <FontAwesomeIcon icon={faLinkedin} className="social-icon  text-lg" />
          <FontAwesomeIcon icon={faXTwitter} className="social-icon  text-lg" />
        </div>
      </div>
    <p></p>
    </footer>
  );
}
