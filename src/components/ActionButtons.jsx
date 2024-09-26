import React from 'react';
import buttonArray from '../utilities/button-array';

const ActionButtons = () => {

  const handleClick = (prompt) => {
    console.log("prompt " + prompt);
  }

  return (
    <div style={styles.container}>
      {buttonArray.map((btn) => {
       return <button key={btn.id} onClick={() => {handleClick(btn.prompt)}}>{btn.text}</button>
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
};

export default ActionButtons;
