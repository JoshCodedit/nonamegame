import React, { useState, useEffect } from 'react';
import ResetPetButton from './ResetPetButton';
import ProgressBar from './ProgressBar';
import PetNeeds from './PetNeeds';
import Pet from './Pet';
import ThoughtBubbles from './ThoughtBubbles';
import MainMenu from './MainMenu';

function PetScreen(props) {
  const {
    isGameStarted,
    isNamed,
    startGame,
    clearName,
    status,
    feedPet,
    cleanPet,
    playWithPet,
    progress,
  } = props;

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  // Function to exit full screen mode
  const exitFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    setIsFullScreen(false);
    setButtonClicked(true);
  };

  useEffect(() => {
    if (!isFullScreen) {
      setButtonClicked(false);
    }
  }, [isFullScreen]);

  return (
    <div>
      {!buttonClicked && isGameStarted && (
        <div className="fullscreen-buttons">
          <button className='exit-fullscreen' onClick={exitFullScreen}>Exit Full Screen</button>
        </div>
      )}
      {!isGameStarted || !isNamed() ? (
        <MainMenu
          startGame={startGame}
          feedPet={feedPet}
          cleanPet={cleanPet}
          playWithPet={playWithPet}
        />
      ) : (
        <>
          <ResetPetButton clearName={clearName} />
          <ThoughtBubbles status={status} />
          <Pet status={status} />
          <PetNeeds
            feedPet={feedPet}
            cleanPet={cleanPet}
            playWithPet={playWithPet}
          />
          <div className='progress-bars'>
            <ProgressBar progress={progress.hungryProgress} />
            <ProgressBar progress={progress.dirtyProgress} />
            <ProgressBar progress={progress.boredProgress} />
          </div>
        </>
      )}
    </div>
  );
}

export default PetScreen;
