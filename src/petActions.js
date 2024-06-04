export const feedPet = (setStatus, resetHungryTimer) => {
    setStatus(prevStatus => ({
      ...prevStatus,
      isHungry: false
    }));
    resetHungryTimer();
  };
  
  export const cleanPet = (setStatus, resetDirtyTimer) => {
    setStatus(prevStatus => ({
      ...prevStatus,
      isDirty: false
    }));
    resetDirtyTimer();
  };
  
  export const playWithPet = (setStatus, resetBoredTimer) => {
    setStatus(prevStatus => ({
      ...prevStatus,
      isBored: false
    }));
    resetBoredTimer();
  };

   
  