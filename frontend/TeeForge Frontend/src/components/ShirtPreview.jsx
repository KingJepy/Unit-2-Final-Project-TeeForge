import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './ShirtPreview.css';

const shirtColors = ['white', 'black', 'blue', 'red'];

function TShirtDesigner() {
  const location = useLocation();
  const [shirtColor, setShirtColor] = useState('white');
  const [uploadedImage, setUploadedImage] = useState(null);

  useEffect(() => {
    if (location.state && location.state.design) {
      const { color, image } = location.state.design;
      setShirtColor(color);
      setUploadedImage(image);
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
  const handleSaveDesign = () => {
    const designData = { color: shirtColor, image: uploadedImage };
    console.log('Design saved:', designData);
    alert('Design saved! (Check console for details)');
  }

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
