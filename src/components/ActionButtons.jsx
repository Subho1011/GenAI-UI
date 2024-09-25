import React from 'react';
import buttonArray from '../utilities/button-array';

const ActionButtons = () => {
    console.log('buttonArray ',buttonArray);
  return (
    <div style={styles.container}>
      {buttonArray.map((btn) => {
       return <button key={btn.id}>{btn.text}</button>
      }) }
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    height: '100vh', // Occupy full height
    padding: '10px',
    gap: '20px',
  },
/*   button: {
    margin: '10px 0',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#99e9f2',
  }, */
};

export default ActionButtons;
