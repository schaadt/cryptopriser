import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // SETTER CRYPTO STATE
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    function getAlerts() {
      // HENTER API FRA COINGECKO
      axios
      // GEMMER APIEN i ENV
      .get(
        `${process.env.REACT_APP_API_URL}`
      )
      .then(res => {
        setCoins(res.data);
        console.log(res.data);
  
      })
      .catch(error => console.log(error));
    }
    // KØRER FUNKTIONEN FØRSTE GANG OG UPDATER HVERT EFTERFØLGENDE MIN
    getAlerts()
    const interval = setInterval(() => getAlerts(), 120000)
      return () => {
        clearInterval(interval);
      }
  }, []);

  return (
    <div className="crypto">
      <div className="grid-container">
        <div className="grid-x grid-margin-x grid-margin-y">
        {coins.map(coin => {
          return (
            <div className="cell small-12 medium-6 large-6 coins" key={coin.id}>
              <h2>{coin.name}</h2>
              <p className="symbol">{coin.symbol}</p>
              <p><span className="twentyfour">Nuværende Pris</span><br />
              <span className="price"> &#36;{coin.current_price}</span></p>
              <p><span className="twentyfour">Sidste 24 Timer</span><br />
              <span className="price">{coin.price_change_percentage_24h}%</span></p>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}

export default App;
