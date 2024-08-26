import "./Footer.css";
import LanguageButton from "../language-button/LanguageButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons';


export default function Footer() {
  return (
    <>


      <footer id="footer">
        <div className="flex-container">
          <LanguageButton />
          <p>© 2024 Your Mentor Mate. All Rights Reserved.</p>
          <FontAwesomeIcon icon={faFacebook} />
  
          
        </div>

      </footer>
    </>
  );
}
