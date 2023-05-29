import { useState, useEffect } from 'react'
import './App.css'
import { ComicList } from './components/ProductList';

function App() {
  const [data, setData] = useState(null);

  return (
    <div className="App">
      <h1>Marvel Comics</h1>

      <ComicList />
      
    </div>
  );
}

export default App
