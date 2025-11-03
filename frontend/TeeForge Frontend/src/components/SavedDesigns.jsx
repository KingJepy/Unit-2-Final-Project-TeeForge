import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './SavedDesigns.css';

function SavedDesigns() {
    const [designs, setDesigns] = useState([]);
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
      const fetchDesigns = async () => {
        if (!user) return; // don't fetch if not logged in

        try {
          const response = await fetch(`http://localhost:8080/api/designs/user/${user.userId}`);
          if (!response.ok) throw new Error("Failed to fetch designs");
          const data = await response.json();
          setDesigns(data);
        } catch (error) {
          console.error("Error fetching designs:", error);
        }
      };

      fetchDesigns();
    }, [user]);

    const handleDesignClick = (design) => {
        navigate('/design', { state: { design } });
    }

    // If user is not logged in, show message and buttons to log in or register
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
            <div
              className="design-preview"
              style={{ backgroundColor: design.shirtColor }}
            >
              {design.images && design.images[0] && (
                <img
                  src={design.images[0].imageUrl}
                  alt={design.images[0].fileName}
                  className="design-image"
                />
              )}
            </div>
            <h3>Design #{design.designId}</h3>
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








