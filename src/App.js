import './App.scss';

import { useState, useEffect, useRef } from "react";


// import CoordinatesTable from './components/CoordinatesTable.js';


const App =() => {


  const [selectedImage, setSelectedImage] = useState(null);

  const [positions, setPositions] = useState({x: '', y: ''});

  const [isDisplay, setIsDisplay] = useState(true);

  const getPosition = (event) => {
    setPositions({x: Math.round(event.clientX -ref.current.getBoundingClientRect().left ) , y: Math.round(event.clientY - ref.current.getBoundingClientRect().top) })
  }

  const clearPosition = () => {
    setPositions({x: '', y: ''})
  }

  const ref = useRef(null);
  
  const handleResize = () => {
    let windowSize = window.innerWidth;
    windowSize > 768 ? setIsDisplay(true) : setIsDisplay(false);
  }
  useEffect(()=> {
    window.addEventListener('resize', handleResize);

  }, []);
  
  return (
    <div className="App">
    {isDisplay && <div>
      <div className="container">
        <h1>Image Coordinate App</h1>
        <h2>Upload an Image and Hover on it!</h2>
        <div className="image__wrapper">
          {selectedImage && (
            <div className="image__container">
              <img ref={ref} onMouseMove={getPosition} onMouseLeave={clearPosition} alt="not fount" src={URL.createObjectURL(selectedImage)} />
              {/* <button onClick={() => console.log("width:", ref.current.getBoundingClientRect().width)} > </button> */}
            </div>
          )}
          <label className="custom-file-upload">
            Choose File
            <input 
              type="file"
              name="image"
              onChange={(event) => {
                setSelectedImage(event.target.files[0]);
              }}
            />
          </label>


        </div>
      </div>
      <div className="coordinates__container">
          <div className="coordinates__item">X Coordinates: <span>{positions.x}</span> </div>
          <div  className="coordinates__item" >Y Coordinates: <span>{positions.y}</span>  </div>
      </div>
    </div>
    }

    {!isDisplay && (
      <div className="error-message">Sorry, This app is available only for screens largers than 768px at the moment...</div>
    )}
    </div>
  );
}

export default App;
