import React from 'react';
// import CodeCell from './code-cell';
import TextEditor from './text-editor';
import { Provider } from 'react-redux';
import { store } from '../state/store';

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        {/*<CodeCell />*/}
        <TextEditor/>
      </div>
    </Provider>
  );
}

export default App;
