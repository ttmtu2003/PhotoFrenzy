import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  return (
    <div className="">
      <h1>Welcome</h1>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)