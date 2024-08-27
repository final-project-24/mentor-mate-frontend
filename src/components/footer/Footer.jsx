import "./Footer.css";
import LanguageButton from "../language-button/LanguageButton";

export default function Footer() {
  return (
    <>

      <footer id="footer" className="bottom-0 w-full fixed bg-secondary text-white ">

        <div className="flex-container">
          <LanguageButton />
        </div>
      </footer>
    </>
  );
}
