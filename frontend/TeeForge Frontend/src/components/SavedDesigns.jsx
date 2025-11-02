import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SavedDesigns.css';



function SavedDesigns() {
    const [designs, setDesigns] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        
        // Dummy data for saved designs
        const dummyData = [
            {
                id: 1,
                name: "Sunset Tee",
                imageUrl: "/images/sample1.png",
                shirtColor: "blue",
                imagePosition: { x: 100, y: 150 },
                imageSize: { width: 120, height: 120 },
            },
            {
                id: 2,
                name: "Spider Tee",
                imageUrl: "/images/sample2.png",
                shirtColor: "red",
                imagePosition: { x: 80, y: 130 },
                imageSize: { width: 100, height: 100 },
            },
        ];

        setDesigns(dummyData);
    }, []);

    const handleDesignClick = (design) => {
        navigate('/design', { state: { design } });
    }

  return (
    <div className="saved-designs-container">
      <h2>Your Saved Designs</h2>

      <div className="design-grid">
        {designs.map((design) => (
          <button
            key={design.id}
            className="design-card"
            onClick={() => handleDesignClick(design)}
          >
            <img
              src={design.imageUrl}
              alt={design.name}
              className="design-image"
            />
            <h3>{design.name}</h3>
          </button>
        ))}

        <button
          className="add-design-button"
          onClick={() => navigate("/shirtpreview")}
          aria-label="Create New Design"
        >
          +
        </button>
      </div>
    </div>
  );

}


export default SavedDesigns;








