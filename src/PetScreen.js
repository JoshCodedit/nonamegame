import React from 'react';
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

  return (
    <div>
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
