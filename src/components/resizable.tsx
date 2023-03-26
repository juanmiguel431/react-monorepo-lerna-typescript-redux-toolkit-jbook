import React from 'react';
import { ResizableBox } from 'react-resizable';
import './resizable.css';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
  children?: React.ReactNode;
}

export const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  return (
    <div className="resizable">
      <ResizableBox
        width={Infinity}
        height={300}
        resizeHandles={['s']}
      >
        {children}
      </ResizableBox>
    </div>
  );
}

export default Resizable;
