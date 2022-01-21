import React, { useEffect, useState } from 'react';

import BarChart from './Barchart';

import './App.css';

function App() {

  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch("https://mocki.io/v1/18936d28-2f79-4840-b146-5622e8ad1e77")
      .then((res) => res.json())
      .then(
        (result) => {
          setLoader(false);
          setData(result);
        },
        (error) => {
          setLoader(false);
          setError(error);
        }
      );
  }, []);

  return (
    <div>
      {loader ? <div>loading please wait</div> : <BarChart data={data} />}

    </div>
  );
}

export default App;
