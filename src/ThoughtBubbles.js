import React from "react";


function ThoughtBubbles(props) {
    const { isHungry, isBored, isDirty } = props.status;
  
    // Check if more than one status effect is active
    const multipleEffectsActive = (isHungry ? 1 : 0) + (isBored ? 1 : 0) + (isDirty ? 1 : 0) > 1;
  
    return (
      <div className="thought-bubbles">
        {/* Display individual images for each status effect if only one is active */}
        {!multipleEffectsActive && (
          <>
            {isHungry && <img className="thinking-food" src='./images/thinking-food.png' alt="Thinking about food" />}
            {isBored && <img className="thinking-play" src='./images/thinking-play.png' alt="Thinking about playing" />}
            {isDirty && <img className="dirty" src='./images/toxic.png' alt="Need a Bath" />}
          </>
        )}
      </div>
    );
  }
  
  export default ThoughtBubbles;
