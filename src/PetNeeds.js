import React from 'react';
import { useNavigate } from 'react-router-dom';

function PetNeeds(props) {
  const navigate = useNavigate();

  const handlePlayWithPet = () => {
    props.playWithPet();
    navigate('/play' );  // Ensure you have a corresponding route if needed
  };

  return (
    <div className='care-bar'>
      <button onClick={props.feedPet} className='feed-button'>
        <img className='feed' src='./images/chicken-leg.png' alt='Feed Pet' />
      </button>
      <button onClick={props.cleanPet} className='clean-button'>
        <img className='clean' src='./images/bath.png' alt='Clean Pet' />
      </button>
      <button onClick={handlePlayWithPet} className='play-button'>
        <img className='play' src='./images/joystick.png' alt='Play with Pet' />
      </button>
    </div>
  );
}

export default PetNeeds;
