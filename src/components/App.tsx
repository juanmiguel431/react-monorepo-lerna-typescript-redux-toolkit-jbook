import * as esbuild from 'esbuild-wasm';
import React, { useEffect, useState } from 'react';

function App() {

  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  useEffect(() => {
    const startService = async () => {
      await esbuild.initialize({
        // wasmURL: './node_modules/esbuild-wasm/esbuild.wasm', //Uncaught (in promise) Error: wasm validation error: at offset 4: failed to match magic number
        wasmURL: '/esbuild.wasm',
        worker: true
      });
    };

    startService();
  }, []);

  const onClick = async () => {
    const result = await esbuild.transform(input, {
      loader: 'jsx',
      target: 'es2015'
    });

    setCode(result.code);
  }

  return (
    <div className="app">
      <div>
        <textarea value={input} onChange={e => setInput(e.target.value)}></textarea>
        <div>
          <button onClick={onClick}>Submit</button>
        </div>
      </div>
      <pre>{code}</pre>
    </div>
  );
}

export default App;
