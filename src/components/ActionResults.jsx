import React, { useState } from 'react';
import getResponse from '../utilities/get-response';
import postRequest from '../utilities/post-request';

const ActionResults = ({ preConfigPrompts, setPrompts}) => {
  const [inputValue, setInputValue] = useState('');
  let prompt = '';

  // Handle input change and update state
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
   // if (inputValue.trim() !== '') {
      prompt = `${prompt} ${preConfigPrompts} ${inputValue}`;
      //console.log('Form submitted:', prompt.trim());
      const data = { model: "llama3", prompt: prompt };
      let interrupt = new AbortController();
      
      postRequest(data, interrupt.signal)
    .then(async response => {
      await getResponse(response, parsedResponse => {
        let word = parsedResponse.response;
        let response = '';
        // add word to response
        if (word != undefined) {    
          response += word;
        }
        console.log('response ', response);
      });
    })
    .then(() => {
      console.log('Message printing done!');
    })
    .catch(error => {
      if (error !== 'Stop button pressed') {
        console.error(error);
      }
    });


      prompt = ''; // Set the prompt to empty string
      setPrompts(''); // This lifts the state up as in set preConfigPrompts to empty string in App.jsx
      setInputValue(''); // Clear the text area after submission
    //}
  };

  const isButtonDisabled = inputValue.trim() === '';

  return (
    <div style={styles.container}>
      <textarea
        style={{ ...styles.textArea, height: '80%' }}
        maxLength={500}
        placeholder="Chat history Box"
        readOnly // Make this read-only as it's for displaying history
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
