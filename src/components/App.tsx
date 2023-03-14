import React, { useState } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import bundle from '../bundler';

function App() {
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
    <div className="app">
      <CodeEditor initialValue="const a = 1;" onChange={setInput}/>
      <button onClick={onClick} disabled={loading}>Submit</button>
      <Preview code={code}/>
    </div>
  );
}

export default App;
