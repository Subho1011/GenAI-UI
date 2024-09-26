import React, { useState } from 'react';
import ActionButtons from './components/ActionButtons';
import ActionResults from './components/ActionResults.jsx';

const App = () => {

  const [preConfigPrompts , setPreConfigPrompts] = useState('');

  const setPrompts = (prompt) => {
    setPreConfigPrompts(prompt);
    console.log('preConfigPrompts ' + preConfigPrompts);
  };

  return (
    <div style={styles.appContainer}>
      <ActionButtons setPrompts={setPrompts}/>
      <ActionResults preConfigPrompts={preConfigPrompts} setPrompts={setPrompts}/>
    </div>
  );
};

const styles = {
  appContainer: {
    display: 'flex',
    height: '100vh', // Ensure full height for flex container
    padding: '0.2rem',
  },
};

export default App;
