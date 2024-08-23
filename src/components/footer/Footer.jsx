import "./Footer.css";
import LanguageButton from "../language-button/LanguageButton";

export default function Footer() {
  return (
    <>
      <footer id="footer">
        <div className="flex-container">
          <LanguageButton />
        </div>
      </footer>
    </>
  );
}
