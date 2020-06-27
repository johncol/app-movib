import { useEffect, useRef, useState, MutableRefObject, SetStateAction, Dispatch } from 'react';

/**
 * Check this awesome article https://medium.com/the-non-traditional-developer/how-to-use-an-intersectionobserver-in-a-react-hook-9fb061ac6cb5
 */
export const useIntersect = ({
  root = null,
  rootMargin = '',
  threshold = 0,
}: IntersectionObserverInit): [
  Dispatch<SetStateAction<Element | null>>,
  IntersectionObserverEntry
] => {
  const [entry, updateEntry] = useState<IntersectionObserverEntry>({} as any);
  const [node, setNode] = useState<Element | null>(null);

  const observer: MutableRefObject<IntersectionObserver> = useRef(
    new window.IntersectionObserver(([entry]) => updateEntry(entry), {
      root,
      rootMargin,
      threshold,
    })
  );

  useEffect(() => {
    const { current: currentObserver } = observer;
    currentObserver.disconnect();

    if (node) {
      currentObserver.observe(node);
    }

    return () => currentObserver.disconnect();
  }, [node]);

  return [setNode, entry];
};
