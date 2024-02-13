import React, { useState } from 'react';
import './App.css';
import Heart from './Heart';

function App() {
  const [isHeartClicked, setIsHeartClicked] = useState(false);

  const handleHeartClick = () => {
    setIsHeartClicked(true);
  };

  return (
    <div className='background'>
      <Heart />
      <div className='background-preserve-3d'>
      </div>
    </div>
  );
}

export default App;
