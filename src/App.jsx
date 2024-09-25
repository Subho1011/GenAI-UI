import React from 'react';
import ActionButtons from './components/ActionButtons';
import ActionResults from './components/ActionResults.jsx';

const App = () => {
  return (
    <div style={styles.appContainer}>
      <ActionButtons />
      <ActionResults />
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
