import "../styles/footer.css";
import { FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Footer() {
    const navigate = useNavigate();

    const handleNavClick = (path) => {
    navigate(path);
  };

    return (
        <footer className="footer">
            <div className="footer-brand">
                <p>“Cook for yourself before you get cooked by life.”</p>
            </div>

            <ul className="footer-links">
                <li onClick={() => handleNavClick('/about')}>About Doofie</li>
            </ul>

            <div className="contact-us">Contact Us :</div>

            <div className="footer-socials">
                <a href="#"><FaInstagram className="fab fa-instagram" /></a>
                <a href="#"><FaTwitter className="fab fa-twitter" /></a>
                <a href="#"><FaGithub className="fab fa-github" /></a>
            </div>

            <div className="footer-copy">
                <p>&copy; 2025 Doofie API. All rights reserved</p>
            </div>
        </footer>
    );
}

export default Footer;