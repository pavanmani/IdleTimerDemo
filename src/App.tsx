// import { useState } from 'react';
import { IdleTimerProvider } from './context/IdleTimerContext';
import IdleTimerManager from './components/IdleTimerManager';
// import ExampleComponent from './components/ExampleComponent';

import './App.css';

function App() {

  return (
    <>
      <IdleTimerProvider>
        <div className="App">
          <IdleTimerManager />
        </div>
      </IdleTimerProvider>
    </>
  );
}

export default App;
