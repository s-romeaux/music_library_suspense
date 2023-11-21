import './App.css';
import { useState, Suspense, useEffect } from 'react'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import Spinner from './components/Spinner'
import { createResource as fetchData } from './helper'

function App() {
  let [searchTerm, setSearchTerm] = useState('')
  let [message, setMessage] = useState('Search for Music!')
  let [data, setData] = useState(null)

  useEffect(() => {
    const fetchDataAsync = async () => {
      if (searchTerm) {
        try {
          document.title = `${searchTerm} Music`;
          console.log(await fetchData(searchTerm));
          setData(await fetchData(searchTerm));
        } catch (error) {
          console.error("Error fetching data:", error);
          setMessage("Error fetching data. Please try again.");
        }
      }
    };
  
    fetchDataAsync();
  }, [searchTerm]);

  const handleSearch = (e, term) => {
    e.preventDefault()
    setSearchTerm(term)
  }

  const renderGallery = () => {
    if (data) {
      return (
        <Suspense fallback={<Spinner />}>
          <Gallery data={data} />
        </Suspense>
      );
    } else {
      return <div>{message}</div>;
    }
  };
  

  return (
    <div className="App">
      <SearchBar handleSearch={handleSearch} />
      {message}
      {renderGallery()}
    </div>
  );
}

export default App;