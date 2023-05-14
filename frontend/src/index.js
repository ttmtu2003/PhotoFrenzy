import React from 'react';
import ReactDOM from 'react-dom'
import './index.css'
import Routing from './Routing';

function App() {
  const isAuthenticated = window.localStorage.getItem('isAuthed') === 'true'

  return (
    <>
      <Routing isAuthenticated={isAuthenticated} />
    </>
  )
}

export default App

ReactDOM.render(<App />, document.getElementById('root'));
