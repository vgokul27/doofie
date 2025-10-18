import { motion } from "framer-motion";
import {
  FaUtensils,
  FaUsers,
  FaCode,
  FaHeart,
  FaShieldAlt,
  FaGlobe,
  FaReact,
  FaNodeJs,
  FaDatabase,
} from "react-icons/fa";
import { SiMongodb, SiFirebase, SiExpress } from "react-icons/si";
import {
  pageVariants,
  pageTransition,
  containerVariants,
  cardVariants,
  fadeInUpVariants,
  scaleVariants,
} from "../utils/animations";

function About() {
  return (
    <motion.div
      className="min-h-screen"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {/* Main Content */}
      <motion.div
        className="max-w-6xl mx-auto px-4 space-y-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Description */}
        <motion.div
          className="card p-8 md:p-12 text-center"
          variants={fadeInUpVariants}
        >
          <motion.h2
            className="text-3xl font-bold text-gray-800 mb-6"
            variants={scaleVariants}
          >
            Welcome to the Future of Recipe Management
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <strong className="text-primary-600">Doofie</strong> is a modern,
            user-friendly recipe management and sharing platform built with the
            MERN stack. Whether you're a home cook, a professional chef, or just
            someone who loves experimenting in the kitchen, Doofie helps you
            discover, create, and share culinary masterpieces.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
        >
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
            <motion.div
              key={index}
              className="card p-8 text-center group"
              variants={cardVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <feature.icon className="text-white text-2xl" />
              </motion.div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech Stack */}
        <motion.div className="card p-8 md:p-12" variants={fadeInUpVariants}>
          <motion.h2
            className="text-3xl font-bold text-gray-800 mb-8 text-center"
            variants={scaleVariants}
          >
            Powered by Modern Technology
          </motion.h2>

          {/* Frontend Technologies */}
          <motion.div className="mb-12" variants={containerVariants}>
            <motion.h3
              className="text-xl font-semibold text-gray-700 mb-6 text-center"
              variants={fadeInUpVariants}
            >
              Frontend Technologies
            </motion.h3>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center"
              variants={containerVariants}
            >
              <motion.div
                className="space-y-4"
                variants={cardVariants}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <motion.div
                  className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <FaReact className="text-white text-3xl" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800">React</h3>
                <p className="text-gray-600">
                  Modern UI library for smooth, responsive user experience
                </p>
              </motion.div>
              <motion.div
                className="space-y-4"
                variants={cardVariants}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <motion.div
                  className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto"
                  whileHover={{ rotate: -5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <SiFirebase className="text-white text-3xl" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800">Firebase</h3>
                <p className="text-gray-600">
                  Secure authentication and real-time features
                </p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Backend Technologies */}
          <motion.div variants={containerVariants}>
            <motion.h3
              className="text-xl font-semibold text-gray-700 mb-6 text-center"
              variants={fadeInUpVariants}
            >
              Backend Technologies
            </motion.h3>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
              variants={containerVariants}
            >
              <motion.div
                className="space-y-4"
                variants={cardVariants}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <motion.div
                  className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <FaNodeJs className="text-white text-3xl" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800">Node.js</h3>
                <p className="text-gray-600">
                  JavaScript runtime for scalable server-side applications
                </p>
              </motion.div>
              <motion.div
                className="space-y-4"
                variants={cardVariants}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <motion.div
                  className="w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl flex items-center justify-center mx-auto"
                  whileHover={{ rotate: -5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <SiExpress className="text-white text-3xl" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800">Express.js</h3>
                <p className="text-gray-600">
                  Fast, minimalist web framework for Node.js APIs
                </p>
              </motion.div>
              <motion.div
                className="space-y-4"
                variants={cardVariants}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <motion.div
                  className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <SiMongodb className="text-white text-3xl" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800">MongoDB</h3>
                <p className="text-gray-600">
                  NoSQL database for flexible recipe and user data storage
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Admin Note */}
        <motion.div
          className="card p-8 bg-gradient-to-r from-primary-50 to-secondary-50 border-l-4 border-primary-500"
          variants={fadeInUpVariants}
          whileHover={{ scale: 1.02, x: 5 }}
        >
          <motion.div
            className="flex items-start space-x-4"
            variants={containerVariants}
          >
            <motion.div
              whileHover={{ rotate: 10, scale: 1.2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <FaShieldAlt className="text-primary-600 text-2xl mt-1" />
            </motion.div>
            <motion.div variants={fadeInUpVariants}>
              <motion.h3
                className="text-xl font-bold text-gray-800 mb-2"
                variants={scaleVariants}
              >
                Quality Assurance
              </motion.h3>
              <motion.p
                className="text-gray-700 leading-relaxed"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Only authorized administrators can add new recipes, ensuring
                trusted and verified content. All users can explore, view, and
                use recipe data through our comprehensive API.
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Quote */}
        <motion.div className="text-center py-12" variants={fadeInUpVariants}>
          <motion.div
            className="max-w-2xl mx-auto"
            variants={containerVariants}
          >
            <motion.blockquote
              className="text-2xl md:text-3xl font-light text-gray-700 italic leading-relaxed mb-6"
              variants={scaleVariants}
              whileHover={{ scale: 1.02 }}
            >
              "Good food is the foundation of genuine happiness."
            </motion.blockquote>
            <motion.cite
              className="text-lg text-primary-600 font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              – Auguste Escoffier
            </motion.cite>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default About;
