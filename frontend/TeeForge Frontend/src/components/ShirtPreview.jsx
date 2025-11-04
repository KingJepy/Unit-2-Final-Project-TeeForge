import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './ShirtPreview.css';

const shirtColors = ['white', 'black', 'blue', 'red'];

function TShirtDesigner() {
  const location = useLocation();
  const { user } = useAuth();

  const [shirtColor, setShirtColor] = useState('white');
  const [uploadedImage, setUploadedImage] = useState(null);

  // use saved design if coming from saved designs page
  useEffect(() => {
    if (location.state && location.state.design) {
      const { color, image } = location.state.design;
      setShirtColor(color);
      setUploadedImage(image);
    }
  }, [location.state]);

  // Upload image
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    }
  };

  // sdave design to bacend
  const handleSaveDesign = async () => {
    if (!user) {
      alert("You must be logged in to save a design.");
      return;
    }

    try {
      const now = new Date().toISOString(); 

      // save design
      const designData = {
        shirtColor: shirtColor,
        user: { userId: user.userId },
        createdAt: now,
        updatedAt: now
      };

      const designRes = await fetch("http://localhost:8080/api/designs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(designData),
      });

      const savedDesign = await designRes.json();

      // save image if uploaded
      if (uploadedImage) {
        const imageData = {
          design: { designId: savedDesign.designId },
          imageUrl: uploadedImage,
          fileName: "uploadedImage.png", // placeholder for now
          placementX: 0,
          placementY: 0
        };

        await fetch("http://localhost:8080/api/images", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(imageData),
        });
      }

      alert("Design saved successfully!");
    } catch (error) {
      console.error("Error saving design:", error);
      alert("Failed to save design.");
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
