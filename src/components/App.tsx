import * as esbuild from 'esbuild-wasm';
import React, { useEffect, useRef, useState } from 'react';
import { unpkgPathPlugin } from '../plugins/unpkg-path-plugin';
import { fetchPlugin } from '../plugins/fetch-plugin';
import CodeEditor from './code-editor';

function App() {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const iframe = useRef<HTMLIFrameElement>(null);

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

    if (iframe.current) {
      iframe.current.srcdoc = html;
    }

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

    if (iframe.current && iframe.current.contentWindow) {
      iframe.current.contentWindow.postMessage(build.outputFiles[0].text, '*');
    }
  }

  const html = `
<html lang="en">
  <head>
  <title>Preview</title>
</head>
  <body>
    <div id="root"></div>
    <script>
        window.addEventListener('message', (event) => {
          try {
            eval(event.data);
          } catch (e) {
            const root = document.getElementById('root');
            root.innerHTML = '<div style="color: red;"><h4>Runtime error</h4>' + e + '</div>';
            console.error(e);
            throw e;
          }
        }, false);
    </script>
  </body>
</html>
`;

  return (
    <div className="app">
      <div>
        <CodeEditor />
        <textarea value={input} onChange={e => setInput(e.target.value)}></textarea>
        <div>
          <button onClick={onClick} disabled={loading}>Submit</button>
        </div>
      </div>
      <iframe title="Preview" ref={iframe} sandbox="allow-scripts allow-modals" srcDoc={html}></iframe>
    </div>
  );
}

export default App;
