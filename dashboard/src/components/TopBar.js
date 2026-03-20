import React, { useState, useEffect } from "react";

import Menu from "./Menu";

const TopBar = () => {
  const [nifty, setNifty] = useState(19542.45);
  const [sensex, setSensex] = useState(64823.12);

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNifty((prev) => prev + (Math.random() - 0.5) * 5);
      setSensex((prev) => prev + (Math.random() - 0.5) * 15);
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const isMarketOpen = (hours > 9 || (hours === 9 && minutes >= 15)) && (hours < 15 || (hours === 15 && minutes <= 30));

  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px', fontSize: '0.85rem' }}>
          <span style={{ fontWeight: '600', color: '#666' }}>{time.toLocaleTimeString()}</span>
          <span style={{
            marginLeft: '10px',
            padding: '2px 6px',
            borderRadius: '4px',
            fontSize: '0.75rem',
            fontWeight: '600',
            backgroundColor: isMarketOpen ? '#e8f5e9' : '#ffebee',
            color: isMarketOpen ? '#4caf50' : '#f44336'
          }}>
            {isMarketOpen ? '● MARKET OPEN' : '● MARKET CLOSED'}
          </span>
        </div>
        <div className="nifty">
          <p className="index">NIFTY 50</p>
          <p className="index-points">{nifty.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} </p>
          <p className="percent"> </p>
        </div>
        <div className="sensex">
          <p className="index">SENSEX</p>
          <p className="index-points">{sensex.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          <p className="percent"></p>
        </div>
      </div>

      <Menu />
    </div>
  );
};

export default TopBar;
