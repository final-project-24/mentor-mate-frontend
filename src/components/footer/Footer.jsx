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
import Logo from '../../assets/images/icon.svg'

export default function Footer() {
  return (
    <footer id="footer" className="bottom-0 left-0  w-full ">
      <div className="main-flex-container h-auto md:flex md:items-center md:justify-center  ">
        {/* Logo */}
        <div className="footer-section flex flex-row items-center md: md:w-5/6  ">
          <div className="icon-p  w-1/3  md:w-1/2  ">
            <a
              href="#"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <img src={Logo} alt="Logo" className="footer-logo mx-auto " />
            </a>
            <p className="hidden   text-center text-sm pt-2">
              Your trusted source to find highly-vetted mentors & industry
              professionals
              <br /> to move your career ahead.
            </p>
          </div>
          <div className=" md:w-1/2  ">
            <div className="footer-section text-center text-sm  first-line:">
              <a href="/about" className="footer-link  text-base px-5 ">
                About
              </a>
              <a href="/terms" className="footer-link text-base px-5 ">
                Terms
              </a>
            </div>

            {/* Language Button */}
            <div className="footer-section">{/* <LanguageButton /> */}</div>

            {/* Social Media Icons */}
            <div className="footer-section footer-social-media flex justify-around pt-4 pb-4 ">
              <FontAwesomeIcon
                icon={faFacebook}
                className="social-icon  text-lg"
              />
              <FontAwesomeIcon
                icon={faInstagram}
                className="social-icon text-lg"
              />
              <FontAwesomeIcon
                icon={faLinkedin}
                className="social-icon  text-lg"
              />
              <FontAwesomeIcon
                icon={faXTwitter}
                className="social-icon  text-lg"
              />
            </div>
          </div>
        </div>
      </div>
      <p></p>
    </footer>
  );
}
