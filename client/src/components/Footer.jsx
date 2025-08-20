<<<<<<< HEAD
function Footer() {
    return (
        <footer style={{
            background: 'rgba(26, 26, 46, 0.8)',
            backdropFilter: 'blur(10px)',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            marginTop: 'auto',
            padding: '1.5rem 0',
            textAlign: 'center',
            width: '100%'
        }}>
            <p style={{
                color: '#9ca3af',
                fontSize: '0.875rem',
                margin: 0
            }}>
                &copy; 2025 Doofie. All rights reserved.
            </p>
        </footer>
    );
}

export default Footer;
=======
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
            <div className="footer-wrapper">
                {/* Left Image */}
                <div className="footer-image left">
                <img src="/heartbeat-removebg-preview.png" alt="Heartbeat" />
                </div>

                {/* Center Content */}
                <div className="footer-center">
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
                </div>

                {/* Right Image */}
                <div className="footer-image right">
                <img src="/heartbeat-removebg-preview.png" alt="Heartbeat" />
                </div>
            </div>
        </footer>

    );
}

export default Footer;
>>>>>>> 0ac0eaab49ef9dd1d70312cbcba3ece64b1ea6cb
