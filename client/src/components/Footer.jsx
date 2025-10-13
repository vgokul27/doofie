import {
  FaInstagram,
  FaTwitter,
  FaGithub,
  FaHeart,
  FaEnvelope,
  FaUtensils,
  FaHome,
  FaPlus,
  FaInfoCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  const handleNavClick = (path) => {
    navigate(path);
  };

  const quickLinks = [
    { path: "/home", label: "Home", icon: FaHome },
    { path: "/addrecipe", label: "Add Recipe", icon: FaPlus },
    { path: "/about", label: "About", icon: FaInfoCircle },
    { path: "/favourites", label: "Favourites", icon: FaHeart },
  ];

  const socialLinks = [
    {
      href: "https://instagram.com",
      icon: FaInstagram,
      label: "Instagram",
      color: "hover:text-pink-500",
    },
    {
      href: "https://twitter.com",
      icon: FaTwitter,
      label: "Twitter",
      color: "hover:text-blue-400",
    },
    {
      href: "https://github.com",
      icon: FaGithub,
      label: "GitHub",
      color: "hover:text-gray-900",
    },
  ];

  return (
    <footer className="bg-slate-900 text-white w-full mt-10">
      <div className="pt-12 pb-0">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <FaUtensils className="text-white text-xl" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
                  DOOFIE
                </h3>
              </div>

              <blockquote className="text-lg text-gray-300 mb-6 italic leading-relaxed">
                "Cook for yourself before you get cooked by life."
              </blockquote>

              <p className="text-gray-400 leading-relaxed mb-6">
                Doofie is your modern recipe companion, helping food lovers
                discover, create, and share culinary masterpieces. From home
                cooks to professional chefs, we're here to inspire your culinary
                journey.
              </p>

              {/* Contact Info */}
              <div className="flex items-center space-x-3 text-gray-400">
                <FaEnvelope className="text-primary-500" />
                <span>recipes@doofie.com</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xl font-bold text-white mb-6">Quick Links</h4>
              <ul className="space-y-4">
                {quickLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <li key={link.path}>
                      <button
                        onClick={() => handleNavClick(link.path)}
                        className="flex items-center space-x-3 text-gray-300 hover:text-primary-400 transition-colors duration-200 group"
                      >
                        <Icon className="text-sm group-hover:text-primary-500" />
                        <span>{link.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Social & Support */}
            <div>
              <h4 className="text-xl font-bold text-white mb-6">
                Connect With Us
              </h4>

              {/* Social Links */}
              <div className="flex space-x-4 mb-6">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-700 transition-all duration-300 transform hover:scale-110 ${social.color}`}
                      aria-label={social.label}
                    >
                      <Icon className="text-lg" />
                    </a>
                  );
                })}
              </div>

              <div className="space-y-3 text-gray-400">
                <div className="flex items-center space-x-3">
                  <FaHeart className="text-red-500" />
                  <span className="text-sm">
                    Made with love for food lovers
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8 pb-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              {/* Copyright */}
              <div className="text-gray-400 text-sm">
                <p>&copy; 2025 Doofie Recipe Platform. All rights reserved.</p>
              </div>

              {/* Additional Links */}
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <button
                  onClick={() => handleNavClick("/about")}
                  className="hover:text-primary-400 transition-colors duration-200"
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() => handleNavClick("/about")}
                  className="hover:text-primary-400 transition-colors duration-200"
                >
                  Terms of Service
                </button>
                <button
                  onClick={() => handleNavClick("/about")}
                  className="hover:text-primary-400 transition-colors duration-200"
                >
                  Support
                </button>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-1/2 left-4 w-32 h-32 bg-primary-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-4 w-24 h-24 bg-secondary-500/5 rounded-full blur-2xl"></div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
