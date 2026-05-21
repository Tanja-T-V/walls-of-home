import { useEffect, useState } from 'react';

import './App.css';

function App() {
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:8080/houses')
      .then((res) => res.text())
      .then((data) => {
        setValue(data);
      });
  }, []);

  return (
    <>
      <h1>Testings</h1>
      {value}
    </>
  );
}

export default App;
