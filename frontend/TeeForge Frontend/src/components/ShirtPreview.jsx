import { Link } from 'react-router-dom';
import { useState } from 'react';
import './ShirtPreview.css';

const shirtColors = ['white', 'black', 'blue', 'red'];

function TShirtDesigner() {
  const [shirtColor, setShirtColor] = useState('white');
  const [uploadedImage, setUploadedImage] = useState(null);

  //take the file and create a url and send it to state
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    }
  };

  return (
    <div className="designer-container">
      {/* create buttons that allow you to switch the color */}
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
        {/* upload your image and use the function */}
        <div className="upload-section">
          <h3>Upload Your Design</h3>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>
        {/* link to order the shirt */}
        <Link to="/orders" className='order-link'>Order Your Shirt</Link>
      </div>

      {/* create a box and put our blank shirt png inside. then put our new image on top */}
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
