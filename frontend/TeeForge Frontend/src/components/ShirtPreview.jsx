import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './ShirtPreview.css';

const shirtColors = ['white', 'black', 'blue', 'red'];

function TShirtDesigner() {
  const location = useLocation();
  const [shirtColor, setShirtColor] = useState('white');
  const [uploadedImage, setUploadedImage] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (location.state && location.state.design) {
      const { color, image, shirtColor: savedColor, images } = location.state.design;
      setShirtColor(savedColor || color || 'white');
      
      if (images && images.length > 0) {
        setUploadedImage(images[0].imageUrl);
      } else if (image) {
        setUploadedImage(image);
      }
    }
  }, [location.state]);

  //take the file and create a url and send it to state
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    }
  };



  // placeholder for later 
  const handleSaveDesign = async () => {
    if (!user) {
      alert("You must be logged in to save designs.");
      return;
    }

    const designData = {
      shirtColor,
      user: { userId: user.userId },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      const response = await fetch('http://localhost:8080/api/designs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(designData),
      });

      if (response.ok) {
        const savedDesign = await response.json();
        console.log("Design saved:", savedDesign);
        alert("Design saved successfully!");
      } else {
        console.error("Failed to save design:", response.status);
        alert("Failed to save design.");
      } 
    }catch (error) {
      console.error("Error saving design:", error);
      alert("Error connecting to server.");
    }
  };

  return (
    <div className="designer-container">
      <div className="left-panel">
        <div className="colors">
          <h3>Shirt Colors</h3>
          {shirtColors.map((color) => (
            <label key={color}>
              <input
                type="radio"
                value={color}
                checked={shirtColor === color}
                onChange={() => setShirtColor(color)}
              />
              {color}
            </label>
          ))}
        </div>

        <div className="upload-section">
          <h3>Upload Your Design</h3>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>

        <div className="button-group">
          <Link to="/orders" className="order-link">
            Order Your Shirt
          </Link>

          <Link to="/saved-designs" className="view-saved-link">
            View Saved Designs
          </Link>

          <button onClick={handleSaveDesign} className="save-design-btn">
            Save Design
          </button>
        </div>
      </div>

      <div className="shirt-preview">
        <div className="shirt-container">
          <div className={`shirt-background ${shirtColor}`}>
            {uploadedImage && (
              <img
                src={uploadedImage}
                alt="Uploaded"
                className="design-preview"
              />
            )}
          </div>
          <img
            src="/blank-shirt.png"
            alt="blank-shirt"
            className="shirt-outline"
          />
        </div>
      </div>
    </div>
  );
}

export default TShirtDesigner;
