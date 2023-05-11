import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../state';
import CellList from './cell-list';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <CellList />
      </div>
    </Provider>
  );
}

export default App;
