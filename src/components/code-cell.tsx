import React, { useState } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import bundle from '../bundler';
import Resizable from './resizable';

export const CodeCell: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const onClick = async () => {
    try {
      setLoading(true);
      const output = await bundle(input);
      setCode(output);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="code-cell">
      <Resizable direction="vertical">
        <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
          <Resizable direction="horizontal">
            <CodeEditor initialValue="const a = 1;" onChange={setInput}/>
            {/*<button onClick={onClick} disabled={loading}>Submit</button>*/}
          </Resizable>
          <Preview code={code}/>
        </div>
      </Resizable>
    </div>
  );
}

export default CodeCell;
