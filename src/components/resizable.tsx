import React, { useEffect, useState } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import './resizable.css';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
  children?: React.ReactNode;
}

const getWindowDimensions = () => {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
};

export const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const [width, setWidth] = useState(windowDimensions.innerWidth * 0.75);

  useEffect(() => {
    let timer: any;
    const onResize = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        const windowsDimensions = getWindowDimensions();
        setWindowDimensions(windowsDimensions);

        const widthConstrained = windowsDimensions.innerWidth * 0.75;
        if (widthConstrained < width) {
          setWidth(widthConstrained);
        }
      }, 100);
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [width]);

  let resizableBoxProps: ResizableBoxProps;

  if (direction === 'horizontal') {
    resizableBoxProps = {
      className: 'resize-horizontal',
      minConstraints: [windowDimensions.innerWidth * 0.2, Infinity],
      maxConstraints: [windowDimensions.innerWidth * 0.75, Infinity],
      height: Infinity,
      width: width,
      resizeHandles: ['e'],
      onResizeStop: (e, data) => {
        setWidth(data.size.width);
      }
    };
  } else {
    resizableBoxProps = {
      minConstraints: [Infinity, 100],
      maxConstraints: [Infinity, windowDimensions.innerHeight * 0.9],
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
