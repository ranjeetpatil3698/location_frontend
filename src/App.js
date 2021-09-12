
import "./App.css";
import { useState} from 'react';
import axios from 'axios';

import Map from './Map'

import "mapbox-gl/dist/mapbox-gl.css";


function App() {

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [data, setData] = useState(null);

  const handleChange = async () => {
    if (source.length > 0 && destination.length > 0) {

      try {
        const {data} = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/distance?source=${source}&destination=${destination}`);
        
       
        let finaldata = [
          {
            name: data.source,
            latitude:data.source_cordinates[1],
            longitude: data.source_cordinates[0]
          },
          {
            name: data.destination,
            latitude:data.destination_cordinates[1],
            longitude: data.destination_cordinates[0]
          }
        ]
        setData(finaldata);
        setDistance(data.direction.distance);
        setDuration(data.direction.duration);
      } catch (err) {
        console.log(err.message)
        
      }
    }
    
  }

  return (
    <div className="App d-flex flex-column  justify-content-center align-items-center">
     <div className="h1">Find Distance</div> 
      <div>
        <div>
          <label>Source</label>
          <input type="text" className="form-control" value={source} onChange={ (e)=>setSource(e.target.value)}/>
        </div>
        <div>
          <label>Destination</label>
          <input type="text" className="form-control" value={destination} onChange={ (e)=>setDestination(e.target.value)}/>
        </div>
        <button className="btn btn-primary m-2" onClick={handleChange}>Find Distance</button>
      </div>
      
      <Map location={data} />
      
    

      {
        <div className="d-flex flex-row  justify-content-center align-items-center border border-dark m-1">
              <div className="h4 m-1 p-3 border border-dark">
                {distance} KM
              </div>
              <div className="h4 m-1 p-3 border border-dark">
                {duration} Hours
              </div>
            </div>
      }
      
    </div>
  );
}

export default App;
