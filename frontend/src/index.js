import React, { useState, useEffect }from 'react';
import ReactDOM from 'react-dom'
import './index.css'
import Routing from './Routing';



function App() {

  const isAuthenticated = window.localStorage ? window.localStorage.getItem('isAuthed') : false
  return (
    <>
      <Routing isAuthenticated={isAuthenticated} />
    </>
  )
}

export default App

ReactDOM.render(<App />, document.getElementById('root'));
