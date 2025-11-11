import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './ShirtPreview.css';
import './PopUpMessages.css';
import { Rnd } from 'react-rnd';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const shirtColors = ['white', 'black', 'blue', 'red'];

function TShirtDesigner() {
  const location = useLocation();
  const { user } = useAuth();

  const [shirtColor, setShirtColor] = useState('white');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [designId, setDesignId] = useState(null);
  const [imageId, setImageId] = useState(null);

  // drag + resize state
  const [imagePosition, setImagePosition] = useState({ x: 100, y: 100 });
  const [imageSize, setImageSize] = useState({ width: 150, height: 150 });

  const [showCenterGuide, setShowCenterGuide] = useState(false);

  // new message state
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  // auto-hide message after 4 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // load saved design
  useEffect(() => {
    if (location.state && location.state.design) {
      const {
        shirtColor,
        imageUrl,
        designId: savedDesignId,
        imageId: savedImageId,
        placementX,
        placementY,
        width,
        height,
      } = location.state.design;

      setShirtColor(shirtColor);
      setUploadedImage(imageUrl || null);
      if (savedDesignId) setDesignId(savedDesignId);
      if (savedImageId) setImageId(savedImageId);

      if (placementX !== undefined && placementY !== undefined) {
        setImagePosition({ x: placementX, y: placementY });
      }

      if (width && height) {
        setImageSize({
          width: Number(width),
          height: Number(height),
        });
      }
    }
  }, [location.state]);

  // upload image
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setUploadedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const checkCenter = (imageX, imageWidth) => {
    const containerWidth = 400;
    const imageCenter = imageX + imageWidth / 2;
    const containerCenter = containerWidth / 2;
    const tolerance = 10;
    setShowCenterGuide(Math.abs(imageCenter - containerCenter) <= tolerance);
  };

  // save and update design with correct message
  const handleSaveDesign = async () => {
    if (!user) {
      setMessage('You must be logged in to save a design.');
      setMessageType('error');
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

      if (designId) {
        const designRes = await fetch(
          `${BASE_URL}/designs/${designId}`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(designData),
          }
        );
        if (!designRes.ok) throw new Error('Failed to update design');
        savedDesign = await designRes.json();
        setMessage('Design updated successfully!');
        setMessageType('success');
      } else {
        const designRes = await fetch(`${BASE_URL}/designs`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(designData),
        });
        if (!designRes.ok) throw new Error('Failed to save design');
        savedDesign = await designRes.json();
        setDesignId(savedDesign.designId);
        setMessage('Design saved successfully!');
        setMessageType('success');
      }

      if (uploadedImage) {
        const imageData = {
          design: { designId: savedDesign.designId },
          imageUrl: uploadedImage,
          fileName: `design_${savedDesign.designId}.png`,
          placementX: imagePosition.x,
          placementY: imagePosition.y,
          width: Math.round(imageSize.width),
          height: Math.round(imageSize.height),
        };

        if (imageId) {
          const imageRes = await fetch(
            `${BASE_URL}/images/${imageId}`,
            {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(imageData),
            }
          );
          if (!imageRes.ok) throw new Error('Failed to update image');
          await imageRes.json();
        } else {
          const imageRes = await fetch(`${BASE_URL}/images`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(imageData),
          });
          if (!imageRes.ok) throw new Error('Failed to save image');
          const savedImage = await imageRes.json();
          setImageId(savedImage.imageId);
        }
      }
    } catch (error) {
      console.error('Error saving design:', error);
      setMessage('Failed to save design. Please try again.');
      setMessageType('error');
    }
  };

  return (
    <div className="designer-container">

      <div className="panels-wrapper">

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
            {message && (
              <div className={`message ${messageType} fade-in message-bottom`}>
                {message}
              </div>
            )}
            <Link to="/orders" className="order-link">Order Your Shirt</Link>
            <Link to="/saved-designs" className="order-link">View Saved Designs</Link>
            <button onClick={handleSaveDesign} className="order-link">
              {designId ? 'Update Design' : 'Save Design'}
            </button>
          </div>
        </div>
        <div className="shirt-preview">
          <div className="shirt-container">
            <div className={`shirt-background ${shirtColor}`}>
              {showCenterGuide && <div className="center-line"></div>}

              {uploadedImage && (
                <Rnd
                  size={imageSize}
                  position={imagePosition}
                  bounds="parent"
                  onDragStart={() => setShowCenterGuide(true)}
                  onDragStop={(e, d) => {
                    setImagePosition({ x: d.x, y: d.y });
                    checkCenter(d.x, imageSize.width);
                    setShowCenterGuide(false);
                  }}
                  onResizeStop={(e, direction, ref, delta, position) => {
                    const newWidth = parseInt(ref.style.width, 10);
                    const newHeight = parseInt(ref.style.height, 10);
                    setImageSize({ width: newWidth, height: newHeight });
                    setImagePosition(position);
                    checkCenter(position.x, newWidth);
                  }}
                >
                  <img src={uploadedImage} alt="Uploaded" className="design-preview" />
                </Rnd>
              )}
            </div>
            <img src="/blank-shirt.png" alt="blank-shirt" className="shirt-outline" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TShirtDesigner;