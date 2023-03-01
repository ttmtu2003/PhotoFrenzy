import React, { useState, useEffect }from 'react';
import ReactDOM from 'react-dom/client';


function App() {
  
  const [data, setdata] = useState({
    name: "",
    age: 0,
    date: "",
    programming: "",
  });

// Using useEffect for single rendering
  useEffect(() => {
      fetch("/data").then((res) =>
          res.json().then((data) => {
              // Setting a data from api
              setdata({
                  name: data.Name,
                  age: data.Age,
                  date: data.Date,
                  programming: data.programming,
              });
          })
      );
  }, []);
  
  return (
    <div className="">
      <h1>Welcome</h1>

      <h1>React and flask</h1>
                {/* Calling a data from setdata for showing */}
                <p>{data.name}</p>
                <p>{data.age}</p>
                <p>{data.date}</p>
                <p>{data.programming}</p>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)