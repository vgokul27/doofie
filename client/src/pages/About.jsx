import {
  FaUtensils,
  FaUsers,
  FaCode,
  FaHeart,
  FaShieldAlt,
  FaGlobe,
} from "react-icons/fa";

function About() {
  return (
    <div className="min-h-screen animate-fade-in">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600 text-white py-20 mb-12 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto text-center px-6">
          <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <FaUtensils className="text-4xl text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            About
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              DOOFIE
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Your modern recipe companion built for food lovers, by food lovers
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-white/10 rounded-full animate-bounce-subtle"></div>
        <div className="absolute top-1/2 right-20 w-12 h-12 bg-white/10 rounded-full animate-pulse"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 space-y-16">
        {/* Description */}
        <div className="card p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Welcome to the Future of Recipe Management
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
            <strong className="text-primary-600">Doofie</strong> is a modern,
            user-friendly recipe management and sharing platform built with the
            MERN stack. Whether you're a home cook, a professional chef, or just
            someone who loves experimenting in the kitchen, Doofie helps you
            discover, create, and share culinary masterpieces.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: FaUtensils,
              title: "Recipe Management",
              description:
                "Add, edit, and organize your favorite recipes with detailed instructions and beautiful images",
              color: "from-orange-400 to-red-500",
            },
            {
              icon: FaUsers,
              title: "Community Driven",
              description:
                "Explore dishes from fellow food enthusiasts and share your culinary creations",
              color: "from-blue-400 to-purple-500",
            },
            {
              icon: FaCode,
              title: "API Integration",
              description:
                "Generate your own API key to integrate recipe data into your websites and applications",
              color: "from-green-400 to-blue-500",
            },
            {
              icon: FaHeart,
              title: "Beautiful Design",
              description:
                "Enjoy a stunning, responsive interface that makes cooking and browsing a pleasure",
              color: "from-pink-400 to-red-500",
            },
            {
              icon: FaShieldAlt,
              title: "Secure & Reliable",
              description:
                "Built with Firebase authentication and secure backend infrastructure",
              color: "from-purple-400 to-pink-500",
            },
            {
              icon: FaGlobe,
              title: "Global Access",
              description:
                "Access your recipes anywhere, anytime with our cloud-based platform",
              color: "from-teal-400 to-blue-500",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="card p-8 text-center hover:scale-105 transform transition-all duration-300 group"
            >
              <div
                className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
              >
                <feature.icon className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="card p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Powered by Modern Technology
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-2xl">M</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">MongoDB</h3>
              <p className="text-gray-600">
                Reliable database for storing recipes and user data
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-2xl">F</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">Firebase</h3>
              <p className="text-gray-600">
                Secure authentication and real-time features
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-2xl">R</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">React</h3>
              <p className="text-gray-600">
                Smooth, responsive user experience
              </p>
            </div>
          </div>
        </div>

        {/* Admin Note */}
        <div className="card p-8 bg-gradient-to-r from-primary-50 to-secondary-50 border-l-4 border-primary-500">
          <div className="flex items-start space-x-4">
            <FaShieldAlt className="text-primary-600 text-2xl mt-1" />
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Quality Assurance
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Only authorized administrators can add new recipes, ensuring
                trusted and verified content. All users can explore, view, and
                use recipe data through our comprehensive API.
              </p>
            </div>
          </div>
        </div>

        {/* Quote */}
        <div className="text-center py-12">
          <div className="max-w-2xl mx-auto">
            <blockquote className="text-2xl md:text-3xl font-light text-gray-700 italic leading-relaxed mb-6">
              "Good food is the foundation of genuine happiness."
            </blockquote>
            <cite className="text-lg text-primary-600 font-medium">
              – Auguste Escoffier
            </cite>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
