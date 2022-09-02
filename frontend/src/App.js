import {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App()
{

  /* This is example of how to fetch data from API */
  const [propertyData, setPropertyData] = useState(null);
  const [searchString, setSearchString] = useState()
  const [searchData, setSearchData] = useState()

  const acceptSearch = async (e) =>{
    e.preventDefault()
    const resp = await fetch(`/lrProperty/${searchString}`);
    const json = await resp.json();

    if(json.success)
      setSearchData(json.lrProperty)

      console.log('Got here', searchData?.street);
  }

  useEffect(() =>
  {
    async function fetchData()
    {
      // demo request to API (ensure it is running!)
      const resp = await fetch("/lrProperty");
      const json = await resp.json();

      if(json.success)
        setPropertyData(json.lrProperty)
    }
    
    fetchData();

    console.log('property data', propertyData)
  }, []);
  /* end example */



  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={acceptSearch}>
          <input type={'text'} required onChange={(e)=>setSearchString(e.target.value)} />
          <button type='submit'>Submit</button>
        </form>
        {propertyData ? <strong>{propertyData.street}</strong> : null}
        {searchData ? <strong>{searchData.street}</strong> : null}
      </header>
    </div>
  );
}

export default App;
