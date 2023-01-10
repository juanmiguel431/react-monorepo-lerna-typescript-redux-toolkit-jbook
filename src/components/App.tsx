import React, { useState } from 'react';

function App() {

  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const onClick = () => {
    console.log(input);
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
