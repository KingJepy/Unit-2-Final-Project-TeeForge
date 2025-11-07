
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
        if (!res.ok) throw new Error("Failed to fetch designs");
        const data = await res.json();

        // fetch images for each design
        const designsWithImages = await Promise.all(
          data.map(async (design) => {
            try {
              const imagesRes = await fetch(`http://localhost:8080/api/images/design/${design.designId}`);
              if (!imagesRes.ok) return { ...design, images: [] };
              const images = await imagesRes.json();

              const fixedImages = images.map(img => ({
                ...img,
                imageUrl: img.imageUrl.startsWith('data:image')
                  ? img.imageUrl
                  : `data:image/png;base64,${img.imageUrl}`
              }));

              return { ...design, images: fixedImages };
            } catch (imgError) {
              console.error(`Error fetching images for design ${design.designId}:`, imgError);
              return { ...design, images: [] };
            }
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

    if (!design) return;

    const image = design.images && design.images.length > 0 ? design.images[0] : null;

    navigate('/design', { 
      state: { 
        design: {
          shirtColor: design.shirtColor,
          designId: design.designId,

          imageId: image ? image.imageId : null,
          imageUrl: image ? image.imageUrl : null,

          placementX: image ? image.placementX : 0,
          placementY: image ? image.placementY : 0,
          width: image ? image.width || 200 : 200,
          height: image ? image.height || 200 : 200,

        }
      }
    });
  };

  // delete a design
  const handleDeleteDesign = async (designId) => {
    if (!window.confirm("Are you sure you want to delete this design?")) return;

    try {
      const response = await fetch(`http://localhost:8080/api/designs/${designId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setDesigns((prev) => prev.filter((d) => d.designId !== designId));
      } else {
        alert("Failed to delete design.");
      }
    } catch (error) {
      console.error("Error deleting design:", error);
      alert("An error occurred while deleting the design.");
    }
  }


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
          <div key={design.designId} className="design-card-wrapper">
            <button
              className="design-card"
              onClick={() => handleDesignClick(design)}
            >
              {design.images && design.images[0] ? (
                <img
                  src={design.images[0].imageUrl}
                  alt={`Design ${design.designId}`}
                  className="design-image"
                />
              ) : (
                <div className="no-image-placeholder">No Image</div>
              )}
              <h3>{design.shirtColor} Shirt</h3>
            </button>

            <button
              className="delete-design-button"
              onClick={() => handleDeleteDesign(design.designId)}
            >
              Delete
            </button>
          </div>
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








