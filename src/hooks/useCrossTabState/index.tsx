import React, { useEffect, useRef, useState } from 'react';

type ReturnType<T> = [T, React.Dispatch<React.SetStateAction<T>>];

function useCrossTabState<T>(stateKey: string, defaultValue: T): ReturnType<T> {
  const isNewSession = useRef<boolean>(true);

  const [state, setState] = useState<T>(defaultValue);

  useEffect(() => {
    if (isNewSession.current) {
      const currentState = localStorage.getItem(stateKey);
      if (currentState) {
        setState(JSON.parse(currentState));
      } else {
        setState(defaultValue);
      }
      isNewSession.current = false;
    } else {
      try {
        localStorage.setItem(stateKey, JSON.stringify(state));
      } catch (error) {}
    }
  }, [state, stateKey, defaultValue]);

  useEffect(() => {
    const onReceieveMessage = (e: StorageEvent) => {
      const { key, newValue } = e;
      if (key === stateKey) {
        setState(JSON.parse(newValue ?? ''));
      }
    };
    window.addEventListener('storage', onReceieveMessage);

    return () => window.removeEventListener('storage', onReceieveMessage);
  }, [stateKey, setState]);

  return [state, setState];
}

export default useCrossTabState;
