
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './SavedDesigns.css';

function SavedDesigns() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [designs, setDesigns] = useState([]);

  // get all designs for user
  useEffect(() => {
    if (!user) return;

    const fetchDesigns = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/designs/user/${user.userId}`);
        const data = await res.json();

        // fetch images for each design
        const designsWithImages = await Promise.all(
          data.map(async (design) => {
            const imagesRes = await fetch(`http://localhost:8080/api/images/design/${design.designId}`);
            const images = await imagesRes.json();
            return { ...design, images };
          })
        );

        setDesigns(designsWithImages);
      } catch (error) {
        console.error("Error fetching designs:", error);
      }
    };

    fetchDesigns();
  }, [user]);

  // clicking on design navigates to design page with design data
  const handleDesignClick = (design) => {
    const image = design.images && design.images.length > 0 ? design.images[0].imageUrl : null;
    navigate('/design', { state: { design: { color: design.shirtColor, image } } });
  };

  // user not logged in message
  if (!user) {
    return (
      <div className="saved-designs-container">
        <h2>Saved Designs</h2>
        <div className="not-logged-in-message">
          <p>You must be logged in to view your saved designs.</p>
          <div className="auth-buttons">
            <button onClick={() => navigate("/login")}>Log In</button>
            <button onClick={() => navigate("/register")}>Create Account</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="saved-designs-container">
      <h2>Your Saved Designs</h2>

      <div className="design-grid">
        {designs.map((design) => (
          <button
            key={design.designId}
            className="design-card"
            onClick={() => handleDesignClick(design)}
          >
            {design.images && design.images[0] && (
              <img
                src={design.images[0].imageUrl}
                alt={design.designId}
                className="design-image"
              />
            )}
            <h3>{design.shirtColor} Shirt</h3>
          </button>
        ))}

        <button
          className="add-design-button"
          onClick={() => navigate("/design")}
          aria-label="Create New Design"
        >
          +
        </button>
      </div>
    </div>
  );

}


export default SavedDesigns;








