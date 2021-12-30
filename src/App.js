import React, {useState} from 'react';
import './App.css';
const api = {
  key: '01b396f3f0e7a6924366f4c32cd1ca72',
  base: 'http://api.openweathermap.org/data/2.5/'
}
function App() {

  const [query, setquery] = useState('');
  const [weather, setweather] = useState({});
  const dateBuilder = (d) =>{
    let months = ["January", "February", "March", "April", "May", "June", "July", 
    "August", "Septembar", "October", "November", "December"];
    let days = ["Monday", "Tuesday", "Wednesday", "Thurday", "Friday", "Saturday", "Sunday"];
    
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    
    return `${day} ${date} ${month} ${year}`;
  }
  
  const search = event =>{
    if(event.key === 'Enter'){
        fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          console.log(result);
          setweather(result)
          setquery('');
        });
    }
  }

  return (
    <div className={(typeof weather.main != 'undefined' ? 
    ((weather.main.temp > 16) ? 'app warm' : 'app') 
    : 'app' )}>
      <main>
        <div className='search-box'>
          <input  
              type="text"
              className='search-bar'
              placeholder='search here...'
              onChange={(e) => setquery(e.target.value)}
              value={query}
              onKeyPress={search}
          />
        </div>
        {(typeof weather.main != 'undefined') ? (
        <div>
          <div className='location-box'>
            <div className='location'>{weather.name}, {weather.sys.country}</div>
            <div className='date'>{dateBuilder(new Date())}</div>
          </div>
          <div className='weather-box'>
            <div className='temp'>
              {Math.round(weather.main.temp)}°c
            </div>
            <div className='weather'>{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('')} 
      </main>
    </div>
  );
}

export default App;
