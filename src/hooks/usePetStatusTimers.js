import { useEffect, useRef, useState } from 'react';

const usePetStatusTimers = (setStatus) => {
  const hungryTimerRef = useRef();
  const dirtyTimerRef = useRef();
  const boredTimerRef = useRef();

  const [hungryProgress, setHungryProgress] = useState(50);
  const [dirtyProgress, setDirtyProgress] = useState(100);
  const [boredProgress, setBoredProgress] = useState(100);

  const HUNGRY_INTERVAL = 110000;
  const DIRTY_INTERVAL = 300000;
  const BORED_INTERVAL = 80500;

  useEffect(() => {
    const setHungry = () => {
      setStatus(prevStatus => ({
        ...prevStatus,
        isHungry: true
      }));
      setHungryProgress(0);
    };

    const setDirty = () => {
      setStatus(prevStatus => ({
        ...prevStatus,
        isDirty: true
      }));
      setDirtyProgress(0);
    };

    const setBored = () => {
      setStatus(prevStatus => ({
        ...prevStatus,
        isBored: true
      }));
      setBoredProgress(0);
    };

    hungryTimerRef.current = setInterval(setHungry, HUNGRY_INTERVAL);
    dirtyTimerRef.current = setInterval(setDirty, DIRTY_INTERVAL);
    boredTimerRef.current = setInterval(setBored, BORED_INTERVAL);

    const updateProgress = () => {
      setHungryProgress(prev => (prev > 0 ? prev - (100 / HUNGRY_INTERVAL) * 100 : 0));
      setDirtyProgress(prev => (prev > 0 ? prev - (100 / DIRTY_INTERVAL) * 100 : 0));
      setBoredProgress(prev => (prev > 0 ? prev - (100 / BORED_INTERVAL) * 100 : 0));
    };

    const progressInterval = setInterval(updateProgress, 100);

    // Cleanup timers when component unmounts
    return () => {
      clearInterval(hungryTimerRef.current);
      clearInterval(dirtyTimerRef.current);
      clearInterval(boredTimerRef.current);
      clearInterval(progressInterval);
    };
  }, [setStatus]);

  const resetHungryTimer = () => {
    clearInterval(hungryTimerRef.current);
    setHungryProgress(100);
    hungryTimerRef.current = setInterval(() => {
      setStatus(prevStatus => ({
        ...prevStatus,
        isHungry: true
      }));
      setHungryProgress(0);
    }, HUNGRY_INTERVAL);
  };

  const resetDirtyTimer = () => {
    clearInterval(dirtyTimerRef.current);
    setDirtyProgress(100);
    dirtyTimerRef.current = setInterval(() => {
      setStatus(prevStatus => ({
        ...prevStatus,
        isDirty: true
      }));
      setDirtyProgress(0);
    }, DIRTY_INTERVAL);
  };

  const resetBoredTimer = () => {
    clearInterval(boredTimerRef.current);
    setBoredProgress(100);
    boredTimerRef.current = setInterval(() => {
      setStatus(prevStatus => ({
        ...prevStatus,
        isBored: true
      }));
      setBoredProgress(0);
    }, BORED_INTERVAL);
  };

  return {
    resetHungryTimer,
    resetDirtyTimer,
    resetBoredTimer,
    hungryProgress,
    dirtyProgress,
    boredProgress
  };
};

export default usePetStatusTimers;
