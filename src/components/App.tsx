import * as esbuild from 'esbuild-wasm';
import React, { useEffect, useState } from 'react';
import { unpkgPathPlugin } from '../plugins/unpkg-path-plugin';
import { fetchPlugin } from '../plugins/fetch-plugin';
import CodeEditor from './code-editor';
import Preview from './preview';

function App() {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  useEffect(() => {
    const startService = async () => {
      setLoading(true);
      await esbuild.initialize({
        wasmURL: 'https://unpkg.com/esbuild-wasm@0.16.16/esbuild.wasm',
        worker: true
      });
      setLoading(false);
    };

    startService();
  }, []);

  const onClick = async () => {
    // const result = await esbuild.transform(input, {
    //   loader: 'jsx',
    //   target: 'es2015'
    // });

    const build = await esbuild.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      }
    });

    setCode(build.outputFiles[0].text);
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
