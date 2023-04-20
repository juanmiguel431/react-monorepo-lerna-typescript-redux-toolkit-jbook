import React, { useEffect, useState } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import bundle from '../bundler';
import Resizable from './resizable';

export const CodeCell: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const output = await bundle(input);
        setCode(output);
      } finally {
        setLoading(false);
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    }
  }, [input]);

  return (
    <div className="code-cell">
      <Resizable direction="vertical">
        <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
          <Resizable direction="horizontal">
            <CodeEditor initialValue="const a = 1;" onChange={setInput}/>
          </Resizable>
          <Preview code={code}/>
        </div>
      </Resizable>
    </div>
  );
}

export default CodeCell;
