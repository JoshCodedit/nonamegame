import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PetScreen from './PetScreen';
import Play from './Play'; // Import the Play component
import usePetStatusTimers from './hooks/usePetStatusTimers';
import { feedPet, cleanPet, playWithPet } from './petActions';

function App() {
  const [isGameStarted, setIsGameStarted] = useState(
    JSON.parse(localStorage.getItem('isGameStarted')) || false
  );

  function isNamed() {
    return localStorage.getItem('name') !== null;
  }

  useEffect(() => {
    localStorage.setItem('isGameStarted', JSON.stringify(isGameStarted));
  }, [isGameStarted]);

  const [status, setStatus] = useState({
    isHungry: false,
    isDirty: false,
    isBored: false,
  });

  const {
    resetHungryTimer,
    resetDirtyTimer,
    resetBoredTimer,
    hungryProgress,
    dirtyProgress,
    boredProgress,
  } = usePetStatusTimers(setStatus);

  const startGame = () => {
    setIsGameStarted(true);
  };

  const endGame = () => {
    setIsGameStarted(false);
  };

  const clearName = () => {
    localStorage.removeItem('name');
    endGame();
  };

  return (
    <BrowserRouter>
      <div className='background'>
        <Routes>
          <Route
            path='/'
            element={
              <PetScreen
                isGameStarted={isGameStarted}
                isNamed={isNamed}
                startGame={startGame}
                clearName={clearName}
                status={status}
                setStatus={setStatus}
                feedPet={() => feedPet(setStatus, resetHungryTimer)}
                cleanPet={() => cleanPet(setStatus, resetDirtyTimer)}
                playWithPet={() => playWithPet(setStatus, resetBoredTimer)}
                progress={{
                  hungryProgress,
                  dirtyProgress,
                  boredProgress,
                }}
              />
            }
          />
          <Route path='/play' element={<Play />} /> {/* Add the Play route */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
