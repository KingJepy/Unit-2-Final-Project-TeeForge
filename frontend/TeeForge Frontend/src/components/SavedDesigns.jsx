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
                color: "blue",
                image: "/example1.png",
                name: "Cool Blue Design",
            },
            {
                id: 2,
                color: "red",
                image: "/example2.png",
                name: "Radical Red Design",
            },
            {
                id: 3,
                color: "white",
                image: "/example3.png",
                name: "Classic White Design",
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








