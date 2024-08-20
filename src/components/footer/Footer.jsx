import "./Footer.css";
import LanguageButton from "../language-button/LanguageButton";

export default function Footer() {
  return (
    <>
      <footer id="footer">
        <div className="flex-container">
          <LanguageButton />
          <p>Footer: part of layout component</p>
        </div>
      </footer>
    </>
  );
}
