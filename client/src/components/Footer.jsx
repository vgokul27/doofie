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
