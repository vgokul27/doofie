import "../styles/about.css";

function About() {
  return (
    <div className="about-container">
     <h2>About Doofie 🍽️</h2>
      <p>
        <strong>Doofie</strong> is a modern, user-friendly recipe management and sharing platform built with the MERN stack. 
        Whether you're a home cook, a professional chef, or just someone who loves experimenting in the kitchen, Doofie helps you:
      </p>

        <ul>
          <li>👨‍🍳 Add your favorite recipes</li>
          <li>📖 Explore delicious dishes with detailed instructions</li>
          <li>🖼️ View beautiful food images with nutrition details</li>
          <li>🔑 Generate your own API key to use recipes in your website</li>
        </ul>

      <p>
        This project is powered by <strong>MongoDB</strong> (for storing recipes), <strong>Firebase</strong> (for secure authentication), and <strong>React</strong> (for a smooth user experience).
      </p>

      <p>
        Only the admin has access to add new recipes, ensuring trusted and verified content. All users can explore, view, and use recipe data via API.
      </p>

      <p style={{ marginTop: "20px", fontStyle: "italic" }}>
        "Good food is the foundation of genuine happiness." – Auguste Escoffier
      </p>

    </div>
  );
}

export default About;
