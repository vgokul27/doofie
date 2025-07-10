import "../styles/footer.css";


function Footer() {
    return (
        <footer className="footer">
            <div className="footer-brand">
                <h2>DOOFIE API</h2>
                <p>“Cook for yourself before you get cooked by life.”</p>
            </div>

            <div className="footer-links">
                <a href="/home">Home</a>
                <a href="/about">About</a>
                <a href="/add">Add Recipe</a>
                <a href="/apikey">API Key</a>
            </div>

            <div className="footer-socials">
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-github"></i></a>
            </div>

            <div className="footer-copy">
                <p>&copy; 2025 Doofie API. All rights reserved</p>
            </div>
        </footer>
    );
}

export default Footer;