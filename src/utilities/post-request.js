const URL = 'http://localhost:11434/api/generate';

// Function to send a POST request to the API
function postRequest(data, signal) {
    return fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      signal: signal
    });
  }

  export default postRequest;