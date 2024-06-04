import React from 'react';

const Pet = (props) => {

    

    const noname = props.status.isHungry || props.status.isDirty || props.status.isBored 
    ? "./images/noname-angry.png" 
    : "./images/noname-happy.png";

    return (
      <div>
        <img className='pet' src={noname} alt="Noname character" />
      </div>
    );
};

export default Pet;
