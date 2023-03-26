import React, { useEffect, useState } from 'react';
import { ResizableBox } from 'react-resizable';
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

  return (
    <div className="resizable">
      <ResizableBox
        width={Infinity}
        maxConstraints={[Infinity, windowDimensions.height * 0.9]}
        minConstraints={[Infinity, 100]}
        height={300}
        resizeHandles={['s']}
      >
        {children}
      </ResizableBox>
    </div>
  );
}

export default Resizable;
