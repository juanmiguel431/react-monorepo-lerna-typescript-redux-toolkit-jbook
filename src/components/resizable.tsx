import React, { useEffect, useState } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import './resizable.css';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
  children?: React.ReactNode;
}

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height, };
};

export const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    const onResize = () => {
      setWindowDimensions(getWindowDimensions());
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  let resizableBoxProps: ResizableBoxProps;

  if (direction === 'horizontal') {
    resizableBoxProps = {
      className: 'resize-horizontal',
      minConstraints: [windowDimensions.width * 0.2, Infinity],
      maxConstraints: [windowDimensions.width * 0.75, Infinity],
      height: Infinity,
      width: windowDimensions.width * 0.75,
      resizeHandles: ['e']
    };
  } else {
    resizableBoxProps = {
      minConstraints: [Infinity, 100],
      maxConstraints: [Infinity, windowDimensions.height * 0.9],
      height: 300,
      width: Infinity,
      resizeHandles: ['s']
    };
  }

  return (
    <ResizableBox{...resizableBoxProps}>
      {children}
    </ResizableBox>
  );
}

export default Resizable;
