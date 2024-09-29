import React, { useState, useEffect } from 'react';
import getResponse from '../utilities/get-response';
import postRequest from '../utilities/post-request';
import './ActionResults.css'; // Import the CSS file for the blinking effect

const ActionResults = ({ preConfigPrompts, setPrompts }) => {
  const [inputValue, setInputValue] = useState('');
  const [chatHistory, setChatHistory] = useState(''); // For storing responses progressively
  const [isTyping, setIsTyping] = useState(false);    // Typing state to control blinking cursor

  let prompt = '';

  // Handle input change and update state
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    prompt = `${preConfigPrompts} ${inputValue}`;
    const data = { model: 'llama3', prompt: prompt.trim() };
    let interrupt = new AbortController();

    try {
      setIsTyping(true); // Start typing animation (blinking cursor enabled)
      await postRequest(data, interrupt.signal)
        .then(async (response) => {
          await getResponse(response, (parsedResponse) => {
            const { response: word, done } = parsedResponse;
            if (word !== undefined) {
              setChatHistory((prev) => prev + word); // Append word to chat history
            }

            if (done) {
              setIsTyping(false); // Stop typing when done (blinking cursor disabled)
            }
          });
        })
        .catch((error) => {
          if (error !== 'Stop button pressed') {
            console.error(error);
          }
        });
    } finally {
      prompt = ''; // Clear prompt
      setPrompts(''); // Clear preConfigPrompts in App.jsx
      setInputValue(''); // Clear input area
    }
  };

  const isButtonDisabled = inputValue.trim() === '';

  return (
    <div style={styles.container}>
      <textarea
        className={isTyping ? 'chatHistory blinking-cursor' : 'chatHistory'} // Apply blinking-cursor when typing
        style={{ ...styles.textArea, height: '80%' }}
        value={chatHistory} // Display the chat history
        readOnly
      />
      
      <form style={styles.form} onSubmit={handleSubmit}>
        <textarea
          style={{ ...styles.textAreaForm, height: '100%', width: '100%', position: 'relative' }}
          maxLength={100}
          placeholder="Prompt & user Input"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button 
          type="submit"
          style={{
            ...styles.submitButton,
            backgroundColor: isButtonDisabled ? '#A9A9A9' : '#007BFF', // Gray if disabled, blue if enabled
            cursor: isButtonDisabled ? 'not-allowed' : 'pointer',      // 🚫 sign when disabled
          }}
          disabled={isButtonDisabled}
        >
          &#x25B2;
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100vh', // Occupy full height
    width: '90vw',
  },
  textArea: {
    flexGrow: 1,
    backgroundColor: 'black',
    color: 'white',
    border: '1px solid #ccc',
    margin: '0.1rem',
    padding: '0.1rem',
    fontSize: '1rem',
    resize: 'none',
    position: 'relative', // Ensure positioning for blinking cursor
    whiteSpace: 'pre-wrap', // To handle new lines properly
  },
  form: {
    flexGrow: 1,
    margin: '0.1rem',
    display: 'flex',
    flexDirection: 'column',
  },
  textAreaForm: {
    flexGrow: 1,
    backgroundColor: 'black',
    color: 'white',
    border: '1px solid #ccc',
    padding: '0.1rem',
    fontSize: '1rem',
    resize: 'none',
    width: '100%', // Ensure the textarea takes up the full width of the form
    boxSizing: 'border-box', // Include padding and border in the element's width and height
  },
  submitButton: {
    position: 'absolute',
    bottom: '7px',
    right: '15px',
    color: 'white',
    border: 'none',
    padding: '0.1rem 0.2rem',
    height: '2.5rem',
    width: '2.5rem',
    opacity: 0.8,
    fontSize: '1.2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '5px',
  },
};

export default ActionResults;
