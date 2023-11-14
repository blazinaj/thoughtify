import { useEffect, useState } from 'react';

/**
 *
 * @example
  const DummyComponent = () => {

  const ref = useRef()
  const isVisible = useOnScreen(ref)

  return <div ref={ref}>{isVisible && `Yep, I'm on screen`}</div>
}

 * @param ref
 * @returns {boolean}
 */

export async function getServerSideProps() {
  console.log('rendering now');
  return { props: {} };
}

export default function useOnScreen(scrollLimit = 50) {
  const [isIntersecting, setIntersecting] = useState(false);

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIntersecting(scrollY >= scrollLimit);
  }, [scrollY]);

  return [isIntersecting, scrollY];
}
