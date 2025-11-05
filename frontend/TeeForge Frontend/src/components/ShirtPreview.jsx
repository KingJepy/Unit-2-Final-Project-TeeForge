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
  const [designId, setDesignId] = useState(null);
  const [imageId, setImageId] = useState(null);

  // use saved design if coming from saved designs page
  useEffect(() => {
    if (location.state && location.state.design) {
      const {
        shirtColor,
        image,
        designId: savedDesignId,
        imageId: savedImageId,
      } = location.state.design;

      setShirtColor(shirtColor);
      setUploadedImage(image);

      if (savedDesignId) setDesignId(savedDesignId);
      if (savedImageId) setImageId(savedImageId);
    }
  }, [location.state]);

  // Upload image
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // save or update design to backend
  const handleSaveDesign = async () => {
    if (!user) {
      alert('You must be logged in to save a design.');
      return;
    }

    try {
      const now = new Date().toISOString();

      const designData = {
        shirtColor,
        user: { userId: user.userId },
        createdAt: now,
        updatedAt: now,
      };

      let savedDesign;

      // update existing design
      if (designId) {
        const designRes = await fetch(
          `http://localhost:8080/api/designs/${designId}`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(designData),
          }
        );

        if (!designRes.ok) throw new Error('Failed to update design');
        savedDesign = await designRes.json();
        console.log('Design updated:', savedDesign);
      } else {
        // create new design
        const designRes = await fetch('http://localhost:8080/api/designs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(designData),
        }); 

        if (!designRes.ok) throw new Error('Failed to save design');
        savedDesign = await designRes.json();
        setDesignId(savedDesign.designId);
        console.log('Design saved:', savedDesign);
      }

      // save or update image
      if (uploadedImage) {
        const imageData = {
          design: { designId: savedDesign.designId },
          imageUrl: uploadedImage,
          fileName: `design_${savedDesign.designId}.png`,
          placementX: 0,
          placementY: 0,
        };

        if (imageId) {
          const imageRes = await fetch(
            `http://localhost:8080/api/images/${imageId}`,
            {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(imageData),
            }
          );

          if (!imageRes.ok) throw new Error('Failed to update image');
          const updatedImage = await imageRes.json();
          console.log('Image updated:', updatedImage);
        } else {
          const imageRes = await fetch('http://localhost:8080/api/images', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(imageData),
          });

          if (!imageRes.ok) throw new Error('Failed to save image');
          const savedImage = await imageRes.json();
          setImageId(savedImage.imageId);
          console.log('Image saved:', savedImage);
        }
      }

      alert(
        designId
          ? 'Design updated successfully!'
          : 'Design saved successfully!'
      );
    } catch (error) {
      console.error('Error saving design:', error);
      alert('Failed to save design. Check console for details.');
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